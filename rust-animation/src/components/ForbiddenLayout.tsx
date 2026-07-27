import { Circle, Layout, Line, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";

export interface ForbiddenLayoutProps {
  key?: string;
  ref?: ReferenceReceiver<Layout>;
  x?: number;
  y?: number;
  size?: number;
  label?: string;
  labelSize?: number;
}

/**
 * 禁止标志（不允许）
 * @param 参数
 * @returns
 */
export function ForbiddenLayout({
  key,
  ref,
  x = 0,
  y = 0,
  size = 145,
  label = "不能再使用",
  labelSize = 32,
}: ForbiddenLayoutProps) {
  const diagonalOffset = size * (48 / 145);
  const lineWidth = size * (18 / 145);
  return (
    <Layout key={key} ref={ref} x={x} y={y} scale={0}>
      <Circle
        size={size}
        stroke={COLORS.red}
        lineWidth={lineWidth}
        fill={"#0B1020DD"}
      />
      <Line
        points={[
          [-diagonalOffset, -diagonalOffset],
          [diagonalOffset, diagonalOffset],
        ]}
        stroke={COLORS.red}
        lineWidth={lineWidth}
        lineCap={"round"}
      />
      <Txt
        text={label}
        y={size}
        fill={COLORS.red}
        fontWeight={700}
        fontSize={labelSize}
      />
    </Layout>
  );
}
