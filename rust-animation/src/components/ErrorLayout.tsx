import { Circle, Layout, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";

export interface ErrorLayoutProps {
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
 * 异常标识
 * @param 参数
 * @returns
 */
export function ErrorLayout({
  key,
  ref,
  x = 0,
  y = 0,
  size = 44,
  opacity = 0,
  scale = 1,
  fontSize = 32,
}: ErrorLayoutProps) {
  return (
    <Layout key={key} ref={ref} x={x} y={y} opacity={opacity} scale={scale}>
      <Circle size={size} fill={COLORS.red} />
      <Txt
        text={"×"}
        fill={COLORS.bg}
        fontWeight={900}
        fontSize={fontSize}
        fontFamily={"JetBrains Mono, monospace"}
      />
    </Layout>
  );
}
