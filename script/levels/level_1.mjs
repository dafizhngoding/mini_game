import { dataItemsLVL1, dataMobsLVL1 } from "../../data/level_1.mjs";
import { Mob } from "../class/mob.mjs";
import { Player } from "../class/player.mjs";

export function CreateLevel_1() {
  return {
    player: new Player(100,100,200,200,"player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
    mob: dataMobsLVL1,
    item: dataItemsLVL1,
    name: "level_1",
    status: "ready"
  }
}