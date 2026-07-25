import { makeProject } from "@motion-canvas/core";

import scene1 from "./scenes/ownership/1/scene1?scene";
import scene2 from "./scenes/ownership/1/scene2?scene";
import scene3 from "./scenes/ownership/1/scene3?scene";
import scene4 from "./scenes/ownership/1/scene4?scene";
import scene5 from "./scenes/ownership/1/scene5?scene";
import scene6 from "./scenes/ownership/1/scene6?scene";
import scene7 from "./scenes/ownership/1/scene7?scene";
import scene8 from "./scenes/ownership/1/scene8?scene";
import scene9 from "./scenes/ownership/1/scene9?scene";
import scene10 from "./scenes/ownership/1/scene10?scene";
import ownership1Mp3 from "../audio/rust-ownership-1.mp3";

export default makeProject({
  scenes: [
    scene1,
    scene2,
    scene3,
    scene4,
    scene5,
    scene6,
    scene7,
    scene8,
    scene9,
    scene10,
  ],
  audio: ownership1Mp3,
});
