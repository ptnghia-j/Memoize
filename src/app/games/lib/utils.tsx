import { GameObj, KaboomCtx, Vec2 } from "kaboom";
import { drawTilesHelper } from "./helper";


export async function fetchMapData(mapPath: string) {
  const mapData = await fetch(mapPath)
  return await mapData.json()
}

export function colorizeBackground({k, r, g, b}: {k: KaboomCtx, r: number, g: number, b: number}) {
  k.add([
    k.rect(k.width(), k.height()),
    k.color(r, g, b),
    k.fixed(),
  ])
}

export function drawTiles({k, map, layer, tileheight, tilewidth} : {k: KaboomCtx, map: any, layer: any, tileheight: number, tilewidth: number}) {
  let numOfDrawnTiles = 0
  const pos = k.vec2(0,0)

  for (const tile of layer.data) {

    if (numOfDrawnTiles % layer.width === 0) {
      pos.x = 0
      pos.y += tileheight
    }
    else {
      pos.x += tilewidth
    
    }

    numOfDrawnTiles += 1
    if (tile === 0) {
      continue
    }

    drawTilesHelper(k, map, layer, pos, tile)
  }
}

export function generateCollideBoxComponents(k: KaboomCtx, pos: Vec2, width: number, height: number, tag: string) {
  return [
    k.area({ shape: new k.Rect(k.vec2(0,0), width, height)}),
    k.pos(pos),
    k.body({ isStatic: true}),
    k.offscreen(),
    tag
  ];
}

export function drawBoundaries(k: KaboomCtx, map: GameObj, layer: any) {
  for (const object of layer.objects) {
    map.add(
      generateCollideBoxComponents(
        k, 
        k.vec2(object.x, object.y + 16), 
        object.width, 
        object.height, 
        object.name))
  }
}

export function playAnimIfNotPlaying(obj: GameObj, animName: string) {
  if(obj.curAnim() !== animName) obj.play(animName)
}

// prevent character moving diagonally
export function anyOfKeysPressed(k: KaboomCtx, keys: any[]) {
  if (keys?.length === 0) return false
  

  for (const key of keys) {
    if (k.isKeyDown(key)) return true
  }

  return false
}