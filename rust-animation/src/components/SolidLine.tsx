import { Line } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";

export interface SolidLineProps {
  key?: string;
  ref?: ReferenceReceiver<Line>;
  x?: number;
  y?: number;
  points: [number, number][];
  lineWidth?: number;
  arrowSize?: number;
  stroke?: string;
  end?: number;
}

/**
 * 带箭头的实线
 * @param 参数
 * @returns
 */
export function SolidLine({
  key,
  ref,
  x = 0,
  y = 0,
  points,
  lineWidth = 10,
  arrowSize = 24,
  stroke = COLORS.blue,
  end = 0,
}: SolidLineProps) {
  return (
    <Line
      key={key}
      ref={ref}
      points={points}
      x={x}
      y={y}
      stroke={stroke}
      lineWidth={lineWidth}
      endArrow
      arrowSize={arrowSize}
      end={end}
    />
  );
}
