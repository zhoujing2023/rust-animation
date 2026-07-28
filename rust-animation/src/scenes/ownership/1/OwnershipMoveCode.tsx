import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { parser } from "@lezer/rust";
import {
  Circle,
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
  createRef,
  easeOutBack,
  waitUntil
} from "@motion-canvas/core";
import { DataRect1 } from "../../../components/DataRect1";
import { DataRect2 } from "../../../components/DataRect2";
import { TitleLayout } from "../../../components/TitleLayout";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const MUTED = "#7F8AA3";
const BLUE = "#55A7FF";
const RED = "#FF5C68";
const YELLOW = "#FFD447";

const rustHighlighter = new LezerHighlighter(
  parser,
  HighlightStyle.define([
    { tag: tags.keyword, color: "#C792EA" },
    { tag: tags.typeName, color: "#FFCB6B" },
    { tag: tags.function(tags.variableName), color: "#82AAFF" },
    { tag: tags.function(tags.propertyName), color: "#82AAFF" },
    { tag: tags.string, color: "#C3E88D" },
    { tag: tags.variableName, color: TEXT },
  ]),
);

export default makeScene2D(function* (view) {
  view.fill(BG);

  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const xiaomingCard = createRef<Rect>();
  const zhangsanCard = createRef<Rect>();
  const oldLink = createRef<Line>();
  const newLink = createRef<Line>();
  const movedBadge = createRef<Rect>();
  const moveLabel = createRef<Layout>();
  const forbidden = createRef<Layout>();

  view.add(
    <>
      <TitleLayout
        title={"代码里发生了什么？"}
        y={-690}
        subtitle={["变量名变化，数据不复制", 27, MUTED]}
      ></TitleLayout>

      <Rect
        key={"scene4_code_card"}
        ref={codeCard}
        layout
        y={-420}
        width={950}
        height={260}
        padding={42}
        radius={32}
        fill={PANEL}
        stroke={"#2A3552"}
        lineWidth={3}
        opacity={0}
      >
        <Layout layout direction={"column"} gap={30}>
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
            key={"scene4_rust_code"}
            ref={code}
            highlighter={rustHighlighter}
            code={`let xiaoming_key = String::from("电动车钥匙");\nlet zhangsan_key = xiaoming_key;`}
            fontFamily={"JetBrains Mono, monospace"}
            fontSize={32}
            lineHeight={62}
            fill={TEXT}
            selection={lines(0)}
          />
        </Layout>
      </Rect>

      {/* 内存关系 */}
      <Layout y={-130}>
        <Txt
          key={"scene4_memory_label"}
          text={"内存关系"}
          x={-365}
          y={-50}
          fill={MUTED}
          fontWeight={700}
          fontSize={30}
        />

        <DataRect2
          key="xiaoming_rect_2"
          ref={xiaomingCard}
          x={-285}
          y={80}
          width={390}
          height={150}
          radius={24}
          fill="#172B45"
          stroke={BLUE}
          lineWidth={4}
          label={["xiaoming_key", 36, BLUE]}
          opacity={1}
        />

        <Line
          key={"scene4_xiaoming_data_link"}
          ref={oldLink}
          points={[
            [-70, 80],
            [60, 180],
          ]}
          stroke={BLUE}
          lineWidth={10}
          endArrow
          arrowSize={25}
          end={0}
        />

        <DataRect1
          x={300}
          y={270}
          width={410}
          height={280}
          radius={30}
          fill="#332E16"
          stroke={YELLOW}
          lineWidth={5}
          shadowColor={"#FFD44733"}
          shadowBlur={30}
          label1={["String", 32, YELLOW]}
          label2={["“电动车钥匙”", 40, TEXT]}
          label3={["同一份数据", 27, MUTED]}
          opacity={1}
        />

        <DataRect2
          key="zhangsan_rect_2"
          ref={zhangsanCard}
          x={-285}
          y={400}
          width={390}
          height={150}
          radius={24}
          fill="#3A1C29"
          stroke={RED}
          lineWidth={4}
          label={["xiaoming_key", 36, RED]}
          opacity={0}
        />
        <Line
          key={"scene4_zhangsan_data_link"}
          ref={newLink}
          points={[
            [-70, 380],
            [70, 350],
          ]}
          stroke={RED}
          lineWidth={10}
          endArrow
          arrowSize={25}
          end={0}
        />

        <Rect
          key={"scene4_moved_badge"}
          ref={movedBadge}
          x={-285}
          y={195}
          radius={15}
          fill={"#343B4B"}
          padding={[9, 20]}
          opacity={0}
          scale={0.8}
          width={120}
          height={50}
        >
          <Txt
            text={"失效"}
            fill={"#B7BECD"}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={700}
            fontSize={30}
          />
        </Rect>
      </Layout>

      <Layout
        key={"scene4_move_label"}
        ref={moveLabel}
        layout
        direction={"column"}
        alignItems={"center"}
        y={510}
        gap={8}
        opacity={0}
        scale={0.9}
      >
        <Txt
          text={"Move"}
          fill={YELLOW}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={800}
          fontSize={66}
        />
        <Txt
          text={"从这一刻开始，xiaoming_key 失效"}
          fill={TEXT}
          fontSize={33}
        />
      </Layout>

      <Layout
        key={"scene4_forbidden"}
        ref={forbidden}
        x={-280}
        y={-50}
        scale={0}
      >
        <Circle size={145} stroke={RED} lineWidth={18} />
        <Line
          points={[
            [-48, -48],
            [48, 48],
          ]}
          stroke={RED}
          lineWidth={18}
          lineCap={"round"}
        />
      </Layout>
    </>,
  );

  codeCard().y(-300);
  yield* all(codeCard().opacity(1, 0.45), codeCard().y(-420, 0.7, easeOutBack));

  yield* waitUntil("scene4_initial_owner");
  yield* all(oldLink().end(1, 0.55), code().selection(lines(0), 0.35));

  yield* waitUntil("scene4_execute_assignment");
  yield* code().selection(lines(1), 0.4);

  yield* waitUntil("scene4_switch_ownership");
  yield* oldLink().end(0, 0.4);
  yield* all(zhangsanCard().opacity(1, 0.45), newLink().end(1, 0.65));

  yield* waitUntil("scene4_xiaoming_opacity");
  yield* xiaomingCard().opacity(0.35, 0.5);

  yield* waitUntil("scene4_forbidden_show");
  yield* all(
    forbidden().scale(0.8, 0.6, easeOutBack),
    movedBadge().opacity(1, 0.35),
    movedBadge().scale(1, 0.45, easeOutBack),
  );

  yield* waitUntil("scene4_move_named");
  yield* all(
    moveLabel().opacity(1, 0.4),
    moveLabel().scale(1, 0.55, easeOutBack),
  );

  yield* waitUntil("scene4_end");
});
