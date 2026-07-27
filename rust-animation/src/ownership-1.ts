import { makeProject } from "@motion-canvas/core";

import Introduction from "./scenes/ownership/1/Introduction?scene";
import Ownership from "./scenes/ownership/1/Ownership?scene";
import OwnershipMove from "./scenes/ownership/1/OwnershipMove?scene";
import OwnershipMoveCode from "./scenes/ownership/1/OwnershipMoveCode?scene";
import Borrow from "./scenes/ownership/1/Borrow?scene";
import BorrowCode from "./scenes/ownership/1/BorrowCode?scene";
import MoveAndBorrow from "./scenes/ownership/1/MoveAndBorrow?scene";
import Why from "./scenes/ownership/1/Why?scene";
import ReasonExplanation from "./scenes/ownership/1/ReasonExplanation?scene";
import Replenish from "./scenes/ownership/1/Replenish?scene";
import ownership1Mp3 from "../audio/rust-ownership-1.mp3";

export default makeProject({
  scenes: [
    Introduction,
    Ownership,
    OwnershipMove,
    OwnershipMoveCode,
    Borrow,
    BorrowCode,
    MoveAndBorrow,
    Why,
    ReasonExplanation,
    Replenish,
  ],
  audio: ownership1Mp3,
});
