import type { KaboomCtx } from "kaboom";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "../lib/utils";
import { generatePlayerComponents, setPlayerMovement } from "../entities/player";
import { generateEnemyComponents } from "../entities/enemy";

export async function world(k: KaboomCtx) {
  
  if (Date.now() < 12) {
    colorizeBackground({k, r:205, g: 255, b: 255})
  }
  else if (Date.now() < 18) {
    colorizeBackground({k, r: 175, g: 238, b: 238})
  }
  else if (Date.now() < 24) {
    colorizeBackground({k, r: 255, g: 215, b: 181})
  }
  else {
    colorizeBackground({k, r: 230, g: 230, b: 250})
  }

  
  const mapData = await fetchMapData("/assets/maps/world.json")

  const map = k.add([k.pos(0,0)]);


  const entities = {
    player: Object(),
    enemies: [Object()],
  };

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

  k.camScale(k.vec2(4,4))
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
  })
  setPlayerMovement(k, entities.player)

}
