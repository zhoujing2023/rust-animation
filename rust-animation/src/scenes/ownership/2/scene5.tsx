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
  chain,
  createRef,
  easeOutBack,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { CodeRect } from "../../../components/CodeRect";
import { ErrorMsgRect } from "../../../components/ErrorMsgRect";
import { SuccessLayout } from "../../../components/SuccessLayout";
import { COLORS } from "../../../constants";
import { RustCode } from "../../../components/RustCode";
import { UnderLine } from "../../../components/UnderLine";
import { ErrorLayout } from "../../../components/ErrorLayout";
import { SolidLine } from "../../../components/SolidLine";

const SOURCE = `let mut text = String::from("hello");

let reader = &text;
println!("{}", reader); // reader 最后一次使用

let editor = &mut text;
editor.push_str(" rust");
println!("{}", editor);`;

const SOURCE2 = `let mut text = String::from("hello");

let reader = &text;


let editor = &mut text;
editor.push_str(" rust");
println!("{}", editor);`;

const READER_PRINT_CODE = `println!("{}", reader);`;

export default makeScene2D(function* (view) {
  view.fill(COLORS.bg);

  const titleLayout = createRef<Layout>();
  const title = createRef<Txt>();
  const subtitle = createRef<Txt>();
  const codeCard = createRef<Rect>();
  const code = createRef<Code>();
  const success = createRef<Layout>();
  const noOverlap = createRef<Rect>();
  const error = createRef<Rect>();

  // 代码背景色
  const codeBackground = createRef<Layout>();
  const readerCode1ScopeBackground = createRef<Rect>();
  const readerCode2ScopeBackground = createRef<Rect>();
  const readerCode3ScopeBackground = createRef<Rect>();
  const editorCode1ScopeBackground = createRef<Rect>();
  const editorCode2ScopeBackground = createRef<Rect>();
  const editorCode3ScopeBackground = createRef<Rect>();

  const readerPrintCodeLayout = createRef<Layout>();

  // 错误提示
  const underLine = createRef<Line>();
  const errorExpress = createRef<Layout>();
  const promise = createRef<Rect>();
  const solidLine = createRef<Line>();

  view.add(
    <>
      <Layout
        ref={titleLayout}
        layout
        direction={"column"}
        alignItems={"center"}
        gap={10}
        y={-745}
      >
        <Txt
          ref={title}
          text={"非词法生命周期 NLL"}
          fill={COLORS.text}
          fontWeight={800}
          fontSize={58}
          opacity={0}
        />
        <Txt
          ref={subtitle}
          text={"借用结束于最后一次使用，而不是代码块末尾"}
          fill={COLORS.blue}
          fontSize={29}
          opacity={0}
        />
      </Layout>

      <CodeRect
        rectRef={codeCard}
        codeRef={code}
        code={SOURCE}
        filename={"nll.rs"}
        selection={lines(0, 7)}
        width={960}
        height={750}
        y={-400}
        opacity={0}
        background={
          <Layout ref={codeBackground} layout={false} y={312} opacity={0}>
            {/* reader 作用域 */}
            <Rect
              ref={readerCode1ScopeBackground}
              width={0}
              height={60}
              fill={"#373a6a"}
              opacity={0.5}
              x={-360}
              y={-428}
              offsetX={-1}
            />
            <Rect
              ref={readerCode2ScopeBackground}
              width={0}
              height={60}
              fill={"#373a6a"}
              opacity={0.5}
              x={-442}
              y={-368}
              offsetX={-1}
            />

            <Rect
              ref={readerCode3ScopeBackground}
              width={890}
              height={60}
              fill={"#373a6a"}
              opacity={0}
              x={-442}
              y={-398}
              offsetX={-1}
              offsetY={-1}
            />

            {/* editor 作用域 */}
            <Rect
              ref={editorCode1ScopeBackground}
              width={0}
              height={60}
              fill={"#6a6037"}
              opacity={0.5}
              x={-360}
              y={-255}
              offsetX={-1}
            />
            <Rect
              ref={editorCode2ScopeBackground}
              width={0}
              height={60}
              fill={"#6a6037"}
              opacity={0.5}
              x={-442}
              y={-195}
              offsetX={-1}
            />
            <Rect
              ref={editorCode3ScopeBackground}
              width={0}
              height={60}
              fill={"#6a6037"}
              opacity={0.5}
              x={-442}
              y={-135}
              offsetX={-1}
            />
          </Layout>
        }
      />

      <Layout ref={readerPrintCodeLayout} x={-211} y={-308} opacity={0}>
        <RustCode code={READER_PRINT_CODE} />
      </Layout>

      <SuccessLayout
        ref={success}
        x={-380}
        y={200}
        size={76}
        fontSize={50}
        opacity={0}
        scale={0}
      />

      <Rect
        ref={noOverlap}
        y={200}
        x={50}
        width={690}
        height={92}
        radius={24}
        fill={"#17362D"}
        stroke={COLORS.green}
        lineWidth={3}
        opacity={0}
        scale={0.94}
      >
        <Txt
          text={"读取结束  →  独占修改开始  ✓"}
          fill={COLORS.green}
          fontWeight={800}
          fontSize={34}
        />
      </Rect>

      <UnderLine ref={underLine} length={9} x={80} y={-178} />

      <ErrorLayout
        ref={errorExpress}
        size={50}
        fontSize={60}
        fontColor={COLORS.text}
        x={75}
        y={-200}
      />

      <Rect
        ref={promise}
        y={400}
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
          text={"reader 有效期间，数据需保持稳定"}
          fill={COLORS.blue}
          fontWeight={800}
          fontSize={34}
        />
      </Rect>

      <SolidLine
        ref={solidLine}
        points={[
          [150, 200],
          [80, -160],
        ]}
        stroke={COLORS.red}
        end={0}
      />

      <ErrorMsgRect
        ref={error}
        y={230}
        height={170}
        errContent={
          "cannot borrow `text` as mutable because it is \nalso borrowed as immutable"
        }
      />
    </>,
  );

  codeCard().y(140);
  yield* all(
    title().opacity(1, 0.4),
    subtitle().opacity(1, 0.45),
    codeCard().opacity(1, 0.4),
    codeCard().y(-260, 0.75, easeOutBack),
  );

  yield* waitUntil("scene5_same_scope");
  yield* all(code().selection(lines(2), 0.35));

  yield* waitUntil("scene5_reader_last_use");
  yield* all(code().selection(lines(2, 3), 0.4));

  // 标注 reader 变量的作用域
  yield* waitUntil("scene5_reader_annotation_scope");
  codeBackground().opacity(1);
  yield* chain(
    readerCode1ScopeBackground().width(808, 0.5),
    readerCode2ScopeBackground().width(413, 0.5),
  );

  yield* waitUntil("scene5_editor_begins");
  yield* all(
    code().selection(lines(5, 7), 0.4),
    readerCode1ScopeBackground().opacity(0.3, 0.4),
    readerCode2ScopeBackground().opacity(0.3, 0.4),
  );

  // 标注 editor 变量的作用域
  yield* waitUntil("scene5_editor_annotation_scope");
  yield* chain(
    editorCode1ScopeBackground().width(808, 0.5),
    editorCode2ScopeBackground().width(890, 0.5),
    editorCode3ScopeBackground().width(413, 0.5),
  );

  yield* waitUntil("scene5_reader_scope_highlight");
  yield* all(
    code().selection(lines(2, 7), 0.4),
    readerCode1ScopeBackground().opacity(0.8, 0.4),
    readerCode2ScopeBackground().opacity(0.8, 0.4),
    editorCode1ScopeBackground().opacity(0.8, 0.4),
    editorCode2ScopeBackground().opacity(0.8, 0.4),
    editorCode3ScopeBackground().opacity(0.8, 0.4),
  );

  // 作用域无重叠-显示成功标识
  yield* waitUntil("scene5_no_overlap");
  yield* all(
    success().opacity(1, 0.25),
    success().scale(1, 0.45, easeOutBack),
    noOverlap().opacity(1, 0.35),
    noOverlap().scale(1, 0.5, easeOutBack),
  );

  // 作用域重叠
  yield* waitUntil("scene5_overlap");
  yield* all(
    success().opacity(0, 0.45),
    success().scale(0, 0.2, easeOutBack),
    noOverlap().opacity(0, 0.3),
    noOverlap().scale(0, 0.3),
    readerCode1ScopeBackground().opacity(0.5, 0.4),
    readerCode2ScopeBackground().opacity(0.5, 0.4),
    editorCode1ScopeBackground().opacity(0.5, 0.4),
    editorCode2ScopeBackground().opacity(0.5, 0.4),
    editorCode3ScopeBackground().opacity(0.5, 0.4),
  );

  code().code(SOURCE2);
  readerPrintCodeLayout().opacity(1);
  yield* all(
    readerPrintCodeLayout().y(40, 1),
    readerCode2ScopeBackground().y(-22, 1),
    readerCode3ScopeBackground().opacity(0.5, 0.5),
    readerCode3ScopeBackground().height(346, 1.01),
  );

  yield* waitUntil("scene5_overlap_warn");

  yield* all(
    editorCode1ScopeBackground().fill("#833d3d", 0.3),
    editorCode2ScopeBackground().fill("#833d3d", 0.3),
    editorCode3ScopeBackground().fill("#833d3d", 0.3),
  );

  yield* waitFor(0.5);
  yield* all(
    underLine().end(1, 0.5),
    underLine().opacity(1, 0.2),
    errorExpress().opacity(1, 0.5),
    promise().opacity(1, 0.5),
  );
  yield* error().opacity(1, 0.3);
  yield* solidLine().end(1, 0.5);

  yield* waitUntil("scene5_nll");
  yield* all(
    codeCard().opacity(0.1, 0.5),
    readerPrintCodeLayout().opacity(0.1, 0.5),
    underLine().opacity(0.1, 0.5),
    error().opacity(0.1, 0.5),
    errorExpress().opacity(0.1, 0.5),
    solidLine().opacity(0.1, 0.5),
    promise().opacity(0.1, 0.5),
  );
  yield* all(titleLayout().y(-100, 1), titleLayout().scale(1.5, 1));
  yield* waitUntil("scene5_end");
});
