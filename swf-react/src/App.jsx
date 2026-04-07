import { useState, useEffect, useRef, useCallback } from 'react';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Sidebar from './components/Sidebar';
import ExitModal from './components/ExitModal';
import DragLayer from './components/DragLayer';
import { usePlayer } from './hooks/usePlayer';
import { useDragDrop } from './hooks/useDragDrop';
import { useScale } from './hooks/useScale';
import { CHAPTERS, PREV_SESSION, GAME } from './config';
import './App.css';

export default function App() {
  // ── Session state ──
  const [isShowingFrame, setIsShowingFrame] = useState(false);
  const [bgVisible, setBgVisible] = useState(false);
  const [chapterOpen, setChapterOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(0);
  const [frameLoading, setFrameLoading] = useState(false);
  /** Play state for lesson inside session iframe (session2+); usePlayer.isPlaying is only for shell canvas */
  const [iframePlaying, setIframePlaying] = useState(false);
  /** Ref để đọc giá trị iframePlaying mới nhất trong callbacks (tránh stale closure) */
  const iframePlayingRef = useRef(false);

  const sessionFrameRef = useRef(null);
  const snapGhostRef = useRef(null);
  /** If session2 iframe never posts framesLoaded, hide shell overlay after max wait */
  const session2LoadFallbackRef = useRef(null);

  // ── Scale ──
  const scaleRootRef = useScale();

  const setupCanvas = useCallback(() => {
    const canvas = document.getElementById('main-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = 590, H = 410;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
  }, []);

  useEffect(() => {
    const t = setTimeout(setupCanvas, 50);
    return () => clearTimeout(t);
  }, [setupCanvas]);

  // ── Player callbacks ──
  const handleAllCorrect = useCallback(() => {}, []);
  const handleNextEnabled = useCallback((enabled) => {
    setNextEnabled(enabled);
  }, []);
  const handleBgShow = useCallback(() => setBgVisible(true), []);
  const handleBgHide = useCallback(() => setBgVisible(false), []);

  const {
    isPlaying,
    currentFrame,
    currentQuestion,
    dragUnlocked,
    canvasRef,
    play,
    pause,
    restart,
    goToFrame,
    onCorrectDropZone,
    playEggSound,
  } = usePlayer({
    onAllCorrect: handleAllCorrect,
    onNextEnabled: handleNextEnabled,
    onBgShow: handleBgShow,
    onBgHide: handleBgHide,
  });

  // ── Drag & drop callbacks ──
  const {
    ghost,
    zones,
    dragLayerRef,
    handleMouseDown,
    handleTouchStart,
  } = useDragDrop({
    question: currentQuestion,
    dragUnlocked,
    onCorrectDrop: onCorrectDropZone,
    onEggSound: playEggSound,
    snapGhostRef,
  });

  // ── Session / chapter navigation ──
  const loadSessionInFrame = useCallback((url, name, idx) => {
    if (session2LoadFallbackRef.current) {
      clearTimeout(session2LoadFallbackRef.current);
      session2LoadFallbackRef.current = null;
    }
    pause();
    setIframePlaying(false);
    setBgVisible(true);
    setFrameLoading(true);
    setIsShowingFrame(true);
    setCurrentSessionIndex(idx);
    setNextEnabled(false);
    if (url.includes('session2/')) {
      session2LoadFallbackRef.current = setTimeout(() => {
        session2LoadFallbackRef.current = null;
        setFrameLoading(false);
      }, 120_000);
    }
    if (sessionFrameRef.current) {
      sessionFrameRef.current.src = '';
      requestAnimationFrame(() => {
        if (sessionFrameRef.current) sessionFrameRef.current.src = url;
      });
    }
  }, [pause]);

  const showShellCanvas = useCallback(() => {
    if (session2LoadFallbackRef.current) {
      clearTimeout(session2LoadFallbackRef.current);
      session2LoadFallbackRef.current = null;
    }
    if (sessionFrameRef.current) sessionFrameRef.current.src = '';
    setIsShowingFrame(false);
    setFrameLoading(false);
    setCurrentSessionIndex(0);
    setNextEnabled(false);
    handleBgHide();
  }, [handleBgHide]);

  // ── Button handlers ──
  const handleExit = useCallback(() => {
    if (isShowingFrame) {
      try {
        sessionFrameRef.current?.contentWindow?.postMessage({ action: 'pause' }, '*');
      } catch (e) {}
    }
    pause();
    setExitModalOpen(true);
  }, [pause, isShowingFrame]);

  const handleBack = useCallback(() => {
    const prevIdx = currentSessionIndex - 1;
    if (prevIdx < -1) return;
    if (prevIdx === 0) { showShellCanvas(); return; }
    if (prevIdx === -1) { loadSessionInFrame(PREV_SESSION.url, PREV_SESSION.sub, -1); return; }
    const ch = CHAPTERS[prevIdx];
    if (ch && ch.status !== 'locked') loadSessionInFrame(ch.url, ch.sub, prevIdx);
  }, [currentSessionIndex, showShellCanvas, loadSessionInFrame]);

  const handlePrev = useCallback(() => {
    if (isShowingFrame) {
      try {
        sessionFrameRef.current?.contentWindow?.postMessage({ action: 'prevFrame' }, '*');
      } catch (e) {}
    } else {
      pause();
      goToFrame(Math.max(currentFrame - 1, 1));
    }
  }, [isShowingFrame, pause, currentFrame, goToFrame]);

  const handleListen = useCallback(() => {
    if (isShowingFrame) {
      try {
        sessionFrameRef.current?.contentWindow?.postMessage({ action: 'restart' }, '*');
      } catch (e) {}
    } else {
      restart();
    }
  }, [isShowingFrame, restart]);

  const handlePlayPause = useCallback(() => {
    if (isShowingFrame) {
      try {
        sessionFrameRef.current?.contentWindow?.postMessage({ action: iframePlayingRef.current ? 'pause' : 'play' }, '*');
      } catch (e) {}
    } else {
      if (isPlaying) pause();
      else play();
    }
  }, [isShowingFrame, isPlaying, pause, play]);

  const handleNext = useCallback(() => {
    const nextIdx = currentSessionIndex + 1;
    if (nextIdx < CHAPTERS.length) {
      const ch = CHAPTERS[nextIdx];
      if (ch && ch.status !== 'locked') loadSessionInFrame(ch.url, ch.sub, nextIdx);
    }
  }, [currentSessionIndex, loadSessionInFrame]);

  const handleChapterSelect = useCallback((item) => {
    setChapterOpen(false);
    if (item.isPrev) {
      if (currentSessionIndex === -1) return;
      loadSessionInFrame(item.url, item.sub, -1);
    } else {
      const idx = CHAPTERS.findIndex((c) => c.id === item.id);
      if (idx === currentSessionIndex) return;
      if (idx === 0 && !isShowingFrame) return;
      loadSessionInFrame(item.url, item.sub, idx);
    }
  }, [currentSessionIndex, isShowingFrame, loadSessionInFrame]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      }
      if (e.code === 'Escape') {
        if (chapterOpen) setChapterOpen(false);
        else handleExit();
      }
      if (!isShowingFrame) {
        if (!isPlaying) {
          if (e.code === 'ArrowRight') goToFrame(Math.min(currentFrame + 1, GAME.TOTAL_FRAMES));
          if (e.code === 'ArrowLeft')  goToFrame(Math.max(currentFrame - 1, 1));
        }
      } else {
        // Arrow keys for session iframe
        if (e.code === 'ArrowRight') {
          try { sessionFrameRef.current?.contentWindow?.postMessage({ action: 'nextFrame' }, '*'); } catch(err) {}
        }
        if (e.code === 'ArrowLeft') {
          try { sessionFrameRef.current?.contentWindow?.postMessage({ action: 'prevFrame' }, '*'); } catch(err) {}
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isShowingFrame, isPlaying, currentFrame, goToFrame, handlePlayPause, handleExit, chapterOpen]);

  // ── postMessage from iframes ──
  useEffect(() => {
    const handler = (e) => {
      if (e.data?.action === 'nextLesson' || e.data === 'nextLesson') {
        const nextIdx = currentSessionIndex + 1;
        if (nextIdx < CHAPTERS.length) {
          const ch = CHAPTERS[nextIdx];
          if (ch && ch.status !== 'locked') loadSessionInFrame(ch.url, ch.sub, nextIdx);
        }
      }
      if (e.data?.action === 'prevLesson' || e.data === 'prevLesson') {
        handleBack();
      }
      if (e.data?.action === 'enableNext') {
        setNextEnabled(true);
      }
      // Sync play/pause state from session iframes (session2 minimal page, etc.)
      if (e.data?.action === 'playing') {
        iframePlayingRef.current = true;
        setIframePlaying(true);
      }
      if (e.data?.action === 'paused') {
        iframePlayingRef.current = false;
        setIframePlaying(false);
      }
      // Session iframe finished loading all frames → hide shell loading overlay
      if (e.data?.action === 'framesLoaded') {
        if (session2LoadFallbackRef.current) {
          clearTimeout(session2LoadFallbackRef.current);
          session2LoadFallbackRef.current = null;
        }
        setFrameLoading(false);
      }
      // Session 2 complete
      if (e.data?.action === 'sessionComplete' && e.data?.session === 2) {
        setNextEnabled(true);
        setIframePlaying(false);
      }
      if (e.data?.action === 'sessionComplete' && e.data?.session === 4) {
        setNextEnabled(true);
        setIframePlaying(false);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [currentSessionIndex, loadSessionInFrame, handleBack]);

  // ── Chapter panel CSS class ──
  useEffect(() => {
    const panel = document.getElementById('chapter-panel');
    if (!panel) return;
    if (chapterOpen) panel.classList.add('open');
    else panel.classList.remove('open');
  }, [chapterOpen]);

  // ── Session frame load event ──
  const handleFrameLoad = useCallback(() => {
    // Heavy sessions (e.g. session2) signal framesLoaded when assets are ready; keep overlay until then
    const src = sessionFrameRef.current?.src || '';
    if (src.includes('session2/')) return;
    setFrameLoading(false);
  }, []);

  // ── Derive session label ──
  const sessionLabel = isShowingFrame
    ? CHAPTERS[currentSessionIndex]?.sub || (currentSessionIndex === -1 ? PREV_SESSION.sub : 'Screen')
    : 'Screen 1';

  return (
    <>
      <div id="scale-root" ref={scaleRootRef}>
      <div className="shell">
        <TopBar
          label="Numbers to 100"
          sessionLabel={sessionLabel}
        />

        <div className="main-body">
          {/* ── Canvas area ── */}
          <div className="canvas-wrap">
            {/* Background frame */}
            <iframe
              className={`bg-frame-container${bgVisible ? ' visible' : ''}`}
              src={GAME.BG_SRC}
              allowtransparency="true"
              scrolling="no"
              title="background"
            />

            {/* Canvas — positioned via CSS, not inside a wrapper */}
            <canvas
              id="main-canvas"
              ref={canvasRef}
              style={{ display: isShowingFrame ? 'none' : 'block' }}
            />

            {/* Drag layer */}
            <DragLayer
              question={isShowingFrame ? null : currentQuestion}
              dragUnlocked={dragUnlocked}
              zones={zones}
              dragLayerRef={dragLayerRef}
              handleMouseDown={handleMouseDown}
              handleTouchStart={handleTouchStart}
            />

            {/* Session iframe */}
            <iframe
              id="session-frame"
              ref={sessionFrameRef}
              src=""
              allowtransparency="true"
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              style={{ display: isShowingFrame ? 'block' : 'none' }}
              onLoad={handleFrameLoad}
            />

            {/* Loading overlay */}
            <div id="frame-loading" className={frameLoading ? 'show' : ''}>
              <div className="loading-spinner" />
              <div className="loading-text">Đang tải bài học…</div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <Sidebar
            currentSessionIndex={currentSessionIndex}
            chapters={CHAPTERS}
            prevSession={PREV_SESSION}
            chaptersOpen={chapterOpen}
            onToggleChapter={(v) => setChapterOpen(typeof v === 'boolean' ? v : !chapterOpen)}
            onChapterSelect={handleChapterSelect}
          />
        </div>

        <BottomBar
          isPlaying={isShowingFrame ? iframePlaying : isPlaying}
          isShowingFrame={isShowingFrame}
          nextEnabled={nextEnabled}
          onExit={handleExit}
          onBack={handleBack}
          onPrev={handlePrev}
          onListen={handleListen}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
        />
      </div>

      <ExitModal
        open={exitModalOpen}
        onCancel={() => setExitModalOpen(false)}
        onConfirm={() => { window.location.href = '/'; }}
      />
      </div>

      {/* 必须在 scale-root 外：fixed + clientX/Y 为视口坐标；若在 transform 内会整体缩放导致与指针错位 */}
      <div
        id="drag-ghost"
        style={{
          display: ghost?.visible ? 'block' : 'none',
          left: ghost ? ghost.x : 0,
          top: ghost ? ghost.y : 0,
        }}
      >
        <img src={GAME.EGG_IMG} alt="" />
      </div>
      <div id="snap-ghost" ref={snapGhostRef}>
        <img src={GAME.EGG_IMG} alt="" />
      </div>
    </>
  );
}
