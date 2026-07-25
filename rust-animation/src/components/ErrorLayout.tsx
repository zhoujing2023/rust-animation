import { Circle, Layout, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const BG = "#0B1020";
const RED = "#FF5C68";

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
  key = "error_layout",
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
      <Circle size={size} fill={RED} />
      <Txt text={"X"} fill={BG} fontWeight={900} fontSize={fontSize} />
    </Layout>
  );
}
