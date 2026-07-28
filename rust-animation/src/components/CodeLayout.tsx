import {
  Code,
  CodeProps,
  Layout,
  Rect,
  Txt
} from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";
import { RustCode } from "./RustCode";



export interface CodeLayoutProps {
  key?: string;
  code: CodeProps["code"];
  codeRef?: ReferenceReceiver<Code>;
  filename?: string;
  selection?: CodeProps["selection"];
}

/**
 * 代码片段
 * @param 参数
 * @returns Layout
 */
export function CodeLayout({
  key,
  code,
  codeRef,
  filename = "main.rs",
  selection,
}: CodeLayoutProps) {
  return (
    <Layout
      key={key}
      layout
      direction={"column"}
      width={"100%"}
      height={"100%"}
      gap={42}
    >
      <Layout layout alignItems={"center"} gap={16}>
        <Rect size={16} radius={8} fill={COLORS.red} />
        <Rect size={16} radius={8} fill={"#FFC857"} />
        <Rect size={16} radius={8} fill={"#50D890"} />
        <Txt
          marginLeft={18}
          text={filename}
          fill={COLORS.muted}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={25}
        />
      </Layout>
      
      <RustCode
        ref={codeRef}
        code={code}
        selection={selection}
      />
    </Layout>
  );
}
