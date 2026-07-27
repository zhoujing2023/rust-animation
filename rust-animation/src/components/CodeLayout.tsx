import {
  Code,
  CodeProps,
  Layout,
  LezerHighlighter,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { HighlightStyle } from "@codemirror/language";
import { parser } from "@lezer/rust";
import { tags } from "@lezer/highlight";
import {COLORS} from "../constants";


const rustHighlighter = new LezerHighlighter(
  parser,
  HighlightStyle.define([
    { tag: tags.keyword, color: "#C792EA" },
    { tag: tags.function(tags.variableName), color: "#82AAFF" },
    { tag: tags.macroName, color: "#89DDFF" },
    { tag: tags.string, color: "#C3E88D" },
    { tag: tags.number, color: "#F78C6C" },
    { tag: tags.typeName, color: "#FFCB6B" },
    { tag: tags.variableName, color:COLORS.text  },
    { tag: tags.comment, color: "#697098", fontStyle: "italic" },
  ]),
);

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
      
      <Code
        ref={codeRef}
        highlighter={rustHighlighter}
        code={code}
        fontFamily={"JetBrains Mono, monospace"}
        fontSize={32}
        lineHeight={58}
        fill={COLORS.text}
        selection={selection}
      />
    </Layout>
  );
}
