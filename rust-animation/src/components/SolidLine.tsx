import { Line } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const BLUE = "#55A7FF";

export interface SolidLineProps {
  key?: string;
  ref?: ReferenceReceiver<Line>;
  x?: number;
  y?: number;
  points: [number, number][];
  lineWidth?: number;
  arrowSize?: number;
  color?: string;
  end?: number;
}

/**
 * 实线箭头
 * @param 参数
 * @returns
 */
export function SolidLine({
  key = "link_line",
  ref,
  x = 0,
  y = 0,
  points,
  lineWidth = 10,
  arrowSize = 24,
  color = BLUE,
  end = 0,
}: SolidLineProps) {
  return (
    <Line
      key={key}
      ref={ref}
      points={points}
      x={x}
      y={y}
      stroke={color}
      lineWidth={lineWidth}
      endArrow
      arrowSize={arrowSize}
      end={end}
    />
  );
}
