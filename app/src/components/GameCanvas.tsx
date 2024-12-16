import { useEffect, useRef } from 'react';
import { GameClient } from '../client';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clientRef = useRef<GameClient | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    clientRef.current = new GameClient(canvasRef.current);
    clientRef.current.start();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default GameCanvas;
