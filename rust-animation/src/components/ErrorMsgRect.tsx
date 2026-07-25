import { Layout, Rect, Txt } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";

const BG = "#0B1020";
const TEXT = "#E8ECF6";
const RED = "#FF5C68";
const BLUE = "#55A7FF";

export interface ErrorMsgRectProps {
  key?: string;
  ref?: ReferenceReceiver<Rect>;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  opacity?: number;
  errMsg?: string;
  errContent: string;
}

/**
 * 错误信息 Rect
 * @param 参数
 * @returns 
 */
export function ErrorMsgRect({
  key = "error_msg_rect",
  ref,
  x = 0,
  y = 0,
  width = 900,
  height = 150,
  opacity = 0,
  errMsg = "COMPILER ERROR",
  errContent,
}: ErrorMsgRectProps) {
  return (
    <Rect
      key={key}
      ref={ref}
      x={x}
      y={y}
      width={width}
      height={height}
      radius={24}
      fill={"#351B29"}
      stroke={RED}
      lineWidth={3}
      padding={[28, 34]}
      opacity={opacity}
      scale={0.9}
    >
      <Layout layout direction={"column"} gap={10}>
        <Txt
          text={errMsg}
          fill={RED}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={700}
          fontSize={24}
        />
        <Txt
          text={errContent}
          fill={TEXT}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={29}
        />
      </Layout>
    </Rect>
  );
}
