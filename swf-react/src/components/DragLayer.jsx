import { GAME } from '../config';

export default function DragLayer({
  question,
  dragUnlocked,
  zones,
  dragLayerRef,
  handleMouseDown,
  handleTouchStart,
}) {
  return (
    <div
      id="drag-layer"
      ref={dragLayerRef}
      style={{
        pointerEvents: question ? 'all' : 'none',
        display: question ? 'block' : 'none',
      }}
    >
      {/* Drop zones */}
      {zones.map((dz) => (
        <div
          key={dz.id}
          id={dz.id}
          className={`drop-zone${dz.active ? ' active' : ''}${dz.filled ? ' filled' : ''}`}
          data-frame={question?.frameNum}
          style={{
            left: dz.x,
            top: dz.y,
            width: dz.w,
            height: dz.h,
          }}
        />
      ))}

      {/* Eggs */}
      {question?.eggs.map((egg) => (
        <div
          key={egg.id}
          className={`egg${!dragUnlocked ? ' locked-drag' : ''}`}
          data-id={egg.id}
          data-value={egg.value}
          style={{ left: egg.x, top: egg.y }}
          onMouseDown={(e) => handleMouseDown(e, egg)}
          onTouchStart={(e) => handleTouchStart(e, egg)}
        >
          <img src={GAME.EGG_IMG} alt="egg" />
        </div>
      ))}

      {/* Feedback — direct child of drag-layer (same as original HTML) */}
      <div id="feedback" />
    </div>
  );
}
