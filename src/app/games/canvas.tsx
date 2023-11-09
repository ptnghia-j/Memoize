"use client";

import { useCallback, useEffect, useRef, useState} from 'react'
import kaboom, { KaboomCtx } from 'kaboom'
import { world } from './scenes/world'
import { loadSpriteHelper } from './lib/helper'

const Canvas: React.FC = () => {

	const isRunning = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const useWorld = useCallback((k: KaboomCtx) => {
    world(k)
  }, [world])

  const useloadSpriteHelper = useCallback((k: KaboomCtx) => {
    loadSpriteHelper(k)
  }, [loadSpriteHelper])

	useEffect(() => {
    if (isRunning.current || !canvasRef || !canvasRef.current) {
      return;
    }
    isRunning.current = true;

		const k = kaboom({
      width: 1920,
      height: 1080,
      letterbox: true,
      global: false,
    })

    useloadSpriteHelper(k);

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

