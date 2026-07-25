import {
  Layout,
  Txt,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  all,
  createRef,
  easeOutBack,
  waitUntil,
} from "@motion-canvas/core";
import { DoubtPictogramLayout } from "../../../components/DoubtPictogramLayout";

const BG = "#0B1020";
const TEXT = "#E8ECF6";

export default makeScene2D(function* (view) {
  view.fill(BG);

  const prompt = createRef<Layout>();
  const person = createRef<Layout>();

  view.add(
    <>
      <Layout
        ref={prompt}
        layout
        direction={"column"}
        alignItems={"center"}
        y={-700}
        gap={14}
        opacity={0}
      >
        <Txt
          text={"Rust 为什么要这样设计？"}
          fill={TEXT}
          fontWeight={800}
          fontSize={58}
        />
      </Layout>

      <DoubtPictogramLayout
        ref={person}
        x={-35}
        y={-40}
        opacity={0}
      ></DoubtPictogramLayout>
    </>,
  );

  yield* prompt().opacity(1, 0.2);
  yield* all(
    person().opacity(1, 0.35),
    person().scale(1, 0.55, easeOutBack)
  );

  yield* waitUntil("scene8_end");
});
