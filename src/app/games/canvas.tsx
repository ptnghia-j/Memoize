"use client";

import { useEffect, useRef } from 'react'
import kaboom from 'kaboom'
import { useWorld } from './scenes/world'

const Canvas: React.FC = () => {

	const isRunning = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
    if (isRunning.current || !canvasRef || !canvasRef.current) {
      return;
    }
    isRunning.current = true;

		const k = kaboom({
			width: 1280,
      height: 720,
      letterbox: true,
      global: false,
		})

    const scenes = {
      world: useWorld(k),
    }

    for (const [name, scene] of Object.entries(scenes)) {
      k.scene(name, scene)
    }

    k.go("world")


	}, [])

	return <canvas ref={canvasRef}></canvas>

}

export default Canvas

