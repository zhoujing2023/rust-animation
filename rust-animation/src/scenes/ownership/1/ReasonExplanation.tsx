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
  easeInOutCubic,
  easeOutBack,
  waitUntil
} from "@motion-canvas/core";

const BG = "#0B1020";
const PANEL = "#151C31";
const TEXT = "#E8ECF6";
const MUTED = "#94A0BA";
const BLUE = "#55A7FF";
const RED = "#FF5C68";
const YELLOW = "#FFD447";
const GREEN = "#54D98C";

const moveCode = `let xiaoming_key = String::from("电动车钥匙");
let zhangsan_key = xiaoming_key;`;
const borrowCode = `let xiaoming_key = String::from("电动车钥匙");
let zhangsan_key = &xiaoming_key;`;

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

  const heading = createRef<Txt>();
  const warning = createRef<Rect>();
  const xiaoming = createRef<Rect>();
  const zhangsan = createRef<Rect>();
  const data = createRef<Rect>();
  const leftOwner = createRef<Line>();
  const rightOwner = createRef<Line>();
  const leftScope = createRef<Rect>();
  const rightScope = createRef<Rect>();
  const releaseScope = createRef<Rect>();
  const doubleFree = createRef<Layout>();
  const compiler = createRef<Rect>();
  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const key = createRef<Layout>();
  const moved = createRef<Txt>();
  const explanation = createRef<Rect>();
  const explanationTitle = createRef<Txt>();
  const explanationBody = createRef<Txt>();
  const summary = createRef<Layout>();
  const forbidden = createRef<Layout>();
  const pageTransition = createRef<Rect>();
  const ampersand = createRef<Layout>();
  const codeLink = createRef<Line>();
  const codeTitle = createRef<Txt>();

  const leftReleaseCircle = createRef<Circle>();
  const rightReleaseCircle = createRef<Circle>();

  view.add(
    <>
      <Txt
        ref={heading}
        y={-700}
        text={"如果两个变量都拥有同一份数据……"}
        fill={TEXT}
        fontWeight={800}
        fontSize={52}
        opacity={0}
      />

      <Rect
        ref={warning}
        y={-600}
        width={720}
        height={82}
        radius={41}
        lineWidth={3}
        opacity={0}
      >
        <Txt
          text={"⚠  假设 Rust 允许多个 Owner"}
          fill={RED}
          fontWeight={800}
          fontSize={33}
        />
      </Rect>

      <Rect
        ref={xiaoming}
        x={-315}
        y={-260}
        width={390}
        height={145}
        radius={25}
        fill={"#172B45"}
        stroke={BLUE}
        lineWidth={4}
        opacity={0}
      >
        <Txt
          text={"xiaoming_key"}
          fill={BLUE}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={700}
          fontSize={38}
        />
      </Rect>

      <Rect
        ref={zhangsan}
        x={315}
        y={-260}
        width={390}
        height={145}
        radius={25}
        fill={"#3A1C29"}
        stroke={RED}
        lineWidth={4}
        opacity={0}
      >
        <Txt
          text={"zhangsan_key"}
          fill={RED}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={700}
          fontSize={38}
        />
      </Rect>

      <Line
        ref={leftOwner}
        points={[
          [-270, -175],
          [-100, 40],
        ]}
        stroke={YELLOW}
        lineWidth={9}
        endArrow
        arrowSize={23}
        end={0}
      />
      <Line
        ref={rightOwner}
        points={[
          [270, -175],
          [100, 40],
        ]}
        stroke={YELLOW}
        lineWidth={9}
        endArrow
        arrowSize={23}
        end={0}
      />

      {/* The single data object is never duplicated. */}
      <Rect
        ref={data}
        y={200}
        width={540}
        height={270}
        radius={32}
        fill={"#332E16"}
        stroke={YELLOW}
        lineWidth={5}
        shadowColor={"#FFD44733"}
        shadowBlur={30}
        opacity={0}
      >
        <Layout layout direction={"column"} alignItems={"center"} gap={18}>
          <Txt
            text={"String"}
            fill={YELLOW}
            fontFamily={"JetBrains Mono, monospace"}
            fontSize={34}
          />
          <Txt
            text={'"电动车钥匙"'}
            fill={TEXT}
            fontWeight={800}
            fontSize={43}
          />
          <Txt text={"唯一的数据对象"} fill={MUTED} fontSize={27} />
        </Layout>
      </Rect>
      <Txt
        ref={releaseScope}
        text={"已释放"}
        fill={TEXT}
        y={200}
        fontWeight={800}
        fontSize={100}
        opacity={0}
        scale={0}
      />

      <Rect
        ref={leftScope}
        x={-315}
        y={-390}
        width={245}
        height={62}
        radius={16}
        stroke={RED}
        lineWidth={3}
        opacity={0}
      >
        <Txt text={"离开作用域"} fill={TEXT} fontWeight={800} fontSize={27} />
      </Rect>
      <Rect
        ref={rightScope}
        x={315}
        y={-390}
        width={245}
        height={62}
        radius={16}
        stroke={RED}
        lineWidth={3}
        opacity={0}
      >
        <Txt text={"离开作用域"} fill={TEXT} fontWeight={800} fontSize={27} />
      </Rect>

      <Layout
        ref={doubleFree}
        layout
        direction={"column"}
        alignItems={"center"}
        y={480}
        gap={8}
        opacity={0}
        scale={0.7}
      >
        <Txt
          text={"双重释放"}
          fill={RED}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={900}
          fontSize={68}
        />
        <Txt
          text={"重复释放同一份资源"}
          fill={TEXT}
          fontWeight={700}
          fontSize={38}
        />
        <Txt
          text={"这是假设风险，不是 Rust 的运行时行为"}
          fill={MUTED}
          fontSize={26}
        />
      </Layout>

      <Layout key={"scene9_forbidden"} ref={forbidden} x={0} y={200} scale={0}>
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

      <Rect
        ref={compiler}
        y={-680}
        width={700}
        height={155}
        radius={38}
        fill={"#173659"}
        stroke={BLUE}
        lineWidth={5}
        opacity={0}
        scale={0.8}
      >
        <Layout layout alignItems={"center"} gap={28}>
          <Rect
            size={82}
            radius={22}
            fill={BLUE}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Txt text={"✓"} fill={BG} fontWeight={900} fontSize={52} />
          </Rect>
          <Layout layout direction={"column"} gap={7}>
            <Txt
              text={"Rust 编译器"}
              fill={TEXT}
              fontWeight={800}
              fontSize={39}
            />
            <Txt text={"编译阶段检查所有权"} fill={BLUE} fontSize={29} />
          </Layout>
        </Layout>
      </Rect>

      <Rect
        ref={codeCard}
        layout
        y={-380}
        width={940}
        height={265}
        radius={30}
        fill={PANEL}
        stroke={"#2A3552"}
        lineWidth={3}
        padding={38}
        opacity={0}
      >
        <Layout layout direction={"column"} gap={22} size={"100%"}>
          <Layout layout alignItems={"center"} gap={12}>
            <Circle size={14} fill={RED} />
            <Circle size={14} fill={"#FFC857"} />
            <Circle size={14} fill={GREEN} />
            <Txt
              ref={codeTitle}
              marginLeft={16}
              text={"main.rs · Move"}
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
            fontSize={31}
            lineHeight={68}
            fill={TEXT}
            selection={lines(0)}
          />
        </Layout>
      </Rect>

      {/* There is only one formal key during Move and Borrow. */}
      <Layout ref={key} x={-310} y={-135} scale={0} opacity={0}>
        <Rect
          x={-58}
          width={66}
          height={66}
          radius={33}
          stroke={YELLOW}
          lineWidth={16}
        />
        <Line
          points={[
            [-17, 0],
            [92, 0],
          ]}
          stroke={YELLOW}
          lineWidth={22}
          lineCap={"round"}
        />
        <Line
          points={[
            [27, 0],
            [27, 30],
          ]}
          stroke={YELLOW}
          lineWidth={15}
        />
        <Line
          points={[
            [65, 0],
            [65, 24],
          ]}
          stroke={YELLOW}
          lineWidth={15}
        />
      </Layout>
      <Txt
        ref={moved}
        x={-315}
        y={-60}
        text={"已失效"}
        fill={MUTED}
        fontFamily={"JetBrains Mono, monospace"}
        fontWeight={800}
        fontSize={60}
        opacity={0}
      />

      <Rect
        ref={explanation}
        y={620}
        width={900}
        height={180}
        radius={28}
        fill={PANEL}
        stroke={"#34405C"}
        lineWidth={3}
        opacity={0}
      >
        <Layout layout direction={"column"} alignItems={"center"} gap={10}>
          <Txt
            ref={explanationTitle}
            text={"所有权发生转移"}
            fill={YELLOW}
            fontWeight={800}
            fontSize={39}
          />
          <Txt
            ref={explanationBody}
            text={"新的变量负责释放资源 · 原变量失效"}
            fill={TEXT}
            fontSize={30}
          />
        </Layout>
      </Rect>

      <Layout
        key="summary_layout"
        ref={summary}
        layout
        direction={"column"}
        alignItems={"center"}
        y={0}
        gap={100}
        opacity={0}
      >
        <Txt
          text={"Ownership（所有权）"}
          fill={YELLOW}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={900}
          fontSize={65}
        />
        <Txt
          text={"决定：谁负责释放资源"}
          fill={TEXT}
          fontWeight={700}
          fontSize={40}
        />
        <Line
          points={[
            [-320, 0],
            [320, 0],
          ]}
          stroke={"#34405C"}
          lineWidth={3}
        />
        <Txt
          text={"Borrow（借用）"}
          fill={BLUE}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={900}
          fontSize={65}
        />
        <Txt
          text={"决定：谁可以临时访问资源"}
          fill={TEXT}
          fontWeight={700}
          fontSize={40}
        />
        <Rect
          layout
          marginTop={40}
          width={920}
          height={205}
          radius={30}
          fill={PANEL}
          stroke={BLUE}
          lineWidth={3}
          justifyContent={"center"}
        >
          <Layout
            layout
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={10}
          >
            <Txt
              text={"Rust 不禁止你使用数据"}
              fill={TEXT}
              fontWeight={800}
              fontSize={40}
            />
            <Txt
              text={"它只是要求你明确：数据到底归谁负责"}
              fill={MUTED}
              fontSize={31}
            />
          </Layout>
        </Rect>
      </Layout>

      <Rect
        ref={ampersand}
        x={-68}
        y={-175}
        size={70}
        radius={16}
        fill={BLUE}
        opacity={0}
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
        ref={codeLink}
        points={[
          [-68, -220],
          [-68, -310],
        ]}
        stroke={BLUE}
        lineWidth={8}
        endArrow
        arrowSize={22}
        end={0}
        lineDash={[20, 15]}
      />

      {/* 全屏擦除用于隐藏移动和借用之间的状态重置*/}
      <Rect
        ref={pageTransition}
        width={1080}
        height={1920}
        fill={BG}
        lineWidth={8}
        opacity={0}
      >
        <Layout layout direction={"column"} alignItems={"center"} gap={22}>
          <Txt text={"情况二"} fill={MUTED} fontWeight={700} fontSize={34} />
          <Txt
            text={"Borrow"}
            fill={BLUE}
            fontFamily={"JetBrains Mono, monospace"}
            fontWeight={900}
            fontSize={92}
          />
          <Txt
            text={"临时访问，不转移所有权"}
            fill={TEXT}
            fontWeight={800}
            fontSize={43}
          />
          <Line
            points={[
              [-250, 0],
              [250, 0],
            ]}
            stroke={BLUE}
            lineWidth={7}
            lineCap={"round"}
          />
        </Layout>
      </Rect>

      <Circle
        ref={leftReleaseCircle}
        size={40}
        fill={BLUE}
        position={[-270, -180]}
        opacity={0}
      ></Circle>

      <Circle
        ref={rightReleaseCircle}
        size={40}
        fill={RED}
        position={[270, -180]}
        opacity={0}
      ></Circle>
    </>,
  );

  yield* all(
    heading().opacity(1, 0.4),
    warning().opacity(1, 0.4),
    xiaoming().opacity(1, 0.4),
    zhangsan().opacity(1, 0.4),
    data().opacity(1, 0.4),
  );

  yield* waitUntil("scene9_multiple_owners");
  yield* all(leftOwner().end(1, 0.55), rightOwner().end(1, 0.55));

  yield* waitUntil("scene9_first_scope_exit");
  // 第二阶段
  yield* all(leftScope().opacity(1, 0.25), leftReleaseCircle().opacity(1, 0.2));
  yield* waitUntil("scene9_first_show_circle_exit");
  yield* leftReleaseCircle().position([-85, 65], 0.5);
  yield* waitUntil("scene9_first_show_circle_moved_exit");
  yield* all(
    xiaoming().opacity(0.18, 0.4),
    leftOwner().opacity(0.15, 0.4),
    data().opacity(0.18, 0.55),
    leftReleaseCircle().opacity(0, 0.2),
  );

  yield* all(
    releaseScope().opacity(0.7, 0.3),
    releaseScope().scale(1, 0.3, easeOutBack),
  );

  yield* waitUntil("scene9_second_scope_exit");
  yield* all(
    rightScope().opacity(1, 0.25),
    rightReleaseCircle().opacity(1, 0.2),
  );
  yield* waitUntil("scene9_second_show_circle_exit");
  yield* rightReleaseCircle().position([85, 65], 0.5);
  yield* waitUntil("scene9_second_show_circle_moved_exit");

  yield* all(
    releaseScope().opacity(0, 0.3),
    releaseScope().scale(0, 0.3, easeOutBack),
    zhangsan().opacity(0.18, 0.35),
    rightOwner().opacity(0.15, 0.35),
    doubleFree().opacity(1, 0.25),
    doubleFree().scale(1, 0.45, easeOutBack),
    forbidden().opacity(1, 0.3),
    forbidden().scale(1, 0.3, easeOutBack),
    rightReleaseCircle().opacity(0, 0.2),
  );

  yield* waitUntil("scene9_compiler_rewind");
  yield* all(
    heading().opacity(0, 0.3),
    warning().opacity(0, 0.3),
    xiaoming().opacity(0, 0.3),
    zhangsan().opacity(0, 0.3),
    data().opacity(0, 0.3),
    leftOwner().opacity(0, 0.3),
    rightOwner().opacity(0, 0.3),
    leftScope().opacity(0, 0.3),
    rightScope().opacity(0, 0.3),
    doubleFree().opacity(0, 0.3),
    forbidden().opacity(0, 0.3),
  );
  yield* all(
    compiler().opacity(1, 0.35),
    compiler().scale(1, 0.5, easeOutBack),
    codeCard().opacity(1, 0.4),
  );

  yield* waitUntil("scene9_move");
  xiaoming().position([-315, -60]);
  zhangsan().position([315, -60]);
  data().position([0, 350]);
  leftOwner().points([
    [-360, 40],
    [-150, 180],
  ]);
  rightOwner().points([
    [300, 40],
    [115, 180],
  ]);
  rightOwner().stroke(YELLOW).opacity(1).end(0);
  yield* all(
    xiaoming().opacity(1, 0.3),
    zhangsan().opacity(1, 0.3),
    data().opacity(1, 0.3),
    key().opacity(1, 0.2),
    key().scale(0.65, 0.45, easeOutBack),
    leftOwner().end(1).stroke(YELLOW).opacity(1, 0.3),
  );
  yield* waitUntil("scene9_key_move");
  yield* code().selection(lines(1), 0.35);
  yield* all(leftOwner().end(0, 0.45), key().x(310, 0.6, easeInOutCubic));
  yield* all(
    rightOwner().end(1, 0.5),
    xiaoming().opacity(0.35, 0.4),
    moved().opacity(1, 0.3, easeOutBack),
    explanation().opacity(1, 0.4),
  );

  yield* waitUntil("scene9_borrow");
  // 情况二：借用
  // 转场刷入并完全遮住旧画面。
  yield* pageTransition().opacity(1, 0.2);
  yield* waitUntil("scene9_page_wait");

  // 在遮罩后重置 Move 状态，观众不会看到元素瞬间复位。
  key().x(-310);
  leftOwner().stroke(YELLOW).end(1);
  rightOwner().stroke(BLUE).lineDash([18, 14]).end(0);
  xiaoming().opacity(1);
  moved().opacity(0);
  yield* all(
    code().selection(lines(0), 0.35),
    explanation().opacity(0, 0.3),
    codeTitle().text("main.rs · Borrow", 0.3),
  );
  yield* pageTransition().opacity(0, 0.2);
  yield* waitUntil("scene9_page_wait_finsh");

  explanationTitle().text("Borrow · 临时访问");
  explanationTitle().fill(BLUE);
  explanationBody().text("不负责释放资源 · Owner 保持不变");

  yield* all(
    code().selection(lines(1), 0.35),
    code().code(borrowCode, 0.5),
    rightOwner().end(1, 0.65),
  );
  yield* all(
    explanation().opacity(1, 0.4),
    codeLink().end(1, 0.4),
    ampersand().opacity(1, 0.4),
  );

  yield* waitUntil("scene9_summary");
  yield* all(
    compiler().opacity(0, 0.3),
    codeCard().opacity(0, 0.3),
    xiaoming().opacity(0, 0.3),
    zhangsan().opacity(0, 0.3),
    data().opacity(0, 0.3),
    key().opacity(0, 0.3),
    leftOwner().opacity(0, 0.3),
    rightOwner().opacity(0, 0.3),
    explanation().opacity(0, 0.3),
    ampersand().opacity(0, 0.3),
    codeLink().opacity(0, 0.3),
  );
  // 第三阶段
  yield* summary().opacity(1, 0.45);

  yield* waitUntil("scene9_end");
});
