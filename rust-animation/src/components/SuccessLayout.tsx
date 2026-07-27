import { Circle, Layout, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";

export interface SuccessLayoutProps {
  key?: string;
  ref?: ReferenceReceiver<Layout>;
  x?: number;
  y?: number;
  size?: number;
  opacity?: number;
  scale?: number;
  fontSize?: number;
}

/**
 * 成功标识
 * @param 参数
 * @returns
 */
export function SuccessLayout({
  key,
  ref,
  x = 0,
  y = 0,
  size = 44,
  opacity = 0,
  scale = 1,
  fontSize = 30,
}: SuccessLayoutProps) {
  return (
    <Layout key={key} ref={ref} x={x} y={y} opacity={opacity} scale={scale}>
      <Circle size={size} fill={COLORS.green} />
      <Txt
        text={"✓"}
        fill={COLORS.bg}
        fontWeight={900}
        fontSize={fontSize}
        fontFamily={"JetBrains Mono, monospace"}
      />
    </Layout>
  );
}
