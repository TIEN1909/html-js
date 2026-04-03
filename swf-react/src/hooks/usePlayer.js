import { useRef, useEffect, useCallback, useState } from 'react';
import { GAME, CANVAS_W, CANVAS_H } from '../config';

const QUESTIONS = {
  233: {
    correctCount: 10,
    eggs: GAME.EGG_POSITIONS.map((p, i) => ({
      id: `egg-233-${i + 1}`,
      x: p.x,
      y: p.y,
      value: i + 1,
    })),
    dropZones: GAME.ZONE_POSITIONS.map((p, i) => ({
      id: `dz-233-${i + 1}`,
      x: p.x - GAME.ZONE_SIZE / 2,
      y: p.y - GAME.ZONE_SIZE / 2,
      w: GAME.ZONE_SIZE,
      h: GAME.ZONE_SIZE,
      acceptValue: null,
    })),
  },
};

function buildQuestion(fn) {
  const q = QUESTIONS[fn];
  if (!q) return null;

  const eggs = q.eggs.map((e) => ({ ...e }));
  const dropZones = q.dropZones.map((d) => ({ ...d, filled: false }));

  return { correctCount: q.correctCount, eggs, dropZones, frameNum: fn };
}

export function usePlayer({ onAllCorrect, onNextEnabled, onBgShow, onBgHide }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [dragUnlocked, setDragUnlocked] = useState(false);
  const [dropCount, setDropCount] = useState(0);

  const canvasRef = useRef(null);
  const framesRef = useRef({});
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const lessonAudioRef = useRef(null);
  const panImgRef = useRef(null);
  const dropZoneCounterRef = useRef(0);
  const waitingAtRef = useRef(null);
  const correctInQuestionRef = useRef(0);

  // Preload frames
  useEffect(() => {
    const loadAll = async () => {
      const all = [];
      for (let i = 1; i <= GAME.TOTAL_FRAMES; i++) {
        all.push(
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve({ i, img });
            img.onerror = () => resolve({ i, img: null });
            fetch(GAME.FRAMES_PATH + i + '.svg')
              .then((r) => r.text())
              .then((svgText) => {
                const cleaned = svgText
                  .replace(/<rect[^>]*fill="[^"]*"[^>]*>/gi, '')
                  .replace(/background:[^;"']+/gi, 'background:none');
                const blob = new Blob([cleaned], { type: 'image/svg+xml' });
                img.src = URL.createObjectURL(blob);
              })
              .catch(() => resolve({ i, img: null }));
          })
        );
      }
      const results = await Promise.all(all);
      results.forEach(({ i, img }) => {
        if (img) framesRef.current[i] = img;
      });
      drawFrame(1);
    };
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup audio
  useEffect(() => {
    const audio = new Audio(GAME.AUDIO_PATH);
    audio.preload = 'auto';
    audioRef.current = audio;

    const lessonAudio = new Audio(GAME.LESSON_AUDIO);
    lessonAudio.preload = 'auto';
    lessonAudioRef.current = lessonAudio;

    lessonAudio.addEventListener('timeupdate', () => {
      if (
        !lessonAudio._waiting &&
        lessonAudio.currentTime >= GAME.SEGMENT_A_END
      ) {
        lessonAudio.pause();
        lessonAudio._waiting = true;
        setDragUnlocked(true);
      }
    });

    const panImg = new Image();
    panImg.src = GAME.PAN_IMG;
    panImgRef.current = panImg;

    return () => {
      audio.pause();
      lessonAudio.pause();
    };
  }, []);

  const drawFrame = useCallback((n) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = framesRef.current[n];
    if (!img) return;
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.drawImage(img, 0, 0, CANVAS_W, CANVAS_H);
    if (n >= GAME.PAN_START_FRAME && panImgRef.current?.complete && panImgRef.current?.naturalWidth > 0) {
      ctx.drawImage(panImgRef.current, 88 - 95, 370 - 60, 190, 120);
    }
    setCurrentFrame(n);
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    audioRef.current?.pause();
    lessonAudioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const play = useCallback((from) => {
    if (intervalRef.current) return;
    onBgShow?.();
    setIsPlaying(true);

    if (from !== undefined) {
      setIsWaiting(false);
      setCurrentQuestion(null);
      correctInQuestionRef.current = 0;
      dropZoneCounterRef.current = 0;
      waitingAtRef.current = null;
      setDragUnlocked(false);
      setCurrentFrame(from - 1);
      if (audioRef.current) audioRef.current.currentTime = (from - 1) / GAME.FPS;
      lessonAudioRef.current?.play().catch(() => {});
    } else {
      if (lessonAudioRef.current && !lessonAudioRef.current._waiting) {
        lessonAudioRef.current.play().catch(() => {});
      }
    }

    audioRef.current?.play().catch(() => {});

    intervalRef.current = setInterval(() => {
      if (waitingAtRef.current !== null) return;

      setCurrentFrame((prev) => {
        const nxt = prev + 1;
        if (nxt > GAME.TOTAL_FRAMES) {
          stop();
          return prev;
        }
        drawFrame(nxt);
        if (QUESTIONS[nxt]) {
          const q = buildQuestion(nxt);
          setCurrentQuestion(q);
          setIsWaiting(true);
          waitingAtRef.current = nxt;
          correctInQuestionRef.current = 0;
          dropZoneCounterRef.current = 0;
        }
        return nxt;
      });
    }, 1000 / GAME.FPS);
  }, [stop, drawFrame, onBgShow]);

  const pause = useCallback(() => {
    stop();
  }, [stop]);

  const restart = useCallback(() => {
    stop();
    setScore(0);
    dropZoneCounterRef.current = 0;
    correctInQuestionRef.current = 0;
    waitingAtRef.current = null;
    setDragUnlocked(false);
    setCurrentQuestion(null);
    setIsWaiting(false);
    setCurrentFrame(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
    if (lessonAudioRef.current) {
      lessonAudioRef.current.pause();
      lessonAudioRef.current.currentTime = 0;
      lessonAudioRef.current._waiting = false;
    }
    onNextEnabled?.(false);
    drawFrame(1);
    setTimeout(() => play(), 200);
    onBgHide?.();
  }, [stop, play, drawFrame, onNextEnabled, onBgHide]);

  const goToFrame = useCallback((n) => {
    if (isPlaying) return;
    drawFrame(n);
  }, [isPlaying, drawFrame]);

  const onCorrectDropZone = useCallback((frameNum, dropIndex) => {
    const q = QUESTIONS[frameNum];
    if (!q) return 0;
    correctInQuestionRef.current++;
    const total = correctInQuestionRef.current;
    setDropCount(total);

    if (total >= q.correctCount) {
      setScore((s) => s + 1);
      if (lessonAudioRef.current?._waiting) {
        lessonAudioRef.current._waiting = false;
        lessonAudioRef.current.currentTime = GAME.SEGMENT_B_START;
        lessonAudioRef.current.play().catch(() => {});
      }
      setTimeout(() => {
        setCurrentQuestion(null);
        waitingAtRef.current = null;
        setIsWaiting(false);
        stop();
        play(GAME.JUMP_TO_FRAME);
        const animDuration = ((GAME.TOTAL_FRAMES - GAME.JUMP_TO_FRAME) / GAME.FPS) * 1000;
        setTimeout(() => {
          onNextEnabled?.(true);
          onAllCorrect?.();
        }, animDuration + 300 + 600);
      }, 600);
    }
  }, [stop, play, onNextEnabled, onAllCorrect]);

  const playEggSound = useCallback((idx) => {
    const f = 79 + idx * 2;
    const a1 = new Audio(GAME.SOUNDS_PATH + f + '.mp3');
    const a2 = new Audio(GAME.SOUNDS_PATH + (f + 1) + '.mp3');
    a1.volume = 0.7;
    a2.volume = 0.7;
    a1.play().catch(() => {});
    a1.addEventListener('ended', () => a2.play().catch(() => {}));
  }, []);

  return {
    isPlaying,
    isWaiting,
    currentFrame,
    currentQuestion,
    score,
    dragUnlocked,
    dropCount,
    canvasRef,
    play,
    pause,
    restart,
    goToFrame,
    onCorrectDropZone,
    playEggSound,
  };
}
