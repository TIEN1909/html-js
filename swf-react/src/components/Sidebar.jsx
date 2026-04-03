import ChapterPanel from './ChapterPanel';

export default function Sidebar({
  currentSessionIndex,
  onChapterSelect,
  chapters,
  prevSession,
  chaptersOpen,
  onToggleChapter,
}) {
  return (
    <div className="sidebar-right">
      <button className="side-btn side-btn-flag" id="btn-flag" title="Menu" />

      <button className="side-btn side-btn-trophy" id="btn-trophy" title="Rewards" />

      <div className="sidebar-divider" />

      <button className="side-chapter-btn" id="btn-chapter" title="Chọn chương" onClick={onToggleChapter}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="#1c0a00" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6"  x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6"  x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      </button>

      <ChapterPanel
        open={chaptersOpen}
        chapters={chapters}
        prevSession={prevSession}
        currentIndex={currentSessionIndex}
        onSelect={onChapterSelect}
        onClose={() => onToggleChapter(false)}
      />
    </div>
  );
}
