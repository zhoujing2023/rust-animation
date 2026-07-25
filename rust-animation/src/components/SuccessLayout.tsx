import { Circle, Layout, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const BG = "#0B1020";
const GREEN = "#54D98C";

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
  key = "success_layout",
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
      <Circle size={size} fill={GREEN} />
      <Txt text={"✓"} fill={BG} fontWeight={900} fontSize={fontSize} />
    </Layout>
  );
}
