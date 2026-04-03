export default function ExitModal({ open, onCancel, onConfirm }) {
  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      id="exit-modal"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="modal-box">
        <div className="modal-icon">🚪</div>
        <div className="modal-title">Thoát bài học?</div>
        <div className="modal-desc">Tiến trình chưa được lưu. Bạn có chắc muốn thoát?</div>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" id="modal-cancel" onClick={onCancel}>
            Tiếp tục học
          </button>
          <button className="modal-btn modal-btn-confirm" id="modal-confirm" onClick={onConfirm}>
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}
