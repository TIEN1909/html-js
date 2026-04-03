import { useEffect, useRef, useCallback } from 'react';
import { DESIGN_W, DESIGN_H } from '../config';

export function useScale() {
  const rootRef = useRef(null);

  const applyScale = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min(vw / DESIGN_W, vh / DESIGN_H);
    const root = rootRef.current;
    if (!root) return;
    root.style.width = DESIGN_W + 'px';
    root.style.height = DESIGN_H + 'px';
    root.style.transform = 'scale(' + scale + ')';
    root.style.transformOrigin = 'center center';

    // Also expose for other hooks
    window.__SWF_CONFIG__ = { DESIGN_W, DESIGN_H };
  }, []);

  useEffect(() => {
    applyScale();
    window.addEventListener('resize', applyScale);
    window.addEventListener('orientationchange', () => setTimeout(applyScale, 150));
    return () => {
      window.removeEventListener('resize', applyScale);
      window.removeEventListener('orientationchange', applyScale);
    };
  }, [applyScale]);

  return rootRef;
}
