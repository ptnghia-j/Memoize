import { KaboomCtx, Vec2, GameObj} from "kaboom";
import { anyOfKeysPressed, playAnimIfNotPlaying } from "../lib/utils";

export function generatePlayerComponents(k: KaboomCtx, pos: Vec2) {
  return [
    k.sprite("assets", {
      anim: "player-idle-down",
    }),
    k.area({ shape: new k.Rect(k.vec2(3, 4), 10, 12)}),
    k.body(),
    k.pos(pos),
    k.opacity(), 
    {
      speed: 100,
      attackPower: 1,
      direction: "down",
      isAttacking: false,
    },
    "player"
  ]
}
export function setPlayerMovement(k: KaboomCtx, player: GameObj) {
  k.onKeyDown((key) => {
    
    if (["left", "a"].includes(key) && !anyOfKeysPressed(k, ["up", "w", "down", "s"])) {
      playAnimIfNotPlaying(player, "player-left")
      player.move(-player.speed, 0);
      player.direction = "left";
      return
    }

    if (["right", "d"].includes(key) && !anyOfKeysPressed(k, ["up", "w", "down", "s"])) {
      playAnimIfNotPlaying(player, "player-right")
      player.move(player.speed, 0);
      player.direction = "right";
      return
    }

    if (["up", "w"].includes(key)) {
      playAnimIfNotPlaying(player, "player-up")
      player.move(0, -player.speed);
      player.direction = "up";
      return
    }

    if (["down", "s"].includes(key)) {
      playAnimIfNotPlaying(player, "player-down")
      player.move(0, player.speed);
      player.direction = "down";
      return
    }
  })

  k.onKeyRelease(() => {
    player.stop();
  })

}