"use client";

import { useCallback, useEffect, useRef, useState} from 'react'
import kaboom, { KaboomCtx } from 'kaboom'
import { world } from './scenes/world'

const Canvas: React.FC = () => {

	const isRunning = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const useWorld = useCallback((k: KaboomCtx) => {
    world(k)
  }, [world])


	useEffect(() => {
    if (isRunning.current || !canvasRef || !canvasRef.current) {
      return;
    }
    isRunning.current = true;

		const k = kaboom({
      width: 1580,
      height: 1270,
      letterbox: true,
      global: false,
    })

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
    })

    k.loadSprite("trees", "/assets/trees.png", {
      sliceX: 7,
      sliceY: 9,
    })


    const scenes = {
      world: useWorld,

    }
   
    for (const [name, scene] of Object.entries(scenes)) {
      k.scene(name, () => scene(k))
    }

    k.go("world")

  //  add k to the dependency to track when it changes
	}, [])

	return <canvas ref={canvasRef}></canvas>

}

export default Canvas

