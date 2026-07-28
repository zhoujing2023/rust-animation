import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { parser } from "@lezer/rust";
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
import { all, createRef, easeOutBack, waitUntil } from "@motion-canvas/core";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";
const RED = "#FF5C68";
const YELLOW = "#FFD447";
const GREEN = "#54D98C";

const rustHighlighter = new LezerHighlighter(
  parser,
  HighlightStyle.define([
    { tag: tags.keyword, color: "#C792EA" },
    { tag: tags.typeName, color: "#FFCB6B" },
    { tag: tags.function(tags.variableName), color: "#82AAFF" },
    { tag: tags.string, color: "#C3E88D" },
    { tag: tags.number, color: "#F78C6C" },
    { tag: tags.comment, color: MUTED },
    { tag: tags.variableName, color: TEXT },
  ]),
);

export default makeScene2D(function* (view) {
  view.fill(BG);

  const heading = createRef<Layout>();
  const copyCard = createRef<Rect>();
  const moveCard = createRef<Rect>();
  const copyCode = createRef<Code>();
  const moveCode = createRef<Code>();
  const copyBadge = createRef<Rect>();
  const moveBadge = createRef<Rect>();
  const divider = createRef<Line>();
  const ending = createRef<Layout>();

  view.add(
    <>
      <Layout
        ref={heading}
        layout
        direction={"column"}
        alignItems={"center"}
        y={-725}
        gap={12}
        opacity={0}
      >
        <Layout direction={"row"} gap={20}>
          <Txt
            text={"并非所有赋值都会"}
            fill={TEXT}
            fontWeight={800}
            fontSize={58}
          />
          <Txt text={"Move"} fill={YELLOW} fontWeight={800} fontSize={58} />
        </Layout>

        <Txt text={"类型决定赋值时发生什么"} fill={MUTED} fontSize={31} />
      </Layout>

      <Line
        ref={divider}
        points={[
          [0, -510],
          [0, 395],
        ]}
        stroke={"#34405C"}
        lineWidth={4}
        start={0.5}
        end={0.5}
      />

      <Rect
        ref={copyCard}
        x={-270}
        y={-60}
        width={500}
        height={890}
        radius={32}
        fill={PANEL}
        stroke={"#285E49"}
        lineWidth={4}
        opacity={0}
      >
        <Layout
          layout
          direction={"column"}
          alignItems={"center"}
          gap={32}
          padding={[50, 25]}
        >
          <Rect
            ref={copyBadge}
            width={220}
            height={90}
            radius={45}
            fill={"#18392F"}
            stroke={GREEN}
            lineWidth={3}
            scale={0.8}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Txt
              text={"Copy"}
              fill={GREEN}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={900}
              fontSize={47}
            />
          </Rect>
          <Txt
            text={"i32"}
            fill={TEXT}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={800}
            fontSize={42}
          />
          <Rect
            width={445}
            height={480}
            radius={22}
            fill={"#101626"}
            padding={25}
          >
            <Code
              ref={copyCode}
              highlighter={rustHighlighter}
              code={`let a = 10;\nlet b = a;\n\nprintln!("{a}"); // OK`}
              fontFamily={"JetBrains Mono, monospace"}
              fontSize={25}
              lineHeight={68}
              fill={TEXT}
              selection={lines(0, 1)}
            />
          </Rect>
          <Txt
            text={"直接复制值"}
            fill={GREEN}
            fontWeight={700}
            fontSize={34}
          />
          <Txt text={"a 仍然有效 ✓"} fill={TEXT} fontSize={29} />
        </Layout>
      </Rect>

      <Rect
        ref={moveCard}
        x={270}
        y={-60}
        width={500}
        height={890}
        radius={32}
        fill={PANEL}
        stroke={"#5A2834"}
        lineWidth={4}
        opacity={0}
      >
        <Layout
          layout
          direction={"column"}
          alignItems={"center"}
          gap={32}
          padding={[50, 25]}
        >
          <Rect
            ref={moveBadge}
            width={220}
            height={90}
            radius={45}
            fill={"#3A1C29"}
            stroke={RED}
            lineWidth={3}
            scale={0.8}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Txt
              text={"Move"}
              fill={RED}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={900}
              fontSize={47}
            />
          </Rect>
          <Txt
            text={"String"}
            fill={TEXT}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={800}
            fontSize={42}
          />
          <Rect
            width={445}
            height={480}
            radius={23}
            fill={"#101626"}
            padding={25}
          >
            <Code
              ref={moveCode}
              highlighter={rustHighlighter}
              code={`let s1 = String::from("hello");\nlet s2 = s1;\n\nprintln!("{s1}"); // Error`}
              fontFamily={"JetBrains Mono, monospace"}
              fontSize={22}
              lineHeight={57}
              fill={TEXT}
              selection={lines(-1)}
            />
          </Rect>
          <Txt text={"转移所有权"} fill={RED} fontWeight={700} fontSize={34} />
          <Txt text={"s1 随后失效 ×"} fill={TEXT} fontSize={29} />
        </Layout>
      </Rect>

      <Layout
        ref={ending}
        layout
        direction={"column"}
        alignItems={"center"}
        y={0}
        gap={80}
        opacity={0}
        scale={0.9}
      >
        <Txt
          text={"Rust 所有权入门"}
          fill={YELLOW}
          fontWeight={900}
          fontSize={68}
        />
        <Txt
          text={"Rust 为什么允许多个不可变引用，却只允许\n一个可变引用？"}
          fill={TEXT}
          fontWeight={800}
          fontSize={50}
        />
        <Rect width={520} height={6} radius={3} fill={BLUE} marginTop={10} />
      </Layout>
    </>,
  );

  yield* heading().opacity(1, 0.2);

  yield* waitUntil("scene8_show_types");
  yield* all(
    divider().start(0, 0.5),
    divider().end(1, 0.5),
    copyCard().opacity(1, 0.2),
    moveCard().opacity(1, 0.2),
  );

  yield* waitUntil("scene8_copy");
  yield* all(
    copyCode().selection(lines(3), 0.4),
    copyBadge().scale(1, 0.5, easeOutBack),
    copyBadge().shadowColor("#54D98C66", 0.35),
    copyBadge().shadowBlur(30, 0.35),
  );

  yield* waitUntil("scene8_move_show");
  yield* all(
    moveCode().selection(lines(0, 1), 0.4),
    moveBadge().scale(1, 0.5, easeOutBack),
    moveBadge().shadowColor("#FF5C6866", 0.35),
    moveBadge().shadowBlur(30, 0.35),
  );

  yield* waitUntil("scene8_move");
  yield* all(moveCode().selection(lines(3), 0.4));

  yield* waitUntil("scene8_ending");
  yield* all(
    heading().opacity(0.2, 0.4),
    copyCard().opacity(0.2, 0.4),
    moveCard().opacity(0.2, 0.4),
    divider().opacity(0.2, 0.4),
    ending().opacity(1, 0.45),
    ending().scale(1, 0.55, easeOutBack),
  );

  yield* waitUntil("scene8_end");
});
