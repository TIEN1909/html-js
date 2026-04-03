export default function BottomBar({
  isPlaying,
  isShowingFrame,
  nextEnabled,
  onExit,
  onBack,
  onPrev,
  onListen,
  onPlayPause,
  onNext,
}) {
  return (
    <div className="bottom-bar">
      <button className="pill pill-exit" onClick={onExit} title="Thoát bài học" />

      <button className="pill pill-back" onClick={onBack} title="Bài trước" />

      <button className="pill pill-prev" onClick={onPrev} title="Chương trước" />

      <div className="bar-spacer" />
      <div className="bar-spacer" />

      <button className="pill pill-listen" onClick={onListen} title="Nghe lại từ đầu" />

      <button
        className="pill pill-playpause"
        data-state={isPlaying ? 'playing' : 'paused'}
        onClick={onPlayPause}
        title={isPlaying ? 'Tạm dừng' : 'Phát'}
      />

      <div className="bar-spacer" />

      <div
        id="btn-next-wrap"
        className={nextEnabled ? 'enabled' : 'disabled-next'}
        onClick={() => { if (nextEnabled) onNext(); }}
        title="Bài tiếp theo"
        style={{ cursor: nextEnabled ? 'pointer' : 'default' }}
      >
        <div id="btn-next-arrow" />
      </div>
    </div>
  );
}
