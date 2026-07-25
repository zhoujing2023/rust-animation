import {
  Code,
  CodeProps,
  Layout,
  LezerHighlighter,
  Rect,
  Txt,
} from "@motion-canvas/2d";
import {ReferenceReceiver} from "@motion-canvas/core";
import {HighlightStyle} from "@codemirror/language";
import {parser} from "@lezer/rust";
import {tags} from "@lezer/highlight";

const TEXT = "#E8ECF6";
const MUTED = "#8E9AB5";
const RED = "#FF5C68";


const rustHighlighter = new LezerHighlighter(
  parser,
  HighlightStyle.define([
    {tag: tags.keyword, color: "#C792EA"},
    {tag: tags.function(tags.variableName), color: "#82AAFF"},
    {tag: tags.macroName, color: "#89DDFF"},
    {tag: tags.string, color: "#C3E88D"},
    {tag: tags.number, color: "#F78C6C"},
    {tag: tags.typeName, color: "#FFCB6B"},
    {tag: tags.variableName, color: TEXT},
    {tag: tags.comment, color: "#697098", fontStyle: "italic"},
  ]),
);


export interface CodeLayoutProps {
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
  code,
  codeRef,
  filename = "main.rs",
  selection,
}: CodeLayoutProps) {
  return (
    <Layout
      key="code_layout"
      layout
      direction={"column"}
      width={"100%"}
      height={"100%"}
      gap={42}
    >
      <Layout layout alignItems={"center"} gap={16}>
        <Rect size={16} radius={8} fill={RED} />
        <Rect size={16} radius={8} fill={"#FFC857"} />
        <Rect size={16} radius={8} fill={"#50D890"} />
        <Txt
          marginLeft={18}
          text={filename}
          fill={MUTED}
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
        fill={TEXT}
        selection={selection}
      />
    </Layout>
  );
}
