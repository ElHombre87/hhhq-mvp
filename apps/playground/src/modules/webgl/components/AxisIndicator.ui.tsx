import { useState, useEffect, useMemo } from "react";
import { lerp } from "three/src/math/MathUtils";

export const AxisIndicator: React.FC<{mouse: THREE.Vector2}> = ({mouse}) => {
  const [coords, setCoords] = useState({x: 0, y: 0});
  useEffect(() => {
    if (mouse.x === coords.x || mouse.y === coords.y) return;
    setCoords({x: mouse.x, y: mouse.y});
  },[mouse])

  const bound = {w: 200, h: 200};
  const size = {w: 16, h: 16};

  const position = useMemo(() => {
    return {
      left: lerp(0, bound.w / 2, lerp(-1, 1, coords.x)),
      top: `calc(${coords.y * 100}% - ${size.w} / 2)`
    }
  }, [coords]);

  return (
    <div style={{
      width: bound.w,
      height: bound.h,
      borderRadius: '100%',
      backgroundColor: '#555',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'teal',
        left: position.left,
        right: position.top,
        width: size.w,
        height: size.h,
        borderRadius: 50,
      }}/>
    </div>
  )
}
