import { Line } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";

const START_X = -290;
const STEP_X = 30;
const WAVE_HEIGHT = 10;

/**
 * 生成指定长度的 points 数组
 * @param length 长度
 * @returns 
 */
function generate(length: number): [number, number][] {
  const pointCount = Number.isFinite(length)
    ? Math.max(0, Math.floor(length))
    : 0;

  return Array.from({ length: pointCount }, (_, index) => [
    START_X + index * STEP_X,
    index % 2 === 0 ? 0 : WAVE_HEIGHT,
  ]);
}


export interface UnderLineProps {
  key?: string;
  ref?: ReferenceReceiver<Line>;
  x?: number;
  y?: number;
  length?: number;
}

/**
 * 错误标记（红色波浪线）
 * @param 参数
 * @returns 
 */
export function UnderLine({
  key,
  ref,
  x = 0,
  y = 0,
  length = 11,
}: UnderLineProps) {
  return (
    <Line
      key={key}
      ref={ref}
      points={generate(length)}
      x={x}
      y={y}
      stroke={COLORS.red}
      lineWidth={6}
      lineCap={"round"}
      end={0}
      opacity={0}
    />
  );
}
