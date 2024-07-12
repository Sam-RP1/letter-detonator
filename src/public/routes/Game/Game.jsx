import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";

import debounce from "./utils/debounce.js";

import generateLetter from "./utils/generateLetter.js";
import updateLetters from "./utils/updateLetters.js";
import removeLetter from "./utils/removeLetter.js";
import generateExplosion from "./utils/generateExplosion.js";
import updateExplosions from "./utils/updateExplosions.js";

import "./Game.scss";

import SpriteImg from "../../assets/sprites/png/Separate/Ship/Ship (4).png";

import explosion0 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__000.png";
import explosion1 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__001.png";
import explosion2 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__002.png";
import explosion3 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__003.png";
import explosion4 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__004.png";
import explosion5 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__005.png";
import explosion6 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__006.png";
import explosion7 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__007.png";
import explosion8 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__008.png";
import explosion9 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__009.png";
import explosion10 from "../../assets/sprites/png/Separate/Effects/Explosion/Explo__010.png";

import background from "../../assets/SpaceBg/Backgrounds/Blue3.png";

const Game = () => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const gameState = {
    status: "loading",
    score: 0,
    canvas: {
      settings: {
        baseline: {
          resolution: {
            width: 1920,
            height: 1080,
          },
          aspectRatio: 16 / 9,
        },
        height: canvasSize.height,
        width: canvasSize.width,
        centerY: canvasSize.height / 2,
        centerX: canvasSize.width / 2,
        backgroundColor: "#777",
        backgroundImg: background,
      },
    },
    letters: {
      instances: [],
      settings: {
        font: "Arial",
        size: "25px",
        color: "#FFF",
        maxInstances: 20,
        spawnChance: 0.1,
        spawnInterval: 100,
        maxTime: 8000,
        minTime: 4000,
      },
    },
    explosions: {
      instances: [],
      settings: {
        maxSize: 80,
        minSize: 50,
        sprites: [
          explosion0,
          explosion1,
          explosion2,
          explosion3,
          explosion4,
          explosion5,
          explosion6,
          explosion7,
          explosion8,
          explosion9,
          explosion10,
        ],
      },
    },
    player: {
      health: 10,
      shield: 10,
      cash: 25,
      abilities: {},
    },
  };

  const debouncedUpdateCanvasSize = useMemo(
    () =>
      debounce(() => {
        const aspectRatio = gameState.canvas.settings.baseline.aspectRatio;
        // Start with the assumption that we're adjusting based on width
        let currentWidth = window.innerWidth;
        let newHeight = currentWidth / aspectRatio;
        // If the new height is greater than the window's height, adjust based on height instead
        if (newHeight > window.innerHeight) {
          newHeight = window.innerHeight;
          currentWidth = newHeight * aspectRatio; // Recalculate width based on height to maintain aspect ratio
        }

        setCanvasSize({
          width: currentWidth,
          height: newHeight,
        });
      }, 100),
    [gameState.canvas.settings.baseline.aspectRatio]
  ); // Dependencies for recreating the debounced function

  const updateCanvasSize = useCallback(debouncedUpdateCanvasSize, [debouncedUpdateCanvasSize]);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    // Canvas properties
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = canvasSize.width;
    const height = canvasSize.height;

    // This set the number of pixels in the canvas itself
    // Y axis has number of height pixels
    // X axis has number of width pixels
    canvas.width = width;
    canvas.height = height;

    // This sets the size of the canvas in the browser
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    canvas.style.backgroundColor = gameState.canvas.settings.backgroundColor;

    ctx.font = gameState.letters.settings.size + " " + gameState.letters.settings.font;
    ctx.fillStyle = gameState.letters.settings.color;

    const letterGenerationInterval = setInterval(() => {
      if (gameState.letters.instances.length >= gameState.letters.settings.maxInstances) return;
      if (Math.random() >= gameState.letters.settings.spawnChance) return;

      const newLetter = generateLetter(gameState.letters.settings.minTime, gameState.letters.settings.maxTime, canvasSize.height, canvasSize.width);

      gameState.letters.instances.push(newLetter);
    }, gameState.letters.settings.spawnInterval);

    // Animation properties
    let animationFrameId;

    // Game initialization logic here
    const initGame = () => {};

    // The game loop function
    const gameLoop = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillText("Score: " + gameState.score, 15, 30);

      // Rectangle dimensions
      const rectWidth = 50;
      const rectHeight = 50;

      // Calculate center of the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Calculate top-left corner of the rectangle to center it
      const rectX = centerX - rectWidth / 2;
      const rectY = centerY - rectHeight / 2;

      // Draw the rectangle
      ctx.fillStyle = "red";
      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

      ctx.fillStyle = "#fff";

      updateLetters(gameState.letters.instances);
      updateExplosions(gameState.explosions.instances, gameState.explosions.settings);

      for (const item of gameState.letters.instances) {
        ctx.fillText(item.code, item.x, item.y);
      }

      for (const item of gameState.explosions.instances) {
        const explosion = new Image();
        explosion.src = item.stage;

        ctx.drawImage(explosion, item.x, item.y, item.size, item.size);
      }

      // Request the next animation frame
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Start the game loop
    initGame();
    gameLoop();

    const handleKeyDown = (e) => {
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        const index = gameState.letters.instances.findIndex((letter) => letter.code.toLowerCase() === e.key.toLowerCase());

        if (index !== -1) {
          const newExplosion = generateExplosion(
            gameState.letters.instances[index].x,
            gameState.letters.instances[index].y,
            gameState.explosions.settings.minSize,
            gameState.explosions.settings.maxSize,
            gameState.explosions.settings.sprites[0]
          );

          gameState.explosions.instances.push(newExplosion);

          removeLetter(gameState.letters.instances, index);

          gameState.score++;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(letterGenerationInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasSize]);

  return (
    <>
      <section className="canvas__container">
        <canvas ref={canvasRef} id="canvas"></canvas>
      </section>

      <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            height: "5px",
            width: "5px",
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "blue",
          }}
        ></div>
      </div>
    </>
  );
};

export default Game;
