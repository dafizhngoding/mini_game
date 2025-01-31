import { Mob } from "../class/mob.mjs";
import { Player } from "../class/player.mjs";

export function CreateLevel_1() {
  return {
    player: new Player(100,100,300,300,"player", 5, '/assets/Main Character/Hero 1/Bernafas.gif'),
    mob: [new Mob(300, 100, 50, 50, "goblin")],
    name: "level 1",
    status: "ready"
  }
}