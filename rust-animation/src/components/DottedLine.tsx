import { Line } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const BLUE = "#55A7FF";

export interface DottedLineProps {
  key?: string;
  ref?: ReferenceReceiver<Line>;
  points: [number, number][];
  stroke?: string;
  lineWidth?: number;
  arrowSize?: number;
  end?: number;
  lineDash?: [number, number];
}

/**
 * 虚线（箭头）
 * @param 参数
 * @returns 
 */
export function DottedLine({
  key = "dotted_line",
  ref,
  points,
  stroke = BLUE,
  lineWidth = 8,
  arrowSize = 22,
  end = 0,
  lineDash = [20, 15],
}: DottedLineProps) {
  return (
    <Line
      key={key}
      ref={ref}
      points={points}
      stroke={stroke}
      lineWidth={lineWidth}
      endArrow
      arrowSize={arrowSize}
      end={end}
      lineDash={lineDash}
    />
  );
}
