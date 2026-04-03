export default function TopBar({ label, sessionLabel }) {
  return (
    <div className="top-bar">
      <span className="top-bar-label">{label}</span>
      <span className="top-bar-center">Lesson</span>
      <div className="top-bar-right">
        <span className="screen-badge" id="session-label">{sessionLabel}</span>
        <div className="help-btn">?</div>
      </div>
    </div>
  );
}
