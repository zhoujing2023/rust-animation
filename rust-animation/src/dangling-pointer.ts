import { makeProject } from "@motion-canvas/core";

import danglingPointerMp3 from "../audio/rust-dangling-pointer.mp3";
import scene1 from "./scenes/dangling_pointer/scene1?scene";
import scene2 from "./scenes/dangling_pointer/scene2?scene";

export default makeProject({
  scenes: [scene1, scene2],
  audio: danglingPointerMp3,
});
