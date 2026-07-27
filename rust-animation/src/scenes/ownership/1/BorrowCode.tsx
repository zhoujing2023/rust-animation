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
import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { parser } from "@lezer/rust";
import { all, createRef, easeOutBack, waitUntil } from "@motion-canvas/core";
import { SuccessLayout } from "../../../components/SuccessLayout";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";
const RED = "#FF5C68";
const YELLOW = "#FFD447";
const GREEN = "#54D98C";

const moveCode = `let xiaoming_key = String::from("电动车钥匙");
let zhangsan_key = xiaoming_key;

println!("张三临时使用：{}", zhangsan_key);
println!("小明仍然拥有：{}", xiaoming_key);`;

const borrowCode = `let xiaoming_key = String::from("电动车钥匙");
let zhangsan_key = &xiaoming_key;

println!("张三临时使用：{}", zhangsan_key);
println!("小明仍然拥有：{}", xiaoming_key);`;

const rustHighlighter = new LezerHighlighter(
  parser,
  HighlightStyle.define([
    { tag: tags.keyword, color: "#C792EA" },
    { tag: tags.typeName, color: "#FFCB6B" },
    { tag: tags.function(tags.variableName), color: "#82AAFF" },
    { tag: tags.string, color: "#C3E88D" },
    { tag: tags.variableName, color: TEXT },
  ]),
);

export default makeScene2D(function* (view) {
  view.fill(BG);

  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const ampersand = createRef<Rect>();
  const firstSuccess = createRef<Layout>();
  const secondSuccess = createRef<Layout>();
  const ownerLink = createRef<Line>();

  view.add(
    <Layout y={200}>
      <Layout
        layout
        direction={"column"}
        alignItems={"center"}
        y={-800}
        gap={60}
      >
        <Txt
          text={"临时使用，不拿走"}
          fill={TEXT}
          fontWeight={800}
          fontSize={56}
        />
        <Txt
          text={"在变量前加一个 &"}
          fill={MUTED}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={29}
        />
      </Layout>

      <Rect
        ref={codeCard}
        layout
        y={-250}
        width={960}
        height={450}
        radius={30}
        fill={PANEL}
        stroke={"#2A3552"}
        lineWidth={3}
        opacity={0}
        padding={48}
      >
        <Layout layout direction={"column"} gap={22} size={"100%"}>
          <Layout layout alignItems={"center"} gap={12}>
            <Circle size={14} fill={RED} />
            <Circle size={14} fill={"#FFC857"} />
            <Circle size={14} fill={GREEN} />
            <Txt
              marginLeft={16}
              text={"main.rs · Borrow"}
              fill={MUTED}
              fontFamily={"JetBrains Mono, monospace"}
              fontSize={25}
            />
          </Layout>
          <Code
            ref={code}
            highlighter={rustHighlighter}
            code={moveCode}
            fontFamily={"JetBrains Mono, monospace"}
            fontSize={32}
            lineHeight={58}
            fill={TEXT}
            selection={lines(1)}
          />
        </Layout>
      </Rect>
      <Rect
        ref={ampersand}
        x={130}
        y={-740}
        size={70}
        radius={16}
        fill={BLUE}
        opacity={1}
        scale={1}
      >
        <Txt
          text={"&"}
          fill={BG}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={900}
          fontSize={49}
        />
      </Rect>

      <Line
        ref={ownerLink}
        points={[
          [100, -680],
          [-70, -340],
        ]}
        stroke={BLUE}
        lineWidth={8}
        endArrow
        arrowSize={22}
        end={0}
        lineDash={[20, 15]}
      />
      <SuccessLayout
        key="first_success_layout"
        ref={firstSuccess}
        x={400}
        y={-180}
        opacity={0}
        scale={0.2}
      ></SuccessLayout>
      <SuccessLayout
        key="second_success_layout"
        ref={secondSuccess}
        x={400}
        y={-120}
        opacity={0}
        scale={0.2}
      ></SuccessLayout>
    </Layout>,
  );

  yield* codeCard().opacity(1, 0.45);

  yield* waitUntil("scene6_first_print");

  yield* waitUntil("scene6_owner_link");
  yield* ownerLink().end(1, 0.5);

  yield* waitUntil("scene6_insert_code");
  yield* ownerLink().opacity(0, 0.2);
  yield* code().code(borrowCode, 0.3);

  yield* waitUntil("scene6_zhangsan_show_success");
  yield* code().selection(lines(3), 0.35);
  yield* all(
    firstSuccess().opacity(1, 0.25),
    firstSuccess().scale(1, 0.4, easeOutBack),
  );

  yield* waitUntil("scene6_xiaoming_show_success");
  yield* code().selection(lines(4), 0.35);
  yield* all(
    firstSuccess().opacity(0.5, 0.25),
    secondSuccess().opacity(1, 0.25),
    secondSuccess().scale(1, 0.4, easeOutBack),
  );

  yield* waitUntil("scene6_end");
});
