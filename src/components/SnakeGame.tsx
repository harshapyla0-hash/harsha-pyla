import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = { x: prevSnake[0].x + direction.x, y: prevSnake[0].y + direction.y };

      // Wall Collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return prevSnake;
      }

      // Self Collision
      if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Food Collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 100);
        generateFood();
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused]);

  const generateFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
            setIsPaused(p => !p);
            break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [moveSnake]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid (Subtle)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
    }

    // Draw Snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#ff00ff' : '#00ffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = index === 0 ? '#ff00ff' : '#00ffff';
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.shadowBlur = 0;
    });

    // Draw Food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 3,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

  }, [snake, food]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative border-4 border-magenta-glow p-1 bg-black">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="block"
        />
        
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-4">
            <h3 className="text-magenta-glow text-lg mb-4 glitch-text" data-text="GAME_OVER">GAME_OVER</h3>
            <p className="text-xs mb-6 font-mono">FINAL_SCORE: {score}</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 border-2 border-cyan-glow hover:bg-cyan-glow hover:text-black transition-all cursor-pointer text-[10px]"
            >
              INITIALIZE_REBOOT
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <button
              onClick={() => setIsPaused(false)}
              className="px-4 py-2 bg-black border-2 border-magenta-glow text-magenta-glow animate-pulse cursor-pointer text-[10px]"
            >
              PRESS_TO_RESUME
            </button>
          </div>
        )}
      </div>

      <div className="w-full flex justify-between items-center px-2 py-4 border-x-2 border-b-2 border-cyan-glow bg-black/50">
        <div>
          <div className="text-[10px] text-cyan-glow/50 mb-1">SCORE</div>
          <div className="text-xl font-mono text-cyan-glow">{score.toString().padStart(6, '0')}</div>
        </div>
        <div className="text-right">
            <div className="text-[10px] text-magenta-glow/50 mb-1">STATUS</div>
            <div className="text-[10px] text-magenta-glow animate-pulse">{isPaused ? 'IDLE' : 'ACTIVE'}</div>
        </div>
      </div>
      
      <div className="text-[8px] text-cyan-glow/40 mt-2">
        ARROWS: MOVE | SPACE: PAUSE
      </div>
    </div>
  );
};
