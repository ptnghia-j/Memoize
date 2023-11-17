import { GameObj, KaboomCtx, Vec2 } from "kaboom";

export function loadSpriteHelper(k: KaboomCtx) {
  k.loadSprite("decorations", "/assets/decorations.png", {
    sliceX: 24,
    sliceY: 24,
  })

  k.loadSprite("bridge", "/assets/bridge.png", {
    sliceX: 16,
    sliceY: 18,
  })

  k.loadSprite("bright_grass", "/assets/bright_grass.png", {
    sliceX: 22,
    sliceY: 20,
    
  })

  k.loadSprite("dark_grass", "/assets/dark_grass.png", {
    sliceX: 22,
    sliceY: 20,
  })

  k.loadSprite("soil", "/assets/earth_soil.png", {
    sliceX: 12,
    sliceY: 5,
  })

  k.loadSprite("foam", "/assets/foam.png", {
    sliceX: 96,
    sliceY: 12,
  })

  k.loadSprite("fence", "/assets/fence.png", {
    sliceX: 13,
    sliceY: 8,
  })

  k.loadSprite("vegetation", "/assets/vegetation.png", {
    sliceX: 7,
    sliceY: 2,
    })

  k.loadSprite("light", "/assets/light.png", {
    sliceX: 13,
    sliceY: 4,
  })

  k.loadSprite("horizontal_stone_path", "/assets/horizontal_stone_path.png", {
    sliceX: 11,
    sliceY: 2,
  })

  k.loadSprite("vertical_stone_path", "/assets/vertical_stone_path.png", {
    sliceX: 2,
    sliceY: 11,
  })

  k.loadSprite("cliff", "/assets/cliff.png", {
    sliceX: 20,
    sliceY: 32,
  })

  k.loadSprite("assets", "/assets/topdownasset.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
      "player-idle-down": 940,
      "player-down": {
        from: 940,
        to: 943,
        loop: true,
      },
      "player-idle-left": 1057,
      "player-left": {
        from: 1057,
        to: 1060,
        loop: true,
      },
      "player-idle-right": 979,
      "player-right": {
        from: 979,
        to: 982,
        loop: true,
      },
      "player-idle-up": 1018,
      "player-up": {
        from: 1018,
        to: 1021,
        loop: true,
      },
      
      
      "rabbit-idle-down": 780,
    }
  })

  k.loadSprite("trees", "/assets/trees.png", {
    sliceX: 7,
    sliceY: 9,
  })

  k.loadSprite("water", "/assets/water.png", {
    sliceX: 12,
    sliceY: 14,
  })
}

export function drawTilesHelper(k: KaboomCtx, map: GameObj, layer: any, pos: Vec2, tile: number) {

  if (layer.name === "groundGrass") {
    map.add([
      k.sprite("bright_grass", { frame: 258}),
      k.pos(pos),
      k.offscreen(),
    ])
    // console.log("added grass")
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
}