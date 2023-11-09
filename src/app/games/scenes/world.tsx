import type { KaboomCtx } from "kaboom";
import { colorizeBackground, drawBoundaries, drawTiles, fetchMapData } from "../lib/utils";
import { generatePlayerComponents } from "../entities/player";
import { generateEnemyComponents } from "../entities/enemy";

export async function world(k: KaboomCtx) {
  colorizeBackground({k, r: 205, g: 255, b: 255})
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
    console.log("done drawing tiles")
  }

  k.camScale(k.vec2(1.5,1.5))
  k.camPos(entities.player.worldPos())


}
