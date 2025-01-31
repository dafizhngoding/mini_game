import { Mob } from "../class/mob.mjs";
import { Player } from "../class/player.mjs";

export function CreateLevel_1() {
  return {
    player: new Player(100,100,200,200,"player", 2, '/assets/Main Character/Hero 1/Bernafas.gif'),
    mob: [new Mob(300, 100, 200, 200, "goblin", '/assets/Mobs/Goblin/Bernafas.gif'), new Mob(200, 500, 200, 200, "goblin", '/assets/Mobs/Goblin/Bernafas.gif'), new Mob(500, 300, 200, 200, "goblin", '/assets/Mobs/Goblin/Bernafas.gif')],
    name: "level_1",
    status: "ready"
  }
}