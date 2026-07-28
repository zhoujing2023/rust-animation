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
  easeOutBack,
  waitUntil
} from "@motion-canvas/core";
import { CodeRect } from "../../../components/CodeRect";
import { DataRect2 } from "../../../components/DataRect2";
import { DottedLine } from "../../../components/DottedLine";
import { SolidLine } from "../../../components/SolidLine";
import { COLORS } from "../../../constants";

const SOURCE = `let document = String::from("hello");

let reader_1 = &document;
let reader_2 = &document;
let reader_3 = &document;

println!("{reader_1},{reader_2},{reader_3}");`;

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const title = createRef<Txt>();
  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const diagram = createRef<Layout>();
  const documentBox = createRef<Rect>();
  const unchanged = createRef<Rect>();
  const rule = createRef<Rect>();

  const documentValueBox = createRef<Rect>();
  const readerBox1 = createRef<Rect>();
  const readerBox2 = createRef<Rect>();
  const readerBox3 = createRef<Rect>();

  const ownerLink = createRef<Line>();
  const reader1Link = createRef<Line>();
  const reader2Link = createRef<Line>();
  const reader3Link = createRef<Line>();

  const readerY = [-160, 20, 200];

  view.add(
    <Layout y={-100}>
      <Txt
        ref={title}
        y={-650}
        text={"为什么可以有多个不可变引用？"}
        fill={COLORS.text}
        fontWeight={800}
        fontSize={51}
        opacity={0}
      />

      <CodeRect
        rectRef={codeCard}
        codeRef={code}
        code={SOURCE}
        filename={"shared_reading.rs"}
        selection={lines(0, 6)}
        width={960}
        height={560}
        y={-430}
        opacity={0}
      />

      <Layout ref={diagram} y={320} opacity={0}>
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
          ref={readerBox1}
          x={-345}
          y={20}
          width={270}
          height={120}
          radius={22}
          fill={"#172B45"}
          stroke={COLORS.blue}
          lineWidth={4}
          label={["reader_1", 29, COLORS.blue]}
          opacity={0}
        />

        <DataRect2
          ref={readerBox2}
          x={-345}
          y={160}
          width={270}
          height={120}
          radius={22}
          fill={"#172B45"}
          stroke={COLORS.blue}
          lineWidth={4}
          label={["reader_2", 29, COLORS.blue]}
          opacity={0}
        />

        <DataRect2
          ref={readerBox3}
          x={-345}
          y={300}
          width={270}
          height={120}
          radius={22}
          fill={"#172B45"}
          stroke={COLORS.blue}
          lineWidth={4}
          label={["reader_3", 29, COLORS.blue]}
          opacity={0}
        />

        <Rect
          ref={documentValueBox}
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
              text={'"hello"'}
              fill={COLORS.green}
              fontWeight={800}
              fontSize={42}
            />
          </Layout>
        </Rect>
      </Layout>

      <SolidLine
        ref={ownerLink}
        points={[
          [-190, 200],
          [130, 280],
        ]}
        stroke={COLORS.yellow}
        end={0}
      />
      <DottedLine
        ref={reader1Link}
        points={[
          [-190, 340],
          [130, 330],
        ]}
        stroke={COLORS.blue}
        end={0}
      />
      <DottedLine
        ref={reader2Link}
        points={[
          [-190, 480],
          [130, 380],
        ]}
        stroke={COLORS.blue}
        end={0}
      />
      <DottedLine
        ref={reader3Link}
        points={[
          [-190, 620],
          [160, 420],
        ]}
        stroke={COLORS.blue}
        end={0}
      />

      <Rect
        ref={unchanged}
        y={60}
        width={530}
        height={90}
        radius={24}
        fill={"#172B45"}
        stroke={COLORS.blue}
        lineWidth={3}
        opacity={0}
        scale={0.9}
      >
        <Txt
          text={'数据始终是 "hello"'}
          fill={COLORS.blue}
          fontWeight={800}
          fontSize={34}
        />
      </Rect>

      <Rect
        ref={rule}
        y={790}
        width={940}
        height={130}
        radius={28}
        fill={COLORS.panel}
        stroke={COLORS.green}
        lineWidth={3}
        opacity={0}
        scale={0.94}
      >
        <Txt
          text={"多个 &T = 多个读者 = 安全共享"}
          fill={COLORS.text}
          fontFamily={"JetBrains Mono, monospace"}
          fontWeight={800}
          fontSize={36}
        />
      </Rect>
    </Layout>,
  );

  codeCard().y(200);
  yield* all(
    title().opacity(1, 0.4),
    codeCard().opacity(1, 0.4),
    codeCard().y(-290, 0.7, easeOutBack),
  );

  yield* waitUntil("scene3_first_reader");
  yield* all(
    diagram().opacity(1, 0.4),
    code().selection(lines(0), 0.4),
    ownerLink().end(1, 0.4),
  );

  yield* waitUntil("scene3_more_readers");
  yield* all(
    code().selection(lines(2, 4), 0.5),
    readerBox1().opacity(1, 0.5),
    readerBox2().opacity(1, 0.5),
    readerBox3().opacity(1, 0.5),
    reader1Link().end(1, 0.6),
    reader2Link().end(1, 0.6),
    reader3Link().end(1, 0.6),
  );

  yield* waitUntil("scene3_data_unchanged");
  yield* all(
    code().selection(lines(6), 0.4),
    documentBox().scale(1.08, 0.3).to(1, 0.25),
    unchanged().opacity(1, 0.3),
    unchanged().scale(1, 0.45, easeOutBack),
  );

  yield* waitUntil("scene3_shared_reading");
  yield* all(
    rule().opacity(1, 0.35),
    rule().scale(1, 0.5, easeOutBack),
    code().selection(lines(0, 6), 0.3),
  );

  yield* waitUntil("scene3_end");
});
