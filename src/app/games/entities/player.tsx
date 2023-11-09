import { KaboomCtx, Vec2 } from "kaboom";

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