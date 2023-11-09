import { KaboomCtx } from "kaboom";

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

    if (layer.name === "groundGrass") {
      map.add([
        k.sprite("bright_grass", { frame: 258}),
        k.pos(pos),
        k.offscreen(),
      ])
      console.log("added grass")
    }
    else if (layer.name === "fence") {
      map.add([
        k.sprite("fence", { frame: tile - 1 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "groundSoil") {
      map.add([
        k.sprite("soil", { frame: 15 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "stones") {
      map.add([
        k.sprite("cliff", { frame: 581 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "groundPatches") {
      map.add([
        k.sprite("bright_grass", { frame: tile - 4303}),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "water") {
      if (tile >= 1000) {
        continue
      }
      if (tile >= 400 && tile <= 500) {
        map.add([
          k.sprite("foam", { frame: 295 }),
          k.pos(pos),
          k.offscreen(),
        ])
      }
    }
    else if (layer.name === "ladders") {
      map.add([
        k.sprite("assets", { frame: tile - 2550 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "topGrass") {
      map.add([
        k.sprite("bright_grass", { frame: tile - 4303 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name == "stonePath" ) {
      map.add([
        k.sprite("horizontal_stone_path", { frame: 4 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "topSoil") {
      map.add([
        k.sprite("soil", { frame: 15 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "Vegetation") {
      if (tile >= 110 && tile <= 120) {
        map.add([
          k.sprite("vegetation", { frame: tile - 105 }),
          k.pos(pos),
          k.offscreen(),
        ])
      }
      else if (tile > 120 && tile < 150) {
        map.add([
          k.sprite("trees", { frame: tile - 119 }),
          k.pos(pos),
          k.offscreen(),
        ])
      }
    }
    else if (layer.name === "decorations") {
      if (tile >= 4700 && tile <= 4900) {
        map.add([
          k.sprite("bridge", { frame: tile - 4775 }),
          k.pos(pos),
          k.offscreen(),
        ])
      }
      else if (tile > 100 && tile < 120) {
        map.add([
          k.sprite("vegetation", { frame: tile - 105 }),
          k.pos(pos),
          k.offscreen(),
        ])
      }
      else {
        map.add([
          k.sprite("decorations", { frame: tile - 1334 }),
          k.pos(pos),
          k.offscreen(),
        ])
        

      }
    }
    else if (layer.name === "topPatches") {
      map.add([
        k.sprite("bright_grass", { frame: tile - 4303 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "Trees") {
      map.add([
        k.sprite("trees", { frame: tile - 119 }),
        k.pos(pos),
        k.offscreen(),
      ])
    }
    else if (layer.name === "castles") {
      if (tile >= 2900 && tile <= 3000) {
        map.add([
          k.sprite("assets", { frame: tile - 2550 }),
          k.pos(pos),
          k.offscreen(),
        ])
      }
      else {
        map.add([
          k.sprite("light", { frame: tile - 5031 }),
          k.pos(pos),
          k.offscreen(),
        ])

      }
    }
    // else {
    //   console.log("Unknown layer name: ", layer.name)
    // }



  }

}