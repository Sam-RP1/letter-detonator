import React, { useState, useCallback, useEffect, useRef } from "react";

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
        backgroundColor: "#000",
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

  const sprite = new Image();
  sprite.src = SpriteImg;

  const updateCanvasSize = useCallback(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenRatio = screenWidth / screenHeight;

    let gameWidth, gameHeight;

    const aspect = 16 / 9;

    if (screenRatio >= aspect) {
      // Screen is wider than the game aspect ratio
      gameHeight = screenHeight;
      gameWidth = gameHeight * aspect;
    } else {
      // Screen is narrower than the game aspect ratio
      gameWidth = screenWidth;
      gameHeight = gameWidth / aspect;
    }

    console.log(
      "UPDATE CANVAS SIZE: ",
      "screenWidth: ",
      screenWidth,
      "screenHeight: ",
      screenHeight,
      "screen aspect ratio: ",
      screenRatio,
      "gameWidth: ",
      gameWidth,
      "gameHeight: ",
      gameHeight,
      "game aspect ratio: ",
      aspect
    );

    setCanvasSize({
      height: gameHeight,
      width: gameWidth,
    });
  }, []);

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const scaleAndDrawAssets = () => {
    // Get canvas context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const ratio = window.devicePixelRatio;

    // Original dimensions from the canvas settings
    const originalWidth = gameState.canvas.settings.baseline.resolution.width;
    const originalHeight = gameState.canvas.settings.baseline.resolution.height;
    const originalAspectRatio = gameState.canvas.settings.baseline.aspectRatio;
    console.log(
      "scaleAndDrawAssets: ",
      "ORIGINAL WIDTH: ",
      originalWidth,
      "ORIGINAL HEIGHT: ",
      originalHeight,
      "ORIGINAL ASPECT RATIO: ",
      originalAspectRatio
    );

    // Current dimensions from the canvas element
    const currentWidth = canvas.width;
    const currentHeight = canvas.height;
    const screenRatio = currentWidth / currentHeight;
    console.log(
      "scaleAndDrawAssets: ",
      "CURRENT WIDTH: ",
      currentWidth,
      "CURRENT HEIGHT: ",
      currentHeight,
      "CURRENT ASPECT RATIO: ",
      currentWidth / currentHeight
    );

    // Calculate scale factors
    const scaleX = currentWidth / originalWidth;
    const scaleY = currentHeight / originalHeight;

    let gameWidth, gameHeight;

    if (screenRatio >= originalAspectRatio) {
      // Screen is wider than the game aspect ratio
      gameHeight = currentHeight;
      gameWidth = gameHeight * originalAspectRatio;
    } else {
      // Screen is narrower than the game aspect ratio
      gameWidth = currentWidth;
      gameHeight = gameWidth / originalAspectRatio;
    }

    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply scale to canvas context
    ctx.scale(scaleX, scaleY);
    console.log("scaleAndDrawAssets: ", "SCALE X: ", scaleX, "SCALE Y: ", scaleY);

    const backgroundImg = new Image();
    backgroundImg.src = gameState.canvas.settings.backgroundImg;

    // Ensure the image is loaded before drawing
    backgroundImg.onload = function () {
      // Draw the image on the canvas, fitting it to the canvas size
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    };
  };

  // Effect to draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Adjust canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    // Scale and redraw assets
    scaleAndDrawAssets(ctx);
  }, [canvasSize]); // Redraw when canvas size changes

  useEffect(() => {
    // Canvas properties
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.font = gameState.letters.settings.size + " " + gameState.letters.settings.font;
    ctx.fillStyle = gameState.letters.settings.color;

    scaleAndDrawAssets();

    const letterGenerationInterval = setInterval(() => {
      if (gameState.letters.instances.length >= gameState.letters.settings.maxInstances) return;
      if (Math.random() >= gameState.letters.settings.spawnChance) return;

      const newLetter = generateLetter(
        gameState.letters.settings.minTime,
        gameState.letters.settings.maxTime,
        canvasSize.height,
        canvasSize.width
      );

      gameState.letters.instances.push(newLetter);
    }, gameState.letters.settings.spawnInterval);

    // Animation properties
    let animationFrameId;

    // Game initialization logic here
    const initGame = () => {};

    // The game loop function
    const gameLoop = () => {
      ctx.fillText("Score: " + gameState.score, 15, 30);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
      ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

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
        const index = gameState.letters.instances.findIndex(
          (letter) => letter.code.toLowerCase() === e.key.toLowerCase()
        );

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

      {/* <div
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <img id="Sprite" src={SpriteImg} alt="Character" />
      </div> */}
    </>
  );
};

export default Game;
