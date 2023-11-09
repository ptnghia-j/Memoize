import type { KaboomCtx } from "kaboom";
import { colorizeBackground, drawTiles, fetchMapData } from "../lib/utils";

export async function world(k: KaboomCtx) {
  colorizeBackground({k, r: 205, g: 255, b: 255})
  const mapData = await fetchMapData("/assets/maps/world.json")

  const map = k.add([k.pos(0,0)]);

  const entities = {
    player: null,
    enemies: [],
  }

  const layers = mapData.layers

  for (const layer of layers) {

    if (layer.name === "Boundaries") {
      continue

    }

    if (layer.name === "SpawnPoints") {
      continue
    }

    drawTiles({k, map, layer, tileheight: 16, tilewidth: 16})
    console.log("done drawing tiles")
  }

  k.camScale(k.vec2(1.5,1.5))


}
