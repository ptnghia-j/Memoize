"use client";

import { useCallback, useEffect, useRef} from 'react'
import kaplay, { KAPLAYCtx } from 'kaplay'
import { world } from './scenes/world'
import { loadSpriteHelper } from './lib/helper'

const Canvas: React.FC = () => {

	const isRunning = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const useWorld = useCallback((k: KAPLAYCtx) => {
    world(k)
  }, [])

  const useloadSpriteHelper = useCallback((k: KAPLAYCtx) => {
    loadSpriteHelper(k)
  }, [])

	useEffect(() => {
    if (isRunning.current || !canvasRef || !canvasRef.current) {
      return;
    }
    isRunning.current = true;

		const k = kaplay({
      width: window.innerWidth,
      height: window.innerHeight,
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
	}, [useWorld, useloadSpriteHelper])

	return <canvas ref={canvasRef}></canvas>

}

export default Canvas

