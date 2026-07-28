import {
  Code,
  Layout,
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
  waitFor,
  waitUntil
} from "@motion-canvas/core";
import { CodeRect } from "../../../components/CodeRect";
import { DataRect2 } from "../../../components/DataRect2";
import { DottedLine } from "../../../components/DottedLine";
import { ErrorMsgRect } from "../../../components/ErrorMsgRect";
import { ForbiddenLayout } from "../../../components/ForbiddenLayout";
import { UnderLine } from "../../../components/UnderLine";
import { COLORS } from "../../../constants";

const SOURCE = `let mut score = 10;

let editor_1 = &mut score;
let editor_2 = &mut score; // Error

*editor_1 += 1;`;

const SOURCE2 = `let mut score = 10;

let editor_1 = &mut score;

*editor_1 += 1;`;

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const title = createRef<Txt>();
  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const underline = createRef<Line>();
  const diagram = createRef<Layout>();
  const scoreBox = createRef<Rect>();
  const scoreValue = createRef<Txt>();
  const editor1 = createRef<Rect>();
  const editor2 = createRef<Rect>();
  const link1 = createRef<Line>();
  const link2 = createRef<Line>();
  const exclusiveRightTag = createRef<Txt>();
  const rejected = createRef<Txt>();
  const exclusive = createRef<Rect>();
  const rule = createRef<Rect>();
  const errorMsgRect = createRef<Rect>();
  const strikethrough = createRef<Line>();

  view.add(
    <>
      <Txt
        ref={title}
        y={-760}
        text={"为什么只能有一个可变引用？"}
        fill={COLORS.text}
        fontWeight={800}
        fontSize={53}
        opacity={0}
      />

      <CodeRect
        rectRef={codeCard}
        codeRef={code}
        code={SOURCE}
        filename={"exclusive_edit.rs"}
        selection={lines(0, 5)}
        width={960}
        height={560}
        y={-455}
        opacity={0}
      />
      <UnderLine ref={underline} x={130} y={-330} length={9} />

      <Layout ref={diagram} y={210} opacity={0}>
        <DataRect2
          ref={editor1}
          x={-335}
          y={-125}
          width={310}
          height={125}
          radius={22}
          fill={"#351B29"}
          stroke={COLORS.red}
          lineWidth={4}
          label={["editor_1", 34, COLORS.red]}
          opacity={0}
        />
        <DataRect2
          ref={editor2}
          x={-335}
          y={170}
          width={310}
          height={125}
          radius={22}
          fill={"#351B29"}
          stroke={COLORS.red}
          lineWidth={4}
          label={["editor_2", 34, COLORS.red]}
          opacity={0}
        />

        <Rect
          ref={scoreBox}
          x={285}
          width={330}
          height={175}
          radius={28}
          fill={"#302B16"}
          stroke={COLORS.yellow}
          lineWidth={4}
          shadowColor={"#FFD44733"}
          shadowBlur={25}
        >
          <Layout layout direction={"column"} alignItems={"center"} gap={12}>
            <Txt
              text={"score"}
              fill={COLORS.muted}
              fontFamily={"JetBrains Mono, monospace"}
              fontSize={27}
            />
            <Txt
              ref={scoreValue}
              text={"10"}
              fill={COLORS.yellow}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={800}
              fontSize={50}
            />
          </Layout>
        </Rect>

        <DottedLine
          ref={link1}
          points={[
            [-175, -125],
            [105, -35],
          ]}
          stroke={COLORS.red}
        />
        <DottedLine
          ref={link2}
          points={[
            [-175, 170],
            [130, 50],
          ]}
          stroke={COLORS.red}
        />

        <Txt
          ref={exclusiveRightTag}
          x={-20}
          y={-150}
          text={"独占权"}
          fill={COLORS.red}
          fontWeight={600}
          fontFamily={"JetBrains Mono, monospace"}
          opacity={0}
          scale={0.5}
        />

        <ForbiddenLayout
          ref={rejected}
          size={130}
          label="禁止"
          labelSize={60}
          x={100}
          y={60}
        />
      </Layout>

      <Rect
        ref={exclusive}
        y={-50}
        width={720}
        height={92}
        radius={24}
        fill={"#351B29"}
        stroke={COLORS.red}
        lineWidth={3}
        opacity={0}
        scale={0.94}
      >
        <Txt
          text={"只能存在一个有效的可变引用"}
          fill={COLORS.red}
          fontWeight={800}
          fontSize={32}
        />
      </Rect>

      <Rect
        ref={rule}
        y={580}
        width={940}
        height={130}
        radius={28}
        fill={COLORS.panel}
        stroke={COLORS.red}
        lineWidth={3}
        opacity={0}
        scale={0.94}
      >
        <Txt
          text={"一个 &mut T = 一个编辑者 = 独占修改"}
          fill={COLORS.text}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={800}
          fontSize={34}
        />
      </Rect>

      <ErrorMsgRect
        ref={errorMsgRect}
        errContent={
          "cannot borrow `score` as mutable more than \nonce at a time"
        }
        y={-220}
      />

      <Line
        ref={strikethrough}
        lineWidth={3}
        stroke={COLORS.text}
        points={[
          [0, 0],
          [520, 0],
        ]}
        x={-440}
        y={-363}
        end={0}
      />
    </>,
  );

  codeCard().y(120);
  yield* all(
    title().opacity(1, 0.4),
    codeCard().opacity(1, 0.4),
    codeCard().y(-400, 0.7, easeOutBack),
  );

  yield* waitUntil("scene4_first_editor");
  yield* all(
    diagram().opacity(1, 0.4),
    code().selection(lines(0, 2), 0.4),
    editor1().opacity(1, 0.3),
  );

  yield* waitUntil("scene4_editor_link");
  yield* all(link1().end(1, 0.55, easeInOutCubic));
  yield* waitFor(0.5);
  yield* all(
    exclusiveRightTag().opacity(1, 0.25),
    exclusiveRightTag().scale(1, 0.45, easeOutBack),
  );

  yield* waitFor(0.5);
  yield* exclusiveRightTag().text("🔒独占权", 0.3, easeOutBack);

  yield* waitUntil("scene4_second_editor");
  yield* all(
    code().selection(lines(3), 0.35),
    editor2().opacity(1, 0.3),
    link2().end(0.65, 0.45, easeInOutCubic),
  );

  yield* waitUntil("scene4_rejecte_show");
  yield* all(
    rejected().opacity(1, 0.25),
    rejected().scale(0.8, 0.4, easeOutBack),
  );

  underline().opacity(1);
  yield* all(underline().end(1, 0.35));
  yield* errorMsgRect().opacity(1, 0.3);

  yield* waitUntil("scene4_exclusive_access");
  yield* all(
    exclusive().opacity(1, 0.3),
    exclusive().scale(1, 0.45, easeOutBack),
    rule().opacity(1, 0.35),
    rule().scale(1, 0.5, easeOutBack),
  );

  yield* waitUntil("scene4_hide_err_info");
  yield* all(
    errorMsgRect().opacity(0, 0.3),
    editor2().opacity(0, 0.3),
    link2().end(0, 0.3),
    link2().opacity(0.2, 0.3),
    rejected().scale(0, 0.3),
    underline().end(0, 0.3),
    underline().opacity(0.2, 0.3),
  );
  yield* strikethrough().end(1, 0.5);

  yield* waitUntil("scene4_remove_editer2_code");
  yield* all(
    code().code(SOURCE2, 0.3),
    code().selection(lines(2), 0.3),
    strikethrough().opacity(0, 0.2),
  );

  yield* waitUntil("scene4_edit_success");
  yield* all(
    code().selection(lines(4), 0.4),
    scoreValue().text("11", 0.4),
    scoreValue().fill(COLORS.green, 0.35),
    scoreBox().stroke(COLORS.green, 0.35),
    scoreBox().scale(1.08, 0.3).to(1, 0.25),
  );

  yield* waitUntil("scene4_end");
});
