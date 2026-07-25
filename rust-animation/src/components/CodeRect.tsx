import { Code, CodeProps, Rect } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { CodeLayout } from "./CodeLayout";

const PANEL = "#151C31";

export interface CodeRectProps {
  // Rect 组件
  rectRef?: ReferenceReceiver<Rect>;
  rectWidth?: number;
  rectHeight?: number;
  rectPositionX?: number;
  rectPositionY?: number;
  // Code 组件
  code: CodeProps["code"];
  codeRef?: ReferenceReceiver<Code>;
  filename?: string;
  selection?: CodeProps["selection"];
}

/**
 * 默认代码块
 * @param 编辑参数
 * @returns Rect 组件
 */
export function CodeRect({
  rectRef,
  rectWidth = 950,
  rectHeight = 680,
  rectPositionX = 0,
  rectPositionY = 0,
  code,
  codeRef,
  filename,
  selection,
}: CodeRectProps) {
  return (
    <Rect
      key="code_rect"
      ref={rectRef}
      layout
      x={rectPositionX}
      y={rectPositionY}
      width={rectWidth}
      height={rectHeight}
      radius={34}
      fill={PANEL}
      stroke={"#293451"}
      lineWidth={3}
      shadowColor={"#00000066"}
      shadowBlur={35}
      padding={48}
      opacity={0}
    >
      <CodeLayout
        code={code}
        codeRef={codeRef}
        filename={filename}
        selection={selection}
      />
    </Rect>
  );
}
