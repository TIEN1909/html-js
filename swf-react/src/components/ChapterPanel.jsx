import { useEffect } from 'react';
import { STATUS_ICON } from '../config';

export default function ChapterPanel({ open, chapters, prevSession, currentIndex, onSelect, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      const panel = document.getElementById('chapter-panel');
      const btn = document.getElementById('btn-chapter');
      if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open, onClose]);

  const allItems = [
    { ...prevSession, isPrev: true },
    ...chapters.map((c) => ({ ...c, isChapter: true })),
  ];

  return (
    <div className="chapter-panel" id="chapter-panel" style={{ pointerEvents: open ? 'all' : 'none' }}>
      <div className="chapter-panel-header">
        <span className="chapter-panel-title">Chọn chương</span>
        <button className="chapter-panel-close" id="chapter-close" onClick={onClose}>✕</button>
      </div>
      <div className="chapter-list" id="chapter-list">
        {allItems.map((item, i) => {
          const isActive = item.isPrev
            ? currentIndex === -1
            : currentIndex === i - 1;
          const isLocked = item.isChapter && item.status === 'locked';

          return (
            <div
              key={item.id || i}
              className={`chapter-item${isActive ? ' active' : ''}${isLocked ? ' locked' : ''}`}
              onClick={() => {
                if (!isLocked) onSelect(item);
              }}
            >
              <div className="chapter-num">{item.isPrev ? '←' : item.id}</div>
              <div className="chapter-info">
                <div className="chapter-name">{item.name}</div>
                <div className="chapter-sub">{item.sub}</div>
              </div>
              <div className="chapter-status">
                {isLocked ? STATUS_ICON.locked : isActive ? STATUS_ICON.current : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
