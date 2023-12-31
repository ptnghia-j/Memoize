import type { KaboomCtx } from "kaboom";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "../lib/utils";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player";
import { generateEnemyComponents } from "../entities/enemy";
import { light } from "../lib/helper";
import { entities } from "../lib/helper";
import { setEnemyAI } from "../entities/enemy";

export async function world(k: KaboomCtx) {
  const time = new Date().getHours()
  if (time > 6 || time < 12)
    colorizeBackground({k, r:200, g: 255, b: 255})
  else 
    colorizeBackground({k, r: 119, g: 136, b: 153})


  const mapData = await fetchMapData("/assets/maps/world.json")

  const map = k.add([k.pos(0,0)]);

  const layers = mapData.layers;

  for (const layer of layers) {
    console.log("layer name: ", layer.name)

    if (layer.name === "Boundaries") {
      drawBoundaries(k, map, layer)
      continue
    }

    if (layer.name === "SpawnPoints") {
      for (const object of layer.objects) {
        if (object.name === "Player") {
          entities.player = map.add(
            generatePlayerComponents(k, k.vec2(object.x, object.y))
          );
          continue;
        }

        if (object.name === "Dashboard" || object.name === "imageGen") {
          k.add([
            k.pos(object.x, object.y),
            k.rect(object.width, object.height),
            k.opacity(0),
            object.name,
          ])
        }

        if (object.name === "Enemy") {
          const enemy = map.add(
            generateEnemyComponents(k, k.vec2(object.x, object.y))
          );
          entities.enemies.push(enemy);
          continue;
          
        }
      }
      continue
    }

    drawTiles({k, map, layer, tileheight: 16, tilewidth: 16})
  }


  k.camScale(k.vec2(3,3))
  k.camPos(entities.player.worldPos())


  k.onUpdate(async () => {
    if (entities.player.pos.dist(k.camPos())) {
      await k.tween(
        k.camPos(),
        entities.player.pos,
        0.15,
        (newPos) => k.camPos(newPos),
        k.easings.linear,
      )
    }
  
    // if (time < 6 || time > 18) {
    //   light(k)
    // } 
    //for testing 
    light(k)
  })

  setPlayerMovement(k, entities.player)
  entities.player.onCollide("dashboard", () => window.location.href = "/dashboard");
  entities.player.onCollide("imageGen", () => window.location.href = "/flashcard/generatedImages");


  for (const enemy of entities.enemies) {
    setEnemyAI({k, enemy});
    
  }

  // if (time < 6 || time > 18) {
  //   light(k)
  // }
  // for testing 
  light(k)
}
