import {
  Code,
  Img,
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
  waitUntil,
} from "@motion-canvas/core";
import FerrisEditorPng from "../../../../images/FerrisEditor.png";
import FerrisReaderPng from "../../../../images/FerrisReader.png";
import { CodeRect } from "../../../components/CodeRect";
import { DataRect2 } from "../../../components/DataRect2";
import { DottedLine } from "../../../components/DottedLine";
import { COLORS } from "../../../constants";

const SOURCE = `let mut text = String::from("hello");

let reader = &text; // 只读
println!("{}", reader);

let editor = &mut text;
editor.push_str(" rust"); // 追加字符串`;

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const title = createRef<Layout>();
  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const diagram = createRef<Layout>();
  const dataBox = createRef<Rect>();
  const dataValue = createRef<Txt>();
  const readerBox = createRef<Rect>();
  const readerLink = createRef<Line>();
  const readerLabel = createRef<Txt>();
  const editorBox = createRef<Rect>();
  const editorLink = createRef<Line>();
  const editorLabel = createRef<Rect>();
  const finalRule = createRef<Layout>();
  const referenceCategory = createRef<Layout>();

  view.add(
    <>
      <Layout
        ref={title}
        layout
        direction={"column"}
        alignItems={"center"}
        y={-650}
        gap={12}
        opacity={0}
      >
        <Txt
          text={"引用不会取得所有权"}
          fill={COLORS.text}
          fontWeight={800}
          fontSize={60}
        />
        <Txt
          text={"BORROW, DON’T TAKE"}
          fill={COLORS.blue}
          fontFamily={"JetBrains Mono, monospace"}
          fontSize={24}
          letterSpacing={5}
        />
      </Layout>

      <CodeRect
        rectRef={codeCard}
        width={960}
        height={580}
        y={-455}
        opacity={0}
        code={SOURCE}
        codeRef={code}
        filename={"references.rs"}
        selection={lines(0, 6)}
      />

      <Layout ref={referenceCategory} y={280} opacity={0}>
        <DataRect2
          ref={readerBox}
          width={400}
          height={145}
          radius={24}
          fill={"#172B45"}
          stroke={COLORS.blue}
          lineWidth={4}
          label={["&T = 不可变引用", 34, COLORS.blue]}
          opacity={1}
        />
        <DataRect2
          ref={editorBox}
          y={200}
          width={400}
          height={145}
          radius={24}
          fill={"#351B29"}
          stroke={COLORS.red}
          lineWidth={4}
          label={["&mut T = 可变引用", 34, COLORS.red]}
          opacity={1}
        />

        <Txt
          ref={readerLabel}
          text={"引用分为两种："}
          fill={COLORS.text}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={800}
          fontSize={40}
          opacity={1}
          y={-160}
          scale={1}
        />
      </Layout>

      <Layout ref={diagram} y={280} opacity={0}>
        <Rect
          ref={dataBox}
          x={285}
          width={370}
          height={180}
          radius={28}
          fill={"#17362D"}
          stroke={COLORS.green}
          lineWidth={4}
          shadowColor={"#54D98C33"}
          shadowBlur={28}
        >
          <Layout layout direction={"column"} alignItems={"center"} gap={14}>
            <Txt
              text={"text"}
              fill={COLORS.muted}
              fontFamily={"JetBrains Mono, monospace"}
              fontSize={27}
            />
            <Txt
              ref={dataValue}
              text={'"hello"'}
              fill={COLORS.green}
              fontFamily={"JetBrains Mono, monospace"}
              fontWeight={800}
              fontSize={43}
            />
          </Layout>
        </Rect>

        <DataRect2
          ref={readerBox}
          x={-300}
          width={330}
          height={145}
          radius={24}
          fill={"#172B45"}
          stroke={COLORS.blue}
          lineWidth={4}
          label={["reader  &T", 34, COLORS.blue]}
          opacity={0}
        />
        <DottedLine
          ref={readerLink}
          points={[
            [-120, 0],
            [80, 0],
          ]}
          stroke={COLORS.blue}
        />

        <DataRect2
          ref={editorBox}
          x={-300}
          width={330}
          height={145}
          radius={24}
          fill={"#351B29"}
          stroke={COLORS.red}
          lineWidth={4}
          label={["editor  &mut T", 31, COLORS.red]}
          opacity={0}
        />
        <DottedLine
          ref={editorLink}
          points={[
            [-120, 0],
            [80, 0],
          ]}
          stroke={COLORS.red}
        />

        <Txt
          ref={readerLabel}
          text={"&T  →  不可变引用（只能用于读取）"}
          fill={COLORS.blue}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={800}
          fontSize={40}
          opacity={0}
          y={-160}
          x={-30}
          scale={0}
        />
        <Txt
          ref={editorLabel}
          text={"&mut T  →  可变引用（读取 + 修改）"}
          fill={COLORS.red}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={800}
          fontSize={40}
          opacity={0}
          y={-160}
          x={-30}
          scale={0}
        />
      </Layout>

      <Layout
        ref={finalRule}
        layout
        direction={"row"}
        alignItems={"center"}
        gap={50}
        x={-20}
        y={350}
        scale={0.3}
        opacity={0}
      >
        <Layout
          layout
          direction={"column"}
          alignItems={"center"}
          gap={0}
          width={400}
        >
          <Img src={FerrisReaderPng} scale={0.5}></Img>
          <Layout layout={false}>
            <Txt
              text={"不可变引 = 是读者"}
              fill={COLORS.text}
              fontWeight={800}
              fontSize={36}
              y={175}
            />
          </Layout>
        </Layout>
        <Layout
          layout
          direction={"column"}
          alignItems={"center"}
          gap={0}
          width={500}
        >
          <Img src={FerrisEditorPng} scale={0.5}></Img>
          <Layout layout={false}>
            <Txt
              text={"可变引用 = 编辑者"}
              fill={COLORS.text}
              fontWeight={800}
              fontSize={36}
              y={175}
            />
          </Layout>
        </Layout>
      </Layout>
    </>,
  );

  codeCard().y(-0);
  yield* all(
    title().opacity(1, 0.4),
    codeCard().opacity(1, 0.45),
    codeCard().y(-250, 0.75, easeOutBack),
  );

  yield* waitUntil("scene1_show_reference_category");
  yield* referenceCategory().opacity(1, 0.3);

  yield* waitUntil("scene1_reference_intro");
  yield* all(
    referenceCategory().opacity(0, 0.3),
    code().selection(lines(0), 0.35),
    diagram().opacity(1, 0.4),
    dataBox().scale(1.06, 0.3).to(1, 0.25),
  );

  // 不可变引用
  yield* waitUntil("scene1_immutable_reference");
  yield* all(
    code().selection(lines(2), 0.4),
    readerBox().opacity(1, 0.3),
    readerBox().x(-300, 0.45, easeOutBack),
    readerLink().end(1, 0.55, easeInOutCubic),
    readerLabel().opacity(1, 0.3),
    readerLabel().scale(1, 0.45, easeOutBack),
  );

  // 不可变引用打印
  yield* waitUntil("scene1_immutable_reference_println");
  yield* all(code().selection(lines(3), 0.4));

  yield* waitUntil("scene1_mutable_reference");
  yield* all(
    readerBox().opacity(0, 0.3),
    readerLink().opacity(0, 0.3),
    readerLabel().opacity(0, 0.3),
  );
  yield* all(
    code().selection(lines(5), 0.4),
    editorBox().opacity(1, 0.3),
    editorLink().end(1, 0.55, easeInOutCubic),
    editorLabel().opacity(1, 0.3),
    editorLabel().scale(1, 0.45, easeOutBack),
  );

  yield* waitUntil("scene1_mutable_reference_push");
  yield* all(
    code().selection(lines(6), 0.4),
    dataValue().text('"hello rust"', 0.45),
    dataBox().scale(1.07, 0.25).to(1, 0.25),
  );

  yield* waitUntil("scene1_reader_editor");
  yield* all(diagram().opacity(0, 0.3));
  yield* all(
    code().selection(lines(0, 6), 0.35),
    finalRule().opacity(1, 0.35),
    finalRule().scale(1, 0.5, easeOutBack),
  );

  yield* waitUntil("scene1_end");
});
