import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { Code, CodeProps, LezerHighlighter } from "@motion-canvas/2d";
import { ReferenceReceiver } from "@motion-canvas/core";
import { COLORS } from "../constants";
import { parser } from "@lezer/rust";

const rustHighlighter = new LezerHighlighter(
  parser,
  HighlightStyle.define([
    { tag: tags.keyword, color: "#C792EA" },
    { tag: tags.function(tags.variableName), color: "#82AAFF" },
    { tag: tags.macroName, color: "#89DDFF" },
    { tag: tags.string, color: "#C3E88D" },
    { tag: tags.number, color: "#F78C6C" },
    { tag: tags.typeName, color: "#FFCB6B" },
    { tag: tags.variableName, color: COLORS.text },
    { tag: tags.comment, color: "#697098", fontStyle: "italic" },
  ]),
);

export interface RustCodeProps {
  ref?: ReferenceReceiver<Code>;
  code: CodeProps["code"];
  selection?: CodeProps["selection"];
}

/**
 * Rust Code
 * @param 参数
 * @returns 
 */
export function RustCode({ ref, code, selection }: RustCodeProps) {
  return (
    <Code
      ref={ref}
      highlighter={rustHighlighter}
      code={code}
      fontFamily={"JetBrains Mono, monospace"}
      fontSize={32}
      lineHeight={58}
      fill={COLORS.text}
      selection={selection}
    />
  );
}
