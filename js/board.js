class Board {
  constructor(canvas, nextCanvas, holdCanvas) {
    this.canvas = canvas;
    this.nextCanvas = nextCanvas;
    this.holdCanvas = holdCanvas;
    this.ctx = canvas.getContext("2d");
    this.nextCtx = nextCanvas ? nextCanvas.getContext("2d") : null;
    this.holdCtx = holdCanvas ? holdCanvas.getContext("2d") : null;
    this.highScore = this.loadHighScore();
    this.preventCanvasZoom();
    this._processingLineClear = false;
    this.reset();
    this.updateCanvasSize();
    window.addEventListener("resize", () => {
      requestAnimationFrame(() => {
        this.updateCanvasSize();
      });
    });

    this.sounds = {
      background: new Audio("sounds/background.mp3"),
      lineClear: new Audio("sounds/line-clear.mp3"),
      move: new Audio("sounds/move.mp3"),
      rotate: new Audio("sounds/rotate.mp3"),
      drop: new Audio("sounds/drop.mp3"),
    };
    Object.values(this.sounds).forEach((sound) => {
      sound.load();
      sound.volume = 0.5;
    });
    const bgAudo = this.sounds.background;
    bgAudo.loop = true;
    bgAudo.volume = 0.3; 
    console.log("Game panel initialization completed");
  }

  preventCanvasZoom() {
    if (!this.canvas) return;
    const preventDefaultTouch = (e) => {
      e.preventDefault();
    };
    this.canvas.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 1) {
          e.preventDefault();
        }
      },
      { passive: false }
    );
    this.canvas.addEventListener("gesturestart", preventDefaultTouch, {
      passive: false,
    });
    this.canvas.addEventListener("gesturechange", preventDefaultTouch, {
      passive: false,
    });
    this.canvas.addEventListener("gestureend", preventDefaultTouch, {
      passive: false,
    });
	
    let lastTap = 0;
    this.canvas.addEventListener(
      "touchend",
      (e) => {
        const now = Date.now();
        if (now - lastTap < 300) {
          e.preventDefault();
          e.stopPropagation();
        }
        lastTap = now;
      },
      { passive: false }
    );
  }

  updateCanvasSize() {
    const cellSize = getCellSize();
    const idealWidth = GAME_CONFIG.COLS * cellSize;
    const idealHeight = GAME_CONFIG.ROWS * cellSize;
    this.canvas.width = idealWidth;
    this.canvas.height = idealHeight;
    if (this.canvas.parentElement) {
      const isMobile = window.innerWidth <= 480;
      if (isMobile) {
        this.canvas.parentElement.style.width = `${idealWidth}px`;
        this.canvas.parentElement.style.height = `${idealHeight}px`;
        this.actualCellSize = cellSize;
      } else {
        this.canvas.parentElement.style.width = "";
        this.canvas.parentElement.style.height = "";
        this.actualCellSize = cellSize;
      }
    }
    const previewCellSize = getPreviewCellSize();
    const previewSize = 5 * previewCellSize;
    this.nextCanvas.width = previewSize;
    this.nextCanvas.height = previewSize;
    if (this.holdCanvas && this.holdCtx) {
      this.holdCanvas.width = previewSize;
      this.holdCanvas.height = previewSize;
    }
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = "#333";
    if (this.grid) {
      this.draw();
    }
  }

  cleanup() {
    if (this._pauseClickHandler) {
      this.canvas.removeEventListener("click", this._pauseClickHandler);
      this._pauseClickHandler = null;
    }
    if (this._pauseTouchHandler) {
      this.canvas.removeEventListener("touchend", this._pauseTouchHandler);
      this._pauseTouchHandler = null;
    }
    if (this._startClickHandler) {
      this.canvas.removeEventListener("click", this._startClickHandler);
      this._startClickHandler = null;
    }
    if (this._startTouchHandler) {
      this.canvas.removeEventListener("touchend", this._startTouchHandler);
      this._startTouchHandler = null;
    }
    if (this._mouseMoveHandler) {
      this.canvas.removeEventListener("mousemove", this._mouseMoveHandler);
      this._mouseMoveHandler = null;
    }
  }

  reset() {
    this.cleanup();
    this.grid = create2DArray(GAME_CONFIG.ROWS, GAME_CONFIG.COLS, null);
    this.score = 0;
    this.lines = 0;
    this.level = 1;
    const { interval, multiplier } = calculateDropSpeed(this.level);
    this.interval = interval;
    this.speed = multiplier;
    this.gameStartTime = 0;
    this.gameTime = 0;
    this.isTimerRunning = false;
    this.timerInterval = null;
    this.piecePool = [];
    this.currentPiece = null;
    this.nextPiece = new Tetromino(getRandomPiece(this.grid));
    this.heldPiece = null;
    this.canHold = true;
    this.isGameOver = false;
    this.isPaused = false;
    this._processingLineClear = false;
    const gameOverModal = document.getElementById("gameOverModal");
    if (gameOverModal) {
      gameOverModal.style.display = "none";
    }

    this.updateScoreDisplay();
    this.updateHighScoreDisplay();
    this.draw();
  }

  spawnNewPiece() {
    if (this._processingLineClear) {
      console.log("Processing row elimination, no new blocks will be generated yet");
      return;
    }
    if (!this.nextPiece) {
      this.nextPiece = new Tetromino(getRandomPiece(this.grid));
    }
    this.currentPiece = this.nextPiece;
    const shape = this.currentPiece.shape;
    const x = Math.floor((GAME_CONFIG.COLS - shape[0].length) / 2);
    const y = -shape.length + 1;

    this.currentPiece.x = x;
    this.currentPiece.y = y;
    this.nextPiece = new Tetromino(getRandomPiece(this.grid));
    if (
      !isValidMove(this.grid, this.currentPiece.shape, x, y) ||
      !isValidMove(this.grid, this.currentPiece.shape, x, y + 1)
    ) {
      console.log("Game over: No new blocks can be placed or blocks cannot fall");
      window.game.gameOver();
      return;
    }
    this.canHold = true;
  }

  holdPiece() {
    try {
      if (!this.currentPiece || this.isGameOver || this.isPaused) {
        console.log("Cannot hold piece: invalid game state");
        return;
      }
      if (!this.canHold) {
        console.log("Cannot hold piece: hold is not available");
        return;
      }
      const temp = this.currentPiece;
      if (this.heldPiece === null) {
        this.heldPiece = new Tetromino(temp.type);
        this.spawnNewPiece();
      } else {
        const newPiece = new Tetromino(this.heldPiece.type);
        this.heldPiece = new Tetromino(temp.type);
        newPiece.x = Math.floor(
          (GAME_CONFIG.COLS - newPiece.shape[0].length) / 2
        );
        newPiece.y = 0;
        if (isValidMove(this.grid, newPiece.shape, newPiece.x, newPiece.y)) {
          this.currentPiece = newPiece;
        } else {
          this.heldPiece = new Tetromino(newPiece.type);
          console.log("Cannot hold piece: invalid position for held piece");
          return;
        }
      }
      this.canHold = false;
      this.draw();
    } catch (error) {
      console.error("Error in holdPiece:", error);
    }
  }

  movePiece(dx, dy, isAutoMove = false) {
    return new Promise((resolve) => {
      if (this.isGameOver || this.isPaused || !this.currentPiece) {
        resolve(false);
        return;
      }

      const newX = this.currentPiece.x + dx;
      const newY = this.currentPiece.y + dy;

      if (isValidMove(this.grid, this.currentPiece.shape, newX, newY)) {
        if (!isAutoMove && ((dx !== 0 && dy === 0) || (dx === 0 && dy > 0))) {
          this.playSound("move");
        }

        this.currentPiece.move(dx, dy);
        this.draw();
        resolve(true);
        return;
      }

      if (dy > 0) {
        const pieceInfo = {
          x: this.currentPiece.x,
          y: this.currentPiece.y,
          shape: JSON.parse(JSON.stringify(this.currentPiece.shape)),
          type: this.currentPiece.type,
        };
        this.placePiece();
        resolve(false);
        return;
      }

      resolve(false);
    });
  }
  
  rotatePiece() {
    return new Promise((resolve) => {
      if (this.isGameOver || this.isPaused || !this.currentPiece) {
        resolve(false);
        return;
      }
      const newShape = this.currentPiece.rotate();
      if (this.currentPiece.tryWallKick(this.grid, newShape)) {
        this.playSound("rotate");
        this.draw();
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }
  async hardDrop() {
    if (this.isGameOver || this.isPaused || !this.currentPiece) return;

    console.log("Perform a hard drop");
    let dropDistance = 0;
    const originalY = this.currentPiece.y;
    while (
      isValidMove(
        this.grid,
        this.currentPiece.shape,
        this.currentPiece.x,
        this.currentPiece.y + 1
      )
    ) {
      this.currentPiece.y++;
      dropDistance++;
    }

    if (dropDistance > 0) {
      this.playSound("drop");
      const pieceInfo = {
        x: this.currentPiece.x,
        y: this.currentPiece.y,
        shape: JSON.parse(JSON.stringify(this.currentPiece.shape)),
        type: this.currentPiece.type,
      };
      this.placePiece();
      await this.playLandingAnimation(pieceInfo);
    }
  }
  playLandingDustEffect(pieceInfo, dropDistance) {
    const duration = 800;
    const startTime = performance.now();
    const gasParticles = [];
    pieceInfo.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value) {
          const blockX = pieceInfo.x + dx;
          const blockY = pieceInfo.y + dy;
          const isBottom =
            blockY + 1 >= GAME_CONFIG.ROWS ||
            (this.grid[blockY + 1] && this.grid[blockY + 1][blockX] !== null);
          if (isBottom) {
            const particleCount = Math.min(2 + Math.floor(dropDistance / 5), 4);
            for (let i = 0; i < particleCount; i++) {
              const x = (blockX + 0.5) * this.actualCellSize;
              const y = (blockY + 1) * this.actualCellSize - 2; 
              const grayValue = 230 + Math.floor(Math.random() * 25);
              const color = `rgba(${grayValue}, ${grayValue}, ${grayValue}, 0.4)`;
              gasParticles.push({
                x: x + (Math.random() - 0.5) * this.actualCellSize * 0.5, 
                y: y,
                vx: (Math.random() - 0.5) * 0.5, 
                vy: -0.5 - Math.random() * 0.5,
                size: 4 + Math.random() * (2 + dropDistance * 0.1), 
                maxSize: 8 + Math.random() * (3 + dropDistance * 0.1),
                growSpeed: 0.05 + Math.random() * 0.05,
                color: color,
                opacity: 0.3 + Math.random() * 0.2,
                fadeSpeed: 0.003 + Math.random() * 0.002,
                wobble: {
                  amplitude: 0.2 + Math.random() * 0.3,
                  frequency: 0.01 + Math.random() * 0.01,
                  offset: Math.random() * Math.PI * 2,
                },
              });
            }
          }
        }
      });
    });
    if (gasParticles.length === 0) return;
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      if (progress >= 1 || gasParticles.length === 0) return;
      for (let i = gasParticles.length - 1; i >= 0; i--) {
        const p = gasParticles[i];
        p.x +=
          p.vx +
          Math.sin(elapsed * p.wobble.frequency + p.wobble.offset) *
            p.wobble.amplitude;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.995;
        if (p.size < p.maxSize) {
          p.size += p.growSpeed;
          if (p.size > p.maxSize) p.size = p.maxSize;
        }
        p.opacity -= p.fadeSpeed;
        if (p.opacity <= 0) {
          gasParticles.splice(i, 1);
          continue;
        }
        this.ctx.save();
        this.ctx.globalAlpha = p.opacity;
        const gradient = this.ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
      }

      if (gasParticles.length > 0) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  async playLandingAnimation(pieceInfo) {
    return new Promise((resolve) => {
      const duration = 400;
      const startTime = performance.now();
      const easeOutElastic = (t) => {
        const p = 0.3;
        return (
          Math.pow(2, -10 * t) * Math.sin(((t - p / 4) * (2 * Math.PI)) / p) + 1
        );
      };

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const animProgress = easeOutElastic(progress);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
          for (let x = 0; x < GAME_CONFIG.COLS; x++) {
            let skipCell = false;
            if (pieceInfo) {
              for (let py = 0; py < pieceInfo.shape.length; py++) {
                for (let px = 0; px < pieceInfo.shape[py].length; px++) {
                  if (
                    pieceInfo.shape[py][px] &&
                    pieceInfo.x + px === x &&
                    pieceInfo.y + py === y
                  ) {
                    skipCell = true;
                    break;
                  }
                }
                if (skipCell) break;
              }
            }

            if (!skipCell && this.grid[y] && this.grid[y][x]) {
              drawBlock(this.ctx, x, y, this.grid[y][x], this.actualCellSize);
            }
          }
        }
		
        if (pieceInfo) {
          for (let py = 0; py < pieceInfo.shape.length; py++) {
            for (let px = 0; px < pieceInfo.shape[py].length; px++) {
              if (pieceInfo.shape[py][px]) {
                const x = pieceInfo.x + px;
                const y = pieceInfo.y + py;
                const deformation = Math.sin(animProgress * Math.PI) * 0.4;
                const scaleX = 1 + deformation * 0.4; 
                const scaleY = 1 - deformation * 0.8;
                this.ctx.save();
                const cellSize = this.actualCellSize;
                const centerX = x * cellSize + cellSize / 2;
                const centerY = y * cellSize + cellSize / 2;
                this.ctx.translate(centerX, centerY);
                this.ctx.scale(scaleX, scaleY);
                this.ctx.translate(-centerX, -centerY);
                drawBlock(this.ctx, x, y, pieceInfo.type, this.actualCellSize);

                this.ctx.restore();
              }
            }
          }
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  placePiece() {
    if (!this.currentPiece) return;
    console.log("Fixing blocks to the grid");
    const { shape, x, y, type } = this.currentPiece;
    shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        if (value) {
          const gridY = y + dy;
          const gridX = x + dx;
          if (
            gridY >= 0 &&
            gridY < GAME_CONFIG.ROWS &&
            gridX >= 0 &&
            gridX < GAME_CONFIG.COLS
          ) {
            this.grid[gridY][gridX] = type;
            console.log(`Setting up the grid[${gridY}][${gridX}] = ${type}`);
          }
        }
      });
    });

    console.log("Current grid status:");
    for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
      if (this.grid[y].some((cell) => cell !== null)) {
        console.log(`OK ${y}:`, this.grid[y]);
      }
    }
    this.currentPiece = null;
    this.draw();
    if (this._processingLineClear) {
      console.log("Already processing row elimination, skipping duplicate calls");
      return;
    }
    this.clearLines();
  }

  async clearLines() {
    const fullRows = [];
    for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
      if (this.grid[y] && this.grid[y].every((cell) => cell !== null)) {
        fullRows.push(y);
        console.log(`Find the complete line: ${y}, content:`, this.grid[y]);
      }
    }

    if (fullRows.length === 0) {
      console.log("No complete row, generate new blocks");
      this.spawnNewPiece();
      return;
    }

    console.log(`Turn Up ${fullRows.length} Rows need to be eliminated:`, fullRows);

    try {
      this._processingLineClear = true;
      this.playSound("lineClear");
      await this.playLineClearAnimation(fullRows);
      console.log("The elimination animation is complete, and the actual elimination of rows begins and the falling animation plays");
      const oldGrid = [];
      for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
        oldGrid[y] = [...this.grid[y]];
      }

      const tempGrid = Array(GAME_CONFIG.ROWS)
        .fill()
        .map(() => Array(GAME_CONFIG.COLS).fill(null));

      let targetRow = GAME_CONFIG.ROWS - 1;
      for (let sourceRow = GAME_CONFIG.ROWS - 1; sourceRow >= 0; sourceRow--) {
        if (fullRows.includes(sourceRow)) {
          console.log(`Skip Elimination Rows: ${sourceRow}`);
          continue;
        }

        for (let x = 0; x < GAME_CONFIG.COLS; x++) {
          tempGrid[targetRow][x] = this.grid[sourceRow][x];
        }

        console.log(`The original line ${sourceRow} Move to a new line ${targetRow}`);
        targetRow--;
      }

      this.playBlocksFallingAnimation(oldGrid, tempGrid, fullRows);
      this.grid = tempGrid;
      console.log("The grid state after elimination:");
      for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
        if (this.grid[y].some((cell) => cell !== null)) {
          console.log(`OK ${y}:`, this.grid[y]);
        }
      }

      if (fullRows.length > 0) {
        let scoreToAdd = fullRows.length * 10;
        if (fullRows.length == 4) {
          scoreToAdd = 60;
        } else if (fullRows.length == 3) {
          scoreToAdd = 50;
        } else if (fullRows.length == 2) {
          scoreToAdd = 30;
        } else if (fullRows.length == 1) {
          scoreToAdd = 10;
        }

        scoreToAdd = scoreToAdd * this.level;
        this.score += scoreToAdd;
        this.lines += fullRows.length;
        this.level = Math.max(1, Math.floor(this.lines / 10) + 1);
        const { interval, multiplier } = calculateDropSpeed(this.level);
        this.interval = interval;
        this.speed = multiplier;
        const canvasRect = this.canvas.getBoundingClientRect();
        const x = canvasRect.left + this.canvas.width / 2;
        const y = canvasRect.top + this.canvas.height * 0.25;
        this.showScoreAnimation(scoreToAdd, x, y);
        this.updateScoreDisplay();
        window.game.recalculateDropTime();
      }

      this.draw();
      this._processingLineClear = false;
      if (!this.isPaused) {
        console.log("The game is not paused, new blocks are generated");
        this.spawnNewPiece();
      } else {
        console.log("The game is paused and no new blocks are generated.");
      }
    } catch (error) {
      console.error("Error during row elimination:", error);
      this._processingLineClear = false;
      if (!this.isPaused) {
        this.spawnNewPiece();
      }
    }
  }

  async playLineClearAnimation(rows) {
    console.log("Start playing the row elimination animation", rows);
    return new Promise((resolve) => {
      const duration = 800;
      const startTime = performance.now();
      const originalGrid = this.grid.map((row) => [...row]);
      const fragments = [];
      const easeInOutQuart = (t) => {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
      };

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const animProgress = easeInOutQuart(progress);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
        for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
          if (rows.includes(y)) continue;

          for (let x = 0; x < GAME_CONFIG.COLS; x++) {
            if (originalGrid[y] && originalGrid[y][x]) {
              drawBlock(
                this.ctx,
                x,
                y,
                originalGrid[y][x],
                this.actualCellSize
              );
            }
          }
        }

        if (progress < 0.2) {
          const flashIntensity = 1 - progress / 0.2; 

          rows.forEach((rowIndex) => {
            const cellSize = this.actualCellSize;
            const y = rowIndex * cellSize;
            const glow = this.ctx.createLinearGradient(
              0,
              y,
              this.canvas.width,
              y + cellSize
            );
            glow.addColorStop(0, `rgba(255, 255, 255, 0)`);
            glow.addColorStop(0.5, `rgba(255, 255, 255, ${flashIntensity})`);
            glow.addColorStop(1, `rgba(255, 255, 255, 0)`);
            this.ctx.fillStyle = glow;
            this.ctx.fillRect(0, y, this.canvas.width, cellSize);
            if (Math.sin(progress * 50) > 0) {
              for (let x = 0; x < GAME_CONFIG.COLS; x++) {
                if (originalGrid[rowIndex] && originalGrid[rowIndex][x]) {
                  drawBlock(
                    this.ctx,
                    x,
                    rowIndex,
                    originalGrid[rowIndex][x],
                    this.actualCellSize
                  );
                }
              }
            }
          });
        }

        if (progress >= 0.2) {
          const disappearProgress = (progress - 0.2) / 0.8; 
          rows.forEach((rowIndex) => {
            for (let x = 0; x < GAME_CONFIG.COLS; x++) {
              if (originalGrid[rowIndex] && originalGrid[rowIndex][x]) {
                const blockDisappearPoint = (x / GAME_CONFIG.COLS) * 0.7;
                if (disappearProgress < blockDisappearPoint) {
                  drawBlock(
                    this.ctx,
                    x,
                    rowIndex,
                    originalGrid[rowIndex][x],
                    this.actualCellSize
                  );
                }
                else if (
                  disappearProgress < blockDisappearPoint + 0.1 &&
                  fragments.filter(
                    (f) => f.originX === x && f.originY === rowIndex
                  ).length === 0
                ) {
                  this.createBlockFragments(
                    x,
                    rowIndex,
                    originalGrid[rowIndex][x],
                    fragments
                  );
                }
              }
            }
          });

          this.updateAndDrawFragments(fragments, disappearProgress);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log("Row elimination animation completed");
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  createBlockFragments(x, y, blockType, fragments) {
    const colors = GAME_CONFIG.COLORS[blockType];
    const cellSize = this.actualCellSize;
    const centerX = x * cellSize + cellSize / 2;
    const centerY = y * cellSize + cellSize / 2;
    const fragmentCount = 8 + Math.floor(Math.random() * 5);

    for (let i = 0; i < fragmentCount; i++) {
      const fragmentType = Math.floor(Math.random() * 3);
      const size = cellSize * (0.1 + Math.random() * 0.2);
      const offsetX = (Math.random() - 0.5) * cellSize * 0.8;
      const offsetY = (Math.random() - 0.5) * cellSize * 0.8;
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3; 
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 1; 
      const rotationSpeed = (Math.random() - 0.5) * 0.3;
      const color = Math.random() > 0.5 ? colors.primary : colors.secondary;
      fragments.push({
        x: centerX + offsetX,
        y: centerY + offsetY,
        vx: vx,
        vy: vy,
        size: size,
        originalSize: size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: rotationSpeed,
        color: color,
        opacity: 0.9,
        type: fragmentType,
        gravity: 0.15 + Math.random() * 0.05,
        friction: 0.98,
        bounce: 0.3 + Math.random() * 0.2,
        originX: x,
        originY: y,
        lifespan: 0.5 + Math.random() * 0.5, 
      });
    }
  }

  updateAndDrawFragments(fragments, progress) {
    for (let i = fragments.length - 1; i >= 0; i--) {
      const fragment = fragments[i];
      fragment.x += fragment.vx;
      fragment.y += fragment.vy;
      fragment.vy += fragment.gravity;
      fragment.vx *= fragment.friction;
      fragment.vy *= fragment.friction;

      if (fragment.y > this.canvas.height && fragment.vy > 0) {
        fragment.vy = -fragment.vy * fragment.bounce;
        fragment.y = this.canvas.height;
      }

      if (fragment.x < 0 && fragment.vx < 0) {
        fragment.vx = -fragment.vx * fragment.bounce;
        fragment.x = 0;
      } else if (fragment.x > this.canvas.width && fragment.vx > 0) {
        fragment.vx = -fragment.vx * fragment.bounce;
        fragment.x = this.canvas.width;
      }

      fragment.rotation += fragment.rotationSpeed;
      fragment.lifespan -= 0.01;
      fragment.opacity = fragment.lifespan;
      fragment.size = fragment.originalSize * fragment.lifespan;
	  
      if (fragment.lifespan <= 0) {
        fragments.splice(i, 1);
        continue;
      }
      this.ctx.save();
      this.ctx.globalAlpha = fragment.opacity;
      this.ctx.translate(fragment.x, fragment.y);
      this.ctx.rotate(fragment.rotation);
      this.ctx.fillStyle = fragment.color;
      this.ctx.shadowColor = fragment.color;
      this.ctx.shadowBlur = 5 * fragment.opacity;

      switch (fragment.type) {
        case 0:
          this.ctx.fillRect(
            -fragment.size / 2,
            -fragment.size / 2,
            fragment.size,
            fragment.size
          );
          break;

        case 1: 
          this.ctx.beginPath();
          this.ctx.moveTo(0, -fragment.size / 2);
          this.ctx.lineTo(fragment.size / 2, fragment.size / 2);
          this.ctx.lineTo(-fragment.size / 2, fragment.size / 2);
          this.ctx.closePath();
          this.ctx.fill();
          break;

        case 2: 
          this.ctx.beginPath();
          this.ctx.arc(0, 0, fragment.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
          break;
      }

      this.ctx.restore();
    }
  }

  playBlocksFallingAnimation(oldGrid, newGrid, clearedRows) {
    return new Promise((resolve) => {
      const duration = 500;
      const startTime = performance.now();
      const easeOutBounce = (t) => {
        const n1 = 7.5625;
        const d1 = 2.75;

        if (t < 1 / d1) {
          return n1 * t * t;
        } else if (t < 2 / d1) {
          return n1 * (t -= 1.5 / d1) * t + 0.75;
        } else if (t < 2.5 / d1) {
          return n1 * (t -= 2.25 / d1) * t + 0.9375;
        } else {
          return n1 * (t -= 2.625 / d1) * t + 0.984375;
        }
      };

      const blockMoves = [];

      for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
        if (clearedRows.includes(y)) continue;

        for (let x = 0; x < GAME_CONFIG.COLS; x++) {
          const block = oldGrid[y][x];
          if (block !== null) {
            const rowsBelow = clearedRows.filter((row) => row > y).length;
            if (rowsBelow > 0) {
              const newY = y + rowsBelow;
              blockMoves.push({
                x: x,
                startY: y,
                endY: newY,
                block: block,
              });
            }
          }
        }
      }

      console.log(`The number of blocks to animate: ${blockMoves.length}`);
      if (blockMoves.length === 0) {
        resolve();
        return;
      }

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutBounce(progress);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();

        for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
          for (let x = 0; x < GAME_CONFIG.COLS; x++) {
            const movingBlock = blockMoves.find(
              (move) => move.x === x && move.startY === y
            );

            if (movingBlock) {
              const startY = movingBlock.startY;
              const endY = movingBlock.endY;
              const currentY = startY + (endY - startY) * easedProgress;
              drawBlock(
                this.ctx,
                x,
                currentY,
                movingBlock.block,
                this.actualCellSize
              );
            } else {
              if (!clearedRows.includes(y) && oldGrid[y][x] !== null) {
                drawBlock(this.ctx, x, y, oldGrid[y][x], this.actualCellSize);
              }
            }
          }
        }

        this.drawUI();
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          console.log("Falling animation completed");
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  adjustBrightness(color, factor) {
    let r = 128,
      g = 128,
      b = 128; 

    try {
      const rgbMatch = color.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        r = parseInt(rgbMatch[0], 10);
        g = parseInt(rgbMatch[1], 10);
        b = parseInt(rgbMatch[2], 10);
      }

      r = Math.min(255, Math.floor(r * factor));
      g = Math.min(255, Math.floor(g * factor));
      b = Math.min(255, Math.floor(b * factor));
    } catch (error) {
      console.error("Color adjustment error:", error);
    }

    return `rgb(${r}, ${g}, ${b})`;
  }


  drawUI() {
  }

  draw() {
    try {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.nextCtx.clearRect(
        0,
        0,
        this.nextCanvas.width,
        this.nextCanvas.height
      );
      if (this.holdCtx) {
        this.holdCtx.clearRect(
          0,
          0,
          this.holdCanvas.width,
          this.holdCanvas.height
        );
      }

      if (!this.grid) return;
      this.drawGrid();
      if (
        !this.currentPiece &&
        !this.isGameOver &&
        !this._processingLineClear
      ) {
        console.log("Direct display mode selection interface");
        this.drawModeSelection();
        return;
      }

      for (let y = 0; y < GAME_CONFIG.ROWS; y++) {
        for (let x = 0; x < GAME_CONFIG.COLS; x++) {
          if (this.grid[y] && this.grid[y][x]) {
            drawBlock(this.ctx, x, y, this.grid[y][x], this.actualCellSize);
          }
        }
      }

      if (this.currentPiece && !this.isGameOver && !this.isPaused) {
        try {
          const ghost = this.currentPiece.getGhost(this.grid);
          if (ghost && ghost.shape) {
            ghost.draw(this.ctx, true); 
          }
        } catch (error) {
          console.error("Error drawing ghost piece:", error);
        }
      }

      if (this.currentPiece && this.currentPiece.shape) {
        this.currentPiece.draw(this.ctx);
      }

      if (this.nextPiece && this.nextPiece.shape) {
        this.nextPiece.drawPreview(this.nextCtx);
      }

      if (this.holdCtx && this.heldPiece && this.heldPiece.shape) {
        this.heldPiece.drawPreview(this.holdCtx);
      }

      if (this.isPaused) {
        this.drawPauseScreen();
      }
    } catch (error) {
      console.error("Error in draw method:", error);
    }
  }

  drawGrid() {
    const cellSize = this.actualCellSize || getCellSize();
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    this.ctx.lineWidth = 1;

    for (let x = 0; x <= GAME_CONFIG.COLS; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * cellSize, 0);
      this.ctx.lineTo(x * cellSize, height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= GAME_CONFIG.ROWS; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * cellSize);
      this.ctx.lineTo(width, y * cellSize);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"; 
    this.ctx.lineWidth = 2;
    const cornerSize = 10; 
    this.ctx.beginPath();
    this.ctx.moveTo(0, cornerSize);
    this.ctx.lineTo(0, 0);
    this.ctx.lineTo(cornerSize, 0);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(width - cornerSize, 0);
    this.ctx.lineTo(width, 0);
    this.ctx.lineTo(width, cornerSize);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(0, height - cornerSize);
    this.ctx.lineTo(0, height);
    this.ctx.lineTo(cornerSize, height);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(width - cornerSize, height);
    this.ctx.lineTo(width, height);
    this.ctx.lineTo(width, height - cornerSize);
    this.ctx.stroke();
  }

  drawGameOver() {
    this.isGameOver = true;
    this.stopTimer();
    this.saveHighScore(this.score);
    const finalScoreElement = document.getElementById("finalScore");
    const finalHighScoreElement = document.getElementById("finalHighScore");
    const finalTimeElement = document.getElementById("finalTime");
    const gameOverTitleElement = document.getElementById("gameOverTitle");

    if (finalScoreElement) {
      finalScoreElement.textContent = this.score;
    }

    if (finalHighScoreElement) {
      finalHighScoreElement.textContent = this.highScore;
    }

    if (finalTimeElement) {
      if (this.isTimedMode) {
        finalTimeElement.textContent = this.formatTime(
          this.timedModeSeconds * 1000
        );
      } else {
        finalTimeElement.textContent = this.formatTime(this.gameTime);
      }
    }

    if (gameOverTitleElement) {
      if (this.isTimedMode && this.remainingTime <= 0) {
        gameOverTitleElement.textContent = "Time's Up!";
        gameOverTitleElement.style.color = "#ff3838";
      } else {
        gameOverTitleElement.textContent = "Game Over";
        gameOverTitleElement.style.color = "";
      }
    }

    const gameOverModal = document.getElementById("gameOverModal");
    if (gameOverModal) {
      gameOverModal.style.display = "block";
    }
  }

  drawPauseScreen() {
    if (!this.isPaused) return;
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      ("Game Paused"),
      this.canvas.width / 2,
      this.canvas.height / 3
    );
    const btnWidth = 160;
    const btnHeight = 50;
    const btnX = (this.canvas.width - btnWidth) / 2;
    const btnY = this.canvas.height / 2;
    const btnRadius = 25;
    ctx.fillStyle = "#00a603";
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnWidth, btnHeight, btnRadius);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "bold 20px Arial";

    ctx.fillText(
      ("Continue"),
      this.canvas.width / 2,
      btnY + btnHeight / 2
    );

    const restartBtnY = btnY + btnHeight + 20;
    ctx.fillStyle = "#E81C25";
    ctx.beginPath();
    ctx.roundRect(btnX, restartBtnY, btnWidth, btnHeight, btnRadius);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(
      ("Restart"),
      this.canvas.width / 2,
      restartBtnY + btnHeight / 2
    );

    ctx.restore();
    if (this._pauseClickHandler) {
      this.canvas.removeEventListener("click", this._pauseClickHandler);
      this._pauseClickHandler = null;
    }

    if (this._startClickHandler) {
      console.log("Remove the click event listener for starting the game");
      this.canvas.removeEventListener("click", this._startClickHandler);
      this._startClickHandler = null;
    }

    if (this._mouseMoveHandler) {
      console.log("Remove the mouse move event listener");
      this.canvas.removeEventListener("mousemove", this._mouseMoveHandler);
      this._mouseMoveHandler = null;
    }

    this._pauseClickHandler = (e) => {
      if (window.game && window.game.isRunning && !window.game.isPaused) {
        console.log("The game is running, ignoring touch events");
        return;
      }

      console.log("Trigger the pause interface click event handler");
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      console.log(
        "Click Location:",
        x,
        y,
        "Button Location:",
        btnX,
        btnY,
        btnWidth,
        btnHeight
      );

      if (
        x >= btnX &&
        x <= btnX + btnWidth &&
        y >= btnY &&
        y <= btnY + btnHeight
      ) {
        console.log("Clicked the Continue Game button");

        if (window.game && typeof window.game.resumeGame === "function") {
          console.log("Callwindow.game.resumeGame()");
          window.game.resumeGame();
          return;
        }

        console.log("Restoring the game using an alternative method");
        this.isPaused = false;
        this.playSound("background");
        this.draw();
      }

      if (
        x >= btnX &&
        x <= btnX + btnWidth &&
        y >= restartBtnY &&
        y <= restartBtnY + btnHeight
      ) {
        console.log("Clicked the Restart button");

        if (window.game && typeof window.game.restartGame === "function") {
          console.log("Callwindow.game.restartGame()");
          window.game.restartGame();
        }
      }

      


    };

    this.canvas.addEventListener("click", this._pauseClickHandler);

    if (this._pauseTouchHandler) {
      this.canvas.removeEventListener("touchend", this._pauseTouchHandler);
      this._pauseTouchHandler = null;
    }

    if (this._startTouchHandler) {
      console.log("Remove the touch event listener that starts the game");
      this.canvas.removeEventListener("touchend", this._startTouchHandler);
      this._startTouchHandler = null;
    }

    this._pauseTouchHandler = (e) => {
      e.preventDefault();
      if (window.game && window.game.isRunning && !window.game.isPaused) {
        console.log("The game is running, ignoring touch events");
        return;
      }

      if (e.changedTouches.length === 0) return;

      const rect = this.canvas.getBoundingClientRect();
      const touch = e.changedTouches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      console.log("Pause interface touch end at position:", x, y);
      if (
        x >= btnX &&
        x <= btnX + btnWidth &&
        y >= btnY &&
        y <= btnY + btnHeight
      ) {
        console.log("Touched the Continue Game button");

        if (window.game && typeof window.game.resumeGame === "function") {
          console.log("Callwindow.game.resumeGame()");
          window.game.resumeGame();
          return;
        }
        console.log("Restoring the game using an alternative method");
        this.isPaused = false;
        this.playSound("background");
        this.draw();
      }

      if (
        x >= btnX &&
        x <= btnX + btnWidth &&
        y >= restartBtnY &&
        y <= restartBtnY + btnHeight
      ) {
        console.log("Touched the Restart button");

        if (window.game && typeof window.game.restartGame === "function") {
          console.log("Callwindow.game.restartGame()");
          window.game.restartGame();
        }
      }
    };

    this.canvas.addEventListener("touchend", this._pauseTouchHandler, {
      passive: false,
    });

    console.log("Pause interface drawing completed");
  }

  _triggerStartGame() {
    if (this._mouseMoveHandler) {
      this.canvas.removeEventListener("mousemove", this._mouseMoveHandler);
      this._mouseMoveHandler = null;
    }
    if (this._startClickHandler) {
      this.canvas.removeEventListener("click", this._startClickHandler);
      this._startClickHandler = null;
    }
    if (this._startTouchHandler) {
      this.canvas.removeEventListener("touchend", this._startTouchHandler);
      this._startTouchHandler = null;
    }

    this.canvas.style.cursor = "default";
    console.log("Trigger the game start");
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
      console.log("Find the start button and simulate clicking it");
      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      startBtn.dispatchEvent(clickEvent);
      console.log("Click event dispatched");
	  
      if (window.game && typeof window.game.startGame === "function") {
        console.log("Directly call the game start method");
        window.game.startGame();
      }
    } else {
      console.error("Start button not found");
      if (window.game && typeof window.game.startGame === "function") {
        console.log("Directly call the game start method");
        window.game.startGame();
      }
    }
  }

  _isMouseOverButton(btnX, btnY, btnWidth, btnHeight, mouseX, mouseY) {
    if (typeof mouseX !== "number" || typeof mouseY !== "number") {
      return false;
    }

    return (
      mouseX >= btnX &&
      mouseX <= btnX + btnWidth &&
      mouseY >= btnY &&
      mouseY <= btnY + btnHeight
    );
  }

  updateScoreDisplay() {
    const scoreElement = document.getElementById("score");
    if (scoreElement) {
      if (!scoreElement.classList.contains("score-roll")) {
        scoreElement.classList.add("score-roll");
      }

      const oldScore = scoreElement.textContent;
      const newScore = formatNumber(this.score);
      if (oldScore === newScore) {
        return;
      }
      const oldScoreElement = document.createElement("div");
      oldScoreElement.className = "score-roll-item score-roll-old";
      oldScoreElement.textContent = oldScore;
      const newScoreElement = document.createElement("div");
      newScoreElement.className = "score-roll-item";
      newScoreElement.textContent = newScore;
      scoreElement.innerHTML = "";
      scoreElement.appendChild(oldScoreElement);
      scoreElement.appendChild(newScoreElement);
      setTimeout(() => {
        scoreElement.innerHTML = newScore;
      }, 500);
    }
    const levelElement = document.getElementById("level");
    if (levelElement) {
      levelElement.textContent = this.level;
    }

    const speedElement = document.getElementById("speed");
    if (speedElement) {
      speedElement.textContent = `${this.speed}x`;
    }
    this.updateTimeDisplay();
  }

  playSound(soundName) {
    if (this.sounds && this.sounds[soundName]) {
      console.log("Play sound effects:", soundName);

      try {
        const sound = this.sounds[soundName];
        if (soundName === "background") {
          if (localStorage.getItem("tetris_music") == "false") {
            return;
          }
          sound.volume = 0.5;
          sound.loop = true;
        } else {
          if (localStorage.getItem("tetris_sound") == "false") {
            return;
          }
          sound.volume = 0.7;
        }
        sound.play().catch((error) => {
          console.warn(`Unable to play sound effects ${soundName}:`, error);
        });
      } catch (error) {
        console.error(`Play sound effects ${soundName} Error:`, error);
      }
    } else {
      console.warn(`Sound ${soundName} Does not exist`);
    }
  }

  stopAllSounds() {
    if (this.sounds) {
      Object.keys(this.sounds).forEach((soundName) => {
        this.stopSound(soundName);
      });
    }
  }

  stopSound(soundName) {
    if (this.sounds && this.sounds[soundName]) {
      try {
        this.sounds[soundName].pause();
        this.sounds[soundName].currentTime = 0;
        if (soundName === "background") {
          this.sounds[soundName].loop = false;
          setTimeout(() => {
            if (this.sounds && this.sounds[soundName]) {
              this.sounds[soundName].loop = true;
            }
          }, 100);
        }
      } catch (error) {
        console.error(`Stop sound effect ${soundName} Error:`, error);
      }
    } else {
      console.warn(`Sound ${soundName} Does not exist`);
    }
  }

  stopBackgroundSound() {
    this.stopSound("background");
  }

  startTimer() {
    if (this.isTimerRunning) return;
    if (this.isTimedMode) {
      this.gameStartTime = Date.now();
      this.remainingTime = this.timedModeSeconds * 1000; 
    } else {
      this.gameStartTime = Date.now() - this.gameTime;
    }

    this.isTimerRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.isTimerRunning) {
        if (this.isTimedMode) {
          const elapsedTime = Date.now() - this.gameStartTime;
          this.remainingTime = Math.max(
            0,
            this.timedModeSeconds * 1000 - elapsedTime
          );

          if (this.remainingTime <= 0) {
            window.game.gameOver();

            console.log("Limited Time Mode Time Out，Game Over");
          }
        } else {
          this.gameTime = Date.now() - this.gameStartTime;
        }
        this.updateTimeDisplay();
      }
    }, 1000);
  }

  pauseTimer() {
    if (!this.isTimerRunning) return;

    this.isTimerRunning = false;

    if (this.isTimedMode) {
      const elapsedTime = Date.now() - this.gameStartTime;
      this.remainingTime = Math.max(
        0,
        this.timedModeSeconds * 1000 - elapsedTime
      );
    } else {
      this.gameTime = Date.now() - this.gameStartTime;
    }

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resumeTimer() {
    if (this.isTimerRunning) return;

    if (this.isTimedMode) {
      this.gameStartTime =
        Date.now() - (this.timedModeSeconds * 1000 - this.remainingTime);
    } else {
      this.gameStartTime = Date.now() - this.gameTime;
    }
    this.isTimerRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.isTimerRunning) {
        if (this.isTimedMode) {
          const elapsedTime = Date.now() - this.gameStartTime;
          this.remainingTime = Math.max(
            0,
            this.timedModeSeconds * 1000 - elapsedTime
          );

          if (this.remainingTime <= 0) {
            window.game.gameOver();

            console.log("Limited Time Mode Time Out，Game Over");
          }
        } else {
          this.gameTime = Date.now() - this.gameStartTime;
        }
        this.updateTimeDisplay();
      }
    }, 1000);

    console.log("Timer Resumed");
  }

  stopTimer() {
    this.pauseTimer();

    let finalTime;
    if (this.isTimedMode) {
      finalTime = this.formatTime(this.timedModeSeconds * 1000);
    } else {
      finalTime = this.formatTime(this.gameTime);
    }

    console.log(
      `Game Over，${
        this.isTimedMode ? "Limited Time Mode，Initial Time" : "Total Time"
      }: ${finalTime}`
    );

    const finalTimeElement = document.getElementById("finalTime");
    if (finalTimeElement) {
      finalTimeElement.textContent = finalTime;
    }
  }

  formatTime(timeMs) {
    const totalSeconds = Math.floor(timeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  updateTimeDisplay() {
    const timeElement = document.getElementById("time");
    if (timeElement) {
      if (this.isTimedMode) {
        timeElement.textContent =
          this.remainingTime > 60
            ? this.formatTime(this.remainingTime)
            : this.remainingTime;

        if (this.remainingTime <= 30000) {
          timeElement.classList.add("time-warning");
        } else {
          timeElement.classList.remove("time-warning");
        }
      } else {
        timeElement.textContent = this.formatTime(this.gameTime);
        timeElement.classList.remove("time-warning");
      }
    }
  }

  showScoreAnimation(score, x, y) {
    const scoreAnimation = document.createElement("div");
    scoreAnimation.className = "score-animation";
    scoreAnimation.textContent = `+${score}`;
    scoreAnimation.style.opacity = "0";
    document.body.appendChild(scoreAnimation);
    const width = scoreAnimation.offsetWidth;
    const height = scoreAnimation.offsetHeight;
    scoreAnimation.style.left = `${x - width / 2}px`;
    scoreAnimation.style.top = `${y - height / 2}px`;
    scoreAnimation.offsetHeight;
    scoreAnimation.style.opacity = "";

    setTimeout(() => {
      if (document.body.contains(scoreAnimation)) {
        document.body.removeChild(scoreAnimation);
      }
    }, 1500); 
  }

  loadHighScore() {
    const savedHighScore = localStorage.getItem("tetrisHighScore");
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  }

  saveHighScore(score) {
    if (score > this.highScore) {
      this.highScore = score;
      localStorage.setItem("tetrisHighScore", score.toString());
      this.updateHighScoreDisplay();
    }
  }

  updateHighScoreDisplay() {
    const highScoreElement = document.getElementById("highScore");
    if (highScoreElement) {
      highScoreElement.textContent = formatNumber(this.highScore);
    }
  }

  drawModeSelection() {
    if (window.game && window.game.isRunning) {
      console.log("The game is running,Cancel drawing drawModeSelection");
      return;
    }

    console.log("Draw the game mode selection interface");
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "#A5D0F7";
    this.ctx.font = "bold 62px system-ui";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(
      ("TETRIS"),
      this.canvas.width / 2,
      this.canvas.height / 6
    );

    const btnWidth = 210;
    const btnHeight = 50;
    const btnSpacing = 30;
    const startY = this.canvas.height / 2 - btnHeight - btnSpacing;
    const standardBtnX = this.canvas.width / 2 - btnWidth / 2;
    const standardBtnY = startY;
    const timedBtnY = startY + (btnHeight + btnSpacing) * 2;
    const isStandardHovered = this._isMouseOverButton(
      standardBtnX,
      standardBtnY,
      btnWidth,
      btnHeight,
      this.lastMouseX,
      this.lastMouseY
    );

    this._drawModeButton(
      standardBtnX,
      standardBtnY,
      btnWidth,
      btnHeight,
      ("PLAY GAME"),
      isStandardHovered,
      "#0056e0",
      "#0260f7"
    );

    const explanationY = timedBtnY + btnHeight + 40;
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(this.canvas.width / 2 - 200, explanationY - 20, 400, 60);
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#f8f8f8";
    let explanationText = "";

    if (isStandardHovered) {
      explanationText = ("You must rotate, move, and drop the tetriminos! Speed +10% per level");
    } else {
      explanationText = ("Press Play Button To Start The Game");
    }

    if (document.body.clientWidth >= 768) {
      this.ctx.textAlign = "center";
      const maxWidth = document.getElementById("gameCanvas")?.width - 30 || 300; 
      const words = explanationText.split(" ");
      let line = "";
      let lines = [];
      for (let word of words) {
        const testLine = line + (line ? " " : "") + word;
        const metrics = this.ctx.measureText(testLine);

        if (metrics.width > maxWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      const lineHeight = 24;
      lines.forEach((line, i) => {
        this.ctx.fillText(
          line,
          this.canvas.width / 2,
          explanationY + i * lineHeight
        );
      });
    }

    this.canvas.style.cursor =
      isStandardHovered 
        ? "pointer"
        : "default";
    this._removeEventListeners();
    this._mouseMoveHandler = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.lastMouseX = x;
      this.lastMouseY = y;

      const currentStandardHovered = this._isMouseOverButton(
        standardBtnX,
        standardBtnY,
        btnWidth,
        btnHeight,
        x,
        y
      );
      
      if (
        currentStandardHovered !== isStandardHovered
      ) {
        requestAnimationFrame(() => this.drawModeSelection());
      }
    };

    this._startClickHandler = (e) => {
      if (window.game && window.game.isRunning) {
        console.log("The game is running, ignoring touch events");
        return;
      }

      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        this._isMouseOverButton(
          standardBtnX,
          standardBtnY,
          btnWidth,
          btnHeight,
          x,
          y
        )
      ) {
        this._selectGameMode("STANDARD");
      } 
    };

    this._startTouchHandler = (e) => {
      e.preventDefault();

      if (e.changedTouches.length === 0) return;

      const rect = this.canvas.getBoundingClientRect();
      const touch = e.changedTouches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      if (
        this._isMouseOverButton(
          standardBtnX,
          standardBtnY,
          btnWidth,
          btnHeight,
          x,
          y
        )
      ) {
        this._selectGameMode("STANDARD");
      } 
    };
    this.canvas.addEventListener("mousemove", this._mouseMoveHandler);
    this.canvas.addEventListener("click", this._startClickHandler);
    this.canvas.addEventListener("touchend", this._startTouchHandler);
    this._modeButtonsInfo = {
      standard: {
        x: standardBtnX,
        y: standardBtnY,
        width: btnWidth,
        height: btnHeight,
      },

    };
  }

  _drawModeButton(x, y, width, height, text, isHovered, color1, color2) {
    const gradient = this.ctx.createLinearGradient(x, y, x, y + height);

    if (isHovered) {
      gradient.addColorStop(0, this._lightenColor(color1, 20));
      gradient.addColorStop(1, color1);
    } else {
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
    }
    this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    this.ctx.shadowBlur = 15;
    this.ctx.shadowOffsetY = isHovered ? 4 : 8; 
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, width, height, 25);
    this.ctx.fill();

    if (isHovered) {
      this.ctx.strokeStyle = "#fff";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.roundRect(x, y, width, height, 25);
      this.ctx.stroke();
    }
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 22px Arial";
    this.ctx.shadowColor = "transparent"; 
    this.ctx.fillText(text, x + width / 2, y + height / 2);
    if (isHovered) {
      const highlight = this.ctx.createLinearGradient(
        x,
        y,
        x,
        y + height * 0.4
      );
      highlight.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      highlight.addColorStop(1, "rgba(255, 255, 255, 0)");

      this.ctx.fillStyle = highlight;
      this.ctx.beginPath();
      this.ctx.roundRect(x + 2, y + 2, width - 4, height * 0.4 - 2, 22);
      this.ctx.fill();
    }
  }

  _lightenColor(color, percent) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const lightenR = Math.min(255, Math.floor((r * (100 + percent)) / 100));
    const lightenG = Math.min(255, Math.floor((g * (100 + percent)) / 100));
    const lightenB = Math.min(255, Math.floor((b * (100 + percent)) / 100));
    return `#${lightenR.toString(16).padStart(2, "0")}${lightenG
      .toString(16)
      .padStart(2, "0")}${lightenB.toString(16).padStart(2, "0")}`;
  }

  _removeEventListeners() {
    if (this._mouseMoveHandler) {
      this.canvas.removeEventListener("mousemove", this._mouseMoveHandler);
      this._mouseMoveHandler = null;
    }
    if (this._startClickHandler) {
      this.canvas.removeEventListener("click", this._startClickHandler);
      this._startClickHandler = null;
    }
    if (this._startTouchHandler) {
      this.canvas.removeEventListener("touchend", this._startTouchHandler);
      this._startTouchHandler = null;
    }
  }

  _selectGameMode(mode) {
    console.log(`Selected Game Mode: ${mode}`);
    this._removeEventListeners();
    this.canvas.style.cursor = "default";
    if (window.setGameMode) {
      window.setGameMode(mode);
    }

    this._triggerStartGame();
  }
}

if (typeof window !== "undefined") {
  window.Board = Board;
}
