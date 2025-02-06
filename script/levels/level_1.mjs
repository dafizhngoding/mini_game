import { dataItemsLVL1} from "../../data/level_1.mjs";
import { collision } from "../class/collision.mjs";
import { Player } from "../class/player.mjs";

export function CreateLevel_1() {
  return {
    player: new Player(100,100,200,200,"player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
    item: dataItemsLVL1,
    name: "level_1",
    status: "ready",
    collision: collision
  }
}