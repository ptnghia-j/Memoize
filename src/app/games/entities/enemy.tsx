import { KaboomCtx, Vec2 } from "kaboom";
import { playAnimIfNotPlaying } from "../lib/utils";

const directionalStates = ["right", "left", "up", "down"];
const waitTime = 0.5;
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
    k.state("idle", ["idle", ...directionalStates]),
    {
      speed: 50,
      attackPower: 0.5,
      direction: "down",
      isAttacking: false,
    },
    "enemy"
  ]
}

// async function move({k, entity, isHorizontal, moveBy, duration} : {k: KaboomCtx, entity: any, isHorizontal: boolean, moveBy: number, duration: number}) {
//   await entity.tween(
//     isHorizontal ? entity.pos.x : entity.pos.y,
//     isHorizontal ? entity.pos.x + moveBy : entity.pos.y + moveBy,
//     duration,
//     (val : any) => {
//       isHorizontal ? (entity.pos.x = val) : (entity.pos.y = val);
//     },
//     k.easings.linear
//   );
// }

export function setEnemyAI({k, enemy} : {k: KaboomCtx, enemy: any}) {
  k.onUpdate(() => {
    switch (enemy.state) {
      case "right":
        enemy.move(enemy.speed, 0);
        break;
      case "left":
        enemy.move(-enemy.speed, 0);
        break;
      case "up":
        enemy.move(0, -enemy.speed);
        break;
      case "down":
        enemy.move(0, enemy.speed);
        break;
      default:
    }
  });

  try {
    const idle = enemy.onStateEnter("idle", async () => {
      enemy.stop();
      await k.wait(waitTime);
      enemy.enterState(
        directionalStates[Math.floor(Math.random() * directionalStates.length)]
      );
    });
  
    const right = enemy.onStateEnter("right", async () => {
      // enemy.flipX = false;
      playAnimIfNotPlaying(enemy, "rabbit-right");
      await k.wait(waitTime);
  
      if (enemy.onCollide()) {
        enemy.enterState("idle");
        return;
      }
  
      enemy.enterState("idle");
    });
  
    const left = enemy.onStateEnter("left", async () => {
      // enemy.flipX = true;
      playAnimIfNotPlaying(enemy, "rabbit-left");
      await k.wait(waitTime);
  
      if (enemy.onCollide()) {
        enemy.enterState("idle");
        return;
      }
  
      enemy.enterState("idle");
    });
  
    const up = enemy.onStateEnter("up", async () => {
      playAnimIfNotPlaying(enemy, "rabbit-up");
      await k.wait(waitTime);
  
      if (enemy.onCollide()) {
        enemy.enterState("idle");
        return;
      }
  
      enemy.enterState("idle");
    });
  
    const down = enemy.onStateEnter("down", async () => {
      playAnimIfNotPlaying(enemy, "rabbit-down");
      await k.wait(waitTime);
  
      if (enemy.onCollide()) {
        enemy.enterState("idle");
        return;
      }
  
      enemy.enterState("idle");
    });

    k.onSceneLeave(() => {
      idle.cancel();
      right.cancel();
      left.cancel();
      up.cancel();
      down.cancel();
    });

  }
  catch {
    console.log("error")
  }
  

  
}