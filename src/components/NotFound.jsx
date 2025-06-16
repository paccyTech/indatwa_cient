import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);

  // Game constants
  const gameWidth = 600;
  const gameHeight = 150;
  const gravity = 0.6;
  const jumpForce = 12;

  // Refs to game state
  const dinoRef = useRef(null);
  const obstacleRef = useRef(null);
  const requestRef = useRef(null);

  // Game state
  const [dino, setDino] = useState({ y: 0, velocity: 0, jumping: false });
  const [obstacleX, setObstacleX] = useState(gameWidth);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Jump function
  const jump = () => {
    if (!dino.jumping && !gameOver) {
      setDino((prev) => ({ ...prev, velocity: -jumpForce, jumping: true }));
    }
  };

  // Keyboard event listener for spacebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    if (showGame) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGame, dino.jumping, gameOver]);

  // Game loop animation
  useEffect(() => {
    if (!showGame) return;

    const update = () => {
      // Dino position & velocity update
      setDino((prev) => {
        let newVelocity = prev.velocity + gravity;
        let newY = prev.y + newVelocity;

        if (newY > 0) {
          newY = 0;
          newVelocity = 0;
          return { y: newY, velocity: newVelocity, jumping: false };
        }
        return { y: newY, velocity: newVelocity, jumping: true };
      });

      // Move obstacle left
      setObstacleX((prev) => {
        let newX = prev - 6;
        if (newX < -40) {
          setScore((score) => score + 1);
          return gameWidth;
        }
        return newX;
      });

      // Collision detection
      if (
        obstacleX < 40 && // obstacle near dino (dino width ~40)
        obstacleX > 0 &&
        dino.y > -40 // dino is low (height 40)
      ) {
        setGameOver(true);
        cancelAnimationFrame(requestRef.current);
        return;
      }

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [showGame, dino.y, obstacleX]);

  // Restart game
  const restartGame = () => {
    setGameOver(false);
    setDino({ y: 0, velocity: 0, jumping: false });
    setObstacleX(gameWidth);
    setScore(0);
    requestRef.current = requestAnimationFrame(() => {});
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Oops! Page Not Found.</p>
        <p className="notfound-submessage">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button className="notfound-btn" onClick={() => navigate('/')}>
          Go Back Home
        </button>
        <button
          className="notfound-btn game-toggle"
          onClick={() => setShowGame(!showGame)}
        >
          {showGame ? 'Hide Game' : 'Play Dino Game'}
        </button>

        {showGame && (
          <div className="game-container" style={{ width: gameWidth, height: gameHeight }}>
            <div
              className={`dino ${gameOver ? 'game-over' : ''}`}
              style={{ bottom: -dino.y }}
              ref={dinoRef}
              onClick={jump}
              role="button"
              tabIndex={0}
              aria-label="Jump"
            />
            <div
              className="obstacle"
              style={{ left: obstacleX }}
              ref={obstacleRef}
            />
            <div className="score">Score: {score}</div>
            {gameOver && (
              <div className="game-over-text">
                Game Over
                <button className="restart-btn" onClick={restartGame}>
                  Restart
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotFound;
