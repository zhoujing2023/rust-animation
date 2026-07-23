import {
  Code,
  Layout,
  LezerHighlighter,
  Line,
  Rect,
  Txt,
  lines,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  easeOutBack,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { HighlightStyle } from "@codemirror/language";
import { parser } from "@lezer/rust";
import { tags } from "@lezer/highlight";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const MUTED = "#8E9AB5";
const RED = "#FF5C68";
const BLUE = "#55A7FF";

export default makeScene2D(function* (view) {
  view.fill(BG);

  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const underline = createRef<Line>();
  const error = createRef<Rect>();

  const rustHighlighter = new LezerHighlighter(
    parser,
    HighlightStyle.define([
      {
        tag: tags.keyword,
        color: "#C792EA",
      },
      {
        tag: tags.function(tags.variableName),
        color: "#82AAFF",
      },
      {
        // 宏，如 `println!`
        tag: tags.macroName,
        color: "#89DDFF",
      },
      {
        tag: tags.string,
        color: "#C3E88D",
      },
      {
        tag: tags.number,
        color: "#F78C6C",
      },
      {
        tag: tags.typeName,
        color: "#FFCB6B",
      },
      {
        tag: tags.variableName,
        color: "#E8ECF6",
      },
      {
        tag: tags.comment,
        color: "#697098",
        fontStyle: "italic",
      },
    ]),
  );

  view.add(
    <>
      <Layout
        key="title_layout"
        layout
        direction={"column"}
        alignItems={"center"}
        y={-550}
        gap={20}
      >
        <Txt
          text={"为什么赋值一次，原变量就不能再用了？"}
          fill={TEXT}
          fontFamily={"Inter, sans-serif"}
          fontWeight={700}
          fontSize={54}
          width={900}
          textAlign={"center"}
          textWrap
        />
        <Txt
          text={"RUST OWNERSHIP"}
          fill={BLUE}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={26}
          letterSpacing={6}
        />
      </Layout>

      <Rect
        key="code_rect"
        ref={codeCard}
        layout
        y={210}
        width={950}
        height={680}
        radius={34}
        fill={PANEL}
        stroke={"#293451"}
        lineWidth={3}
        shadowColor={"#00000066"}
        shadowBlur={35}
        padding={48}
        opacity={0}
      >
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
              text={"main.rs"}
              fill={MUTED}
              fontFamily={"JetBrains Mono, monospace"}
              fontSize={25}
            />
          </Layout>
          <Code
            ref={code}
            highlighter={rustHighlighter}
            code={`let xiaoming_key = String::from("电动车钥匙");\nlet zhangsan_key = xiaoming_key;\n\nprintln!("{}", xiaoming_key);`}
            fontFamily={"JetBrains Mono, monospace"}
            fontSize={32}
            lineHeight={58}
            fill={TEXT}
            selection={lines(0)}
          />
        </Layout>
      </Rect>

      <Line
        ref={underline}
        points={[
          [-290, 0],
          [-260, 10],
          [-230, 0],
          [-200, 10],
          [-170, 0],
          [-140, 10],
          [-110, 0],
          [-80, 10],
          [-50, 0],
          [-20, 10],
          [10, 0],
        ]}
        x={130}
        y={20}
        stroke={RED}
        lineWidth={6}
        lineCap={"round"}
        end={0}
        opacity={0}
      />

      <Rect
        ref={error}
        y={170}
        width={900}
        height={150}
        radius={24}
        fill={"#351B29"}
        stroke={RED}
        lineWidth={3}
        padding={[28, 34]}
        opacity={0}
        scale={0.9}
      >
        <Layout layout direction={"column"} gap={10}>
          <Txt
            text={"COMPILER ERROR"}
            fill={RED}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={700}
            fontSize={24}
          />
          <Txt
            text={"borrow of moved value: `xiaoming_key`"}
            fill={TEXT}
            fontFamily={"JetBrains Mono, monospace"}
            fontSize={29}
          />
        </Layout>
      </Rect>
    </>,
  );

  codeCard().y(520);

  yield* all(codeCard().opacity(1, 0.45), codeCard().y(0, 0.8, easeOutBack));

  yield* waitUntil("scene1_create_key");
  yield* code().selection(lines(0), 0.3);

  yield* waitUntil("scene1_move_key");
  yield* code().selection(lines(1), 0.35);

  yield* waitUntil("scene1_use_moved_value");
  yield* code().selection(lines(3), 0.3);
  yield* waitFor(0.4);
  yield* underline().opacity(1).end(1, 0.4);
  yield* chain(
    codeCard().x(-14, 0.07),
    codeCard().x(14, 0.07),
    codeCard().x(-9, 0.07),
    codeCard().x(9, 0.07),
    codeCard().x(0, 0.07),
  );
  yield* all(error().opacity(1, 0.25), error().scale(1, 0.4, easeOutBack));

  yield* waitUntil("scene1_end");
});
