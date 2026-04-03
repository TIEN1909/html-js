import { useState, useCallback, useRef, useEffect } from 'react';
import { GAME } from '../config';

const HIT_RADIUS = 70;

/** 视口坐标 → #drag-layer 内与 .egg 一致的 left/top（祖先含 transform: scale 时必须换算） */
function clientToDragLayer(layer, clientX, clientY) {
  if (!layer) return { x: clientX, y: clientY };
  const rect = layer.getBoundingClientRect();
  const w = layer.offsetWidth;
  const h = layer.offsetHeight;
  if (rect.width <= 0 || rect.height <= 0) return { x: clientX, y: clientY };
  return {
    x: ((clientX - rect.left) / rect.width) * w,
    y: ((clientY - rect.top) / rect.height) * h,
  };
}

export function useDragDrop({ question, dragUnlocked, onCorrectDrop, onEggSound, snapGhostRef }) {
  const [ghost, setGhost] = useState(null);
  const [zones, setZones] = useState([]);

  const dragLayerRef = useRef(null);
  const DS = useRef({ el: null });
  const eggOriginRef = useRef({});
  const dropCounterRef = useRef(0);

  // Stable refs for event handlers (avoid useCallback ordering issues)
  const handlersRef = useRef({});

  // Initialize zones when question changes
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!question) {
      setZones([]);
      setGhost(null);
      return;
    }
    eggOriginRef.current = {};
    dropCounterRef.current = 0;
    setZones(question.dropZones.map((z) => ({ ...z, filled: false })));
    setGhost(null);
    DS.current = { el: null };
  }, [question]);

  const endDrag = useCallback((releaseX, releaseY) => {
    const el = DS.current.el;
    if (!el) return;
    DS.current.el = null;

    setGhost(null);
    setZones((prev) => prev.map((dz) => ({ ...dz, active: false })));

    const id = el.dataset.id;
    const allDz = document.querySelectorAll('.drop-zone');
    const nextDz = Array.from(allDz).find((dz) => !dz.classList.contains('filled'));

    if (!nextDz) {
      handlersRef.current.returnToOrigin(el, id, dragLayerRef.current, releaseX, releaseY);
      return;
    }

    const dzRects = Array.from(allDz).map((dz) => dz.getBoundingClientRect());
    const gridLeft   = Math.min(...dzRects.map((r) => r.left))   - HIT_RADIUS;
    const gridRight  = Math.max(...dzRects.map((r) => r.right))  + HIT_RADIUS;
    const gridTop    = Math.min(...dzRects.map((r) => r.top))    - HIT_RADIUS;
    const gridBottom = Math.max(...dzRects.map((r) => r.bottom)) + HIT_RADIUS;

    const nearGrid =
      releaseX >= gridLeft && releaseX <= gridRight &&
      releaseY >= gridTop  && releaseY <= gridBottom;

    if (nearGrid) {
      const dzRect = nextDz.getBoundingClientRect();
      const slotX = dzRect.left + dzRect.width / 2;
      const slotY = dzRect.top + dzRect.height / 2;

      const snapEl = snapGhostRef?.current;
      if (snapEl) {
        snapEl.classList.remove('flying');
        snapEl.style.left = releaseX + 'px';
        snapEl.style.top = releaseY + 'px';
        snapEl.style.display = 'block';
        snapEl.getBoundingClientRect();
        snapEl.classList.add('flying');
        snapEl.style.left = slotX + 'px';
        snapEl.style.top = slotY + 'px';

        const handleTransitionEnd = () => {
          snapEl.removeEventListener('transitionend', handleTransitionEnd);
          snapEl.classList.remove('flying');
          snapEl.style.display = 'none';
          el.classList.add('hidden');
          el.classList.remove('dragging');
          nextDz.innerHTML = `<img src="${GAME.EGG_IMG}" style="width:32px;height:32px;display:block;margin:${(GAME.ZONE_SIZE - 23) / 2}px auto 0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))">`;
          nextDz.classList.add('filled');
          dropCounterRef.current += 1;
          onEggSound?.(dropCounterRef.current);
          onCorrectDrop?.(question.frameNum, dropCounterRef.current);
        };
        snapEl.addEventListener('transitionend', handleTransitionEnd, { once: true });
      } else {
        el.classList.add('hidden');
        el.classList.remove('dragging');
        nextDz.innerHTML = `<img src="${GAME.EGG_IMG}" style="width:32px;height:32px;display:block;margin:${(GAME.ZONE_SIZE - 23) / 2}px auto 0;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))">`;
        nextDz.classList.add('filled');
        dropCounterRef.current += 1;
        onEggSound?.(dropCounterRef.current);
        onCorrectDrop?.(question.frameNum, dropCounterRef.current);
      }
    } else {
      handlersRef.current.returnToOrigin(el, id, dragLayerRef.current, releaseX, releaseY);
    }
  }, [question, onCorrectDrop, onEggSound, snapGhostRef]);

  const returnToOrigin = useCallback((el, id, layer, releaseX, releaseY) => {
    el.classList.remove('dragging', 'hidden');
    const origin = eggOriginRef.current[id];
    if (!origin) return;

    const { x: lx, y: ly } = clientToDragLayer(layer, releaseX, releaseY);
    // Store current position for transition
    el.classList.remove('returning');
    el.style.left = `${lx}px`;
    el.style.top = `${ly}px`;
    el.getBoundingClientRect();
    el.classList.add('returning');
    el.style.left = origin.ox + 'px';
    el.style.top = origin.oy + 'px';

    const cleanup = () => {
      el.classList.remove('returning');
      el.style.left = origin.ox + 'px';
      el.style.top = origin.oy + 'px';
      el.removeEventListener('transitionend', cleanup);
    };
    el.addEventListener('transitionend', cleanup, { once: true });
  }, []);

  // Keep stable refs up to date
  useEffect(() => {
    handlersRef.current.returnToOrigin = returnToOrigin;
  }, [returnToOrigin]);

  const startDrag = useCallback((el, cx, cy) => {
    if (el.classList.contains('returning')) {
      el.classList.remove('returning');
      const id = el.dataset.id;
      const origin = eggOriginRef.current[id];
      if (origin) {
        el.style.left = origin.ox + 'px';
        el.style.top = origin.oy + 'px';
      }
      el.getBoundingClientRect();
    }
    DS.current.el = el;
    el.classList.add('dragging', 'hidden');
    setGhost({ x: cx, y: cy, visible: true });
  }, []);

  const moveGhost = useCallback((cx, cy) => {
    setGhost((g) => (g ? { ...g, x: cx, y: cy } : null));
    setZones((prev) =>
      prev.map((dz) => {
        if (dz.filled) return dz;
        const node = typeof document !== 'undefined' ? document.getElementById(dz.id) : null;
        if (!node) return dz;
        const rect = node.getBoundingClientRect();
        const dcx = rect.left + rect.width / 2;
        const dcy = rect.top + rect.height / 2;
        const active = Math.hypot(cx - dcx, cy - dcy) < HIT_RADIUS;
        return { ...dz, active };
      })
    );
  }, []);

  const handleMouseDown = useCallback((e, egg) => {
    if (!dragUnlocked) return;
    e.preventDefault();
    const el = e.currentTarget;
    eggOriginRef.current[egg.id] = {
      ox: parseFloat(el.style.left),
      oy: parseFloat(el.style.top),
    };
    startDrag(el, e.clientX, e.clientY);
    document.addEventListener('mousemove', handlersRef.current.onMM);
    document.addEventListener('mouseup', handlersRef.current.onMU);
  }, [dragUnlocked, startDrag]);

  const handleTouchStart = useCallback((e, egg) => {
    if (!dragUnlocked) return;
    e.preventDefault();
    const t = e.touches[0];
    const el = e.currentTarget;
    eggOriginRef.current[egg.id] = {
      ox: parseFloat(el.style.left),
      oy: parseFloat(el.style.top),
    };
    startDrag(el, t.clientX, t.clientY);
    document.addEventListener('touchmove', handlersRef.current.onTM, { passive: false });
    document.addEventListener('touchend', handlersRef.current.onTE);
  }, [dragUnlocked, startDrag]);

  // Stable event handlers (assigned to ref so they can be referenced before declaration)
  const onMM = useCallback((e) => {
    moveGhost(e.clientX, e.clientY);
  }, [moveGhost]);

  const onTM = useCallback((e) => {
    e.preventDefault();
    const t = e.touches[0];
    moveGhost(t.clientX, t.clientY);
  }, [moveGhost]);

  const onMU = useCallback((e) => {
    endDrag(e.clientX, e.clientY);
    document.removeEventListener('mousemove', handlersRef.current.onMM);
    document.removeEventListener('mouseup', handlersRef.current.onMU);
  }, [endDrag]);

  const onTE = useCallback((e) => {
    const t = e.changedTouches[0];
    endDrag(t.clientX, t.clientY);
    document.removeEventListener('touchmove', handlersRef.current.onTM);
    document.removeEventListener('touchend', handlersRef.current.onTE);
  }, [endDrag]);

  // Keep handler refs up to date
  useEffect(() => {
    handlersRef.current.onMM = onMM;
    handlersRef.current.onTM = onTM;
    handlersRef.current.onMU = onMU;
    handlersRef.current.onTE = onTE;
  }, [onMM, onTM, onMU, onTE]);

  return {
    ghost,
    zones,
    dragLayerRef,
    handleMouseDown,
    handleTouchStart,
  };
}
