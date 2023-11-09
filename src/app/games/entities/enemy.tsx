import { KaboomCtx, Vec2 } from "kaboom";

export function generateEnemyComponents(k: KaboomCtx, pos: Vec2) {
  return [
    k.sprite("assets", {
      anim: "rabbit-idle-down",
    }),
    k.area({shape: new k.Rect(k.vec2(3, 4), 16, 14)}),
    k.body(),
    k.pos(pos),
    k.offscreen(),
    k.opacity(),
    {
      speed: 30,
      attackPower: 0.5,
      direction: "down",
      isAttacking: false,
    },
    "enemy"
  ]
}