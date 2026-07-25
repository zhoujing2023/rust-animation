import { Circle, Layout, Line, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const RED = "#fa6767";

export interface ForbiddenLayoutProps {
  key?: string;
  ref?: ReferenceReceiver<Layout>;
  x?: number;
  y?: number;
  size?: number;
  lineWidth?: number;
  label?: string;
  labelSize?: number;
}

/**
 * 禁止标志（不允许）
 * @param 参数
 * @returns 
 */
export function ForbiddenLayout({
  key = "forbidden_layout",
  ref,
  x = 0,
  y = 0,
  size = 145,
  lineWidth = 18,
  label = "不能再使用",
  labelSize = 32,
}: ForbiddenLayoutProps) {
  return (
    <Layout key={key} ref={ref} x={x} y={y} scale={0}>
      <Circle
        size={size}
        stroke={RED}
        lineWidth={lineWidth}
        fill={"#0B1020DD"}
      />
      <Line
        points={[
          [-48, -48],
          [48, 48],
        ]}
        stroke={RED}
        lineWidth={lineWidth}
        lineCap={"round"}
      />
      <Txt text={label} y={120} fill={RED} fontWeight={700} fontSize={labelSize} />
    </Layout>
  );
}
