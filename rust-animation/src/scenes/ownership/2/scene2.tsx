import {
  Code,
  CodeRange,
  Layout,
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
  easeInOutCubic,
  easeOutBack,
  waitUntil
} from "@motion-canvas/core";
import { CodeRect } from "../../../components/CodeRect";
import { DataRect2 } from "../../../components/DataRect2";
import { DottedLine } from "../../../components/DottedLine";
import { ErrorLayout } from "../../../components/ErrorLayout";
import { ErrorMsgRect } from "../../../components/ErrorMsgRect";
import { SolidLine } from "../../../components/SolidLine";
import { UnderLine } from "../../../components/UnderLine";
import { COLORS } from "../../../constants";

const SOURCE = `let mut document = String::from("版本 A");

let reader = &document;
let editor = &mut document; // Error

println!("{}", reader); // 数据不会发生变化`;

const SOURCE2 = `let mut document = String::from("版本 A");

let reader = &document;
let editor = &mut document; // Error
*editor = String::from("版本B");

println!("{}", reader);`;

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const title = createRef<Txt>();
  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const underline = createRef<Line>();
  const error = createRef<Rect>();

  const diagram = createRef<Layout>();
  const documentBox = createRef<Rect>();
  const versionBox = createRef<Rect>();
  const versionValue = createRef<Txt>();
  const readerBox = createRef<Rect>();
  const editorBox = createRef<Rect>();
  const ownerLink = createRef<Line>();
  const readerLink = createRef<Line>();
  const editorLink = createRef<Line>();
  const promise = createRef<Rect>();
  const collision = createRef<Rect>();
  const rule = createRef<Rect>();

  view.add(
    <Layout y={-100}>
      <Txt
        ref={title}
        y={-650}
        text={"为什么读和写不能同时存在？"}
        fill={COLORS.text}
        fontWeight={800}
        fontSize={54}
        opacity={0}
      />

      <CodeRect
        rectRef={codeCard}
        width={960}
        height={590}
        y={-515}
        opacity={0}
        code={SOURCE}
        codeRef={code}
        filename={"borrow_conflict.rs"}
        selection={lines(0, 5)}
      />

      <UnderLine ref={underline} x={90} y={-200} length={11} />

      <ErrorMsgRect
        ref={error}
        y={-75}
        height={180}
        errContent={
          "cannot borrow `document` as mutable\nbecause it is also borrowed as immutable"
        }
      />

      <Rect
        ref={promise}
        y={105}
        width={900}
        height={100}
        radius={24}
        fill={"#172B45"}
        stroke={COLORS.blue}
        lineWidth={3}
        opacity={0}
        scale={0.94}
      >
        <Txt
          text={"reader 有效期间，数据保持稳定"}
          fill={COLORS.blue}
          fontWeight={800}
          fontSize={34}
        />
      </Rect>

      <Layout ref={diagram} y={355} opacity={0}>
        <DataRect2
          ref={documentBox}
          x={-345}
          y={-120}
          width={270}
          height={120}
          radius={22}
          fill={"#302B16"}
          stroke={COLORS.yellow}
          lineWidth={4}
          label={["document", 31, COLORS.yellow]}
          opacity={1}
        />
        <DataRect2
          ref={readerBox}
          x={-345}
          y={70}
          width={270}
          height={120}
          radius={22}
          fill={"#172B45"}
          stroke={COLORS.blue}
          lineWidth={4}
          label={["reader  &T", 29, COLORS.blue]}
          opacity={0}
        />
        <DataRect2
          ref={editorBox}
          x={-345}
          y={250}
          width={300}
          height={120}
          radius={22}
          fill={"#351B29"}
          stroke={COLORS.red}
          lineWidth={4}
          label={["editor  &mut T", 27, COLORS.red]}
          opacity={0}
        />

        <Rect
          ref={versionBox}
          x={300}
          y={0}
          width={310}
          height={155}
          radius={26}
          fill={"#17362D"}
          stroke={COLORS.green}
          lineWidth={4}
        >
          <Layout layout direction={"column"} alignItems={"center"} gap={12}>
            <Txt text={"document 数据"} fill={COLORS.muted} fontSize={25} />
            <Txt
              ref={versionValue}
              text={"版本 A"}
              fill={COLORS.green}
              fontWeight={800}
              fontSize={42}
            />
          </Layout>
        </Rect>

        <SolidLine
          ref={ownerLink}
          points={[
            [-205, -120],
            [125, -20],
          ]}
          stroke={COLORS.yellow}
        />
        <DottedLine
          ref={readerLink}
          points={[
            [-205, 70],
            [125, 30],
          ]}
          stroke={COLORS.blue}
        />
        <DottedLine
          ref={editorLink}
          points={[
            [-190, 250],
            [210, 40],
          ]}
          stroke={COLORS.red}
        />

        <ErrorLayout
          ref={collision}
          size={90}
          opacity={0}
          scale={0}
          fontSize={115}
          x={-30}
          y={160}
        ></ErrorLayout>
      </Layout>

      <Rect
        ref={rule}
        y={780}
        width={920}
        height={135}
        radius={28}
        fill={COLORS.panel}
        stroke={COLORS.red}
        lineWidth={3}
        opacity={0}
        scale={0.94}
      >
        <Txt
          text={"共享读取期间，不能独占修改"}
          fill={COLORS.text}
          fontWeight={800}
          fontSize={39}
        />
      </Rect>
    </Layout>,
  );

  codeCard().y(200);
  yield* all(
    title().opacity(1, 0.4),
    codeCard().opacity(1, 0.45),
    codeCard().y(-260, 0.75, easeOutBack),
  );

  yield* waitUntil("scene2_ownership_created");
  yield* all(
    diagram().opacity(1, 0.45),
    ownerLink().end(1, 0.55),
    code().selection(lines(0), 0.4),
  );

  yield* waitUntil("scene2_reader_created");
  yield* all(
    code().selection(lines(2), 0.35),
    readerBox().opacity(1, 0.3),
    readerLink().end(1, 0.55, easeInOutCubic),
  );

  yield* waitUntil("scene2_borrow_efficient");
  const borrowEfficientScope: CodeRange[] = [lines(2, 2), lines(5, 5)];
  yield* code().selection(borrowEfficientScope, 0.5);

  yield* waitUntil("scene2_stability_promise");
  yield* all(
    promise().opacity(1, 0.35),
    promise().scale(1, 0.5, easeOutBack),
    versionBox().shadowColor("#54D98C55", 0.35),
    versionBox().shadowBlur(35, 0.35),
  );

  yield* waitUntil("scene2_editor_attempt");
  yield* all(
    code().selection(lines(3), 0.35),
    editorBox().opacity(1, 0.3),
    editorLink().end(0.78, 0.55, easeInOutCubic),
  );
  yield* code().code(SOURCE2, 0.3);

  yield* waitUntil("scene2_editor_borrow_update_befor");
  yield* all(
    code().selection(lines(4), 0.35),
    versionValue().text("版本 B", 0.28),
    versionBox().stroke(COLORS.red, 0.28),
  );
  yield* waitUntil("scene2_editor_borrow_updated_after");
  yield* all(
    collision().opacity(1, 0.2),
    collision().scale(1, 0.4, easeOutBack),
    code().selection(lines(3), 0.35),
  );
  underline().opacity(1);
  yield* chain(
    underline().end(1, 0.4),
    error().opacity(1, 0.25),
    error().scale(1, 0.4, easeOutBack),
  );
  yield* all(
    rule().opacity(1, 0.35),
    rule().scale(1, 0.4, easeOutBack),
    chain(
      codeCard().x(-14, 0.07),
      codeCard().x(14, 0.07),
      codeCard().x(-10, 0.07),
      codeCard().x(10, 0.07),
      codeCard().x(0, 0.07),
    ),
  );

  yield* waitUntil("scene2_end");
});
