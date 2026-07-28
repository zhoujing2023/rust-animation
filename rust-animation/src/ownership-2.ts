import { makeProject } from "@motion-canvas/core";

import ownership2Mp3 from "../audio/rust-ownership-2.mp3";
import scene1 from "./scenes/ownership/2/scene1?scene";
import scene2 from "./scenes/ownership/2/scene2?scene";
import scene3 from "./scenes/ownership/2/scene3?scene";
import scene4 from "./scenes/ownership/2/scene4?scene";
import scene5 from "./scenes/ownership/2/scene5?scene";
import scene6 from "./scenes/ownership/2/scene6?scene";

export default makeProject({
  scenes: [scene1, scene2, scene3, scene4, scene5, scene6],
  audio: ownership2Mp3,
});
