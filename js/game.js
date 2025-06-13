class Game {
  constructor() {
    this.gameCanvas = document.getElementById("gameCanvas");
    this.nextCanvas = document.getElementById("nextCanvas");
    this.holdCanvas = document.getElementById("holdCanvas");
    this.disableDoubleTapZoom();
    this.board = new Board(this.gameCanvas, this.nextCanvas, this.holdCanvas);
    this.board.updateHighScoreDisplay();
    this.startBtn = null;
    this.pauseBtn = null;
    this.restartBtn = null;
    this.restartGameBtn = null;
    this.resumeBtn = null;
    this.musicToggle = null;
    this.soundToggle = null;
    this.fullscreenToggle = null;
    this.returnToModeSelectBtn = null;
    this.initControls();
    this.initGameModeSelector();
    this.initKeyboardEvents();
    this.bindEvents();
    this.isRunning = false;
    this.dropInterval = null;
    this.isPaused = false;
    this.lastDropTime = 0;
    this.frameInterval = 1000 / 60; // 60 FPS
    const gameOverModal = document.getElementById("gameOverModal");
	
    if (gameOverModal) {
      gameOverModal.style.display = "none";
    }
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;
    this.lastMoveTime = 0;
    this.isSwiping = false;
    this.lastMoveDirection = null; 
    this.lastRenderTime = 0;
    this.dropAccumulator = 0;
    this._wasRunningBeforeHidden = false;
    this.initAudioSettings();
    window.addEventListener("resize", () => {
      if (this.resizeTimeout) clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(() => {
        this.board.updateCanvasSize();
      }, 100);
    });

    setTimeout(() => {
      this.board.updateCanvasSize();
    }, 0);

    if (document.getElementById("mobile-controls")) {
      this.addMobileControls();
    }

    document.addEventListener("visibilitychange", () => {
      this._handleVisibilityChange(document.hidden);
    });

    window.addEventListener("pagehide", () => {
      this._handleVisibilityChange(true);
    });

    window.addEventListener("pageshow", () => {
      this._handleVisibilityChange(false);
    });

    window.addEventListener("blur", () => {
      this._handleVisibilityChange(true);
    });

    window.addEventListener("focus", () => {
      this._handleVisibilityChange(false);
    });

    console.log("Game initialized");
  }

  initAudioSettings() {
    if (localStorage.getItem("tetris_music") === null) {
      localStorage.setItem("tetris_music", "true");
    }

    if (localStorage.getItem("tetris_sound") === null) {
      localStorage.setItem("tetris_sound", "true");
    }
  }

  initControls() {
    this.startBtn = document.getElementById("startBtn");
    this.pauseBtn = document.getElementById("pauseBtn");
    this.restartBtn = document.getElementById("restartBtn");
    this.restartGameBtn = document.getElementById("restartGameBtn");
    this.returnToModeSelectBtn = document.getElementById(
      "returnToModeSelectBtn"
    );
    this.resumeBtn = document.getElementById("resumeBtn");
    this.musicToggle = document.getElementById("musicToggle");
    this.soundToggle = document.getElementById("soundToggle");
    if (this.startBtn) {
      this.startBtn.addEventListener("click", () => {
        console.log("Click the Start button");
        this.startGame();
      });
      this.startBtn.setAttribute("data-codelab", 11);
    }

    if (this.pauseBtn) {
      this.pauseBtn.addEventListener("click", () => {
        console.log("Click the Pause button");
        this.togglePause();
      });
    }

    if (this.restartBtn) {
      this.restartBtn.addEventListener("click", () => {
        console.log("Click the Restart button");
        this.restartGame();
      });
    }

    if (this.restartGameBtn) {
      this.restartGameBtn.addEventListener("click", () => {
        console.log("Click the restart button in the game end pop-up window");
        this.restartGame();
        const gameOverModal = document.getElementById("gameOverModal");
        if (gameOverModal) {
          gameOverModal.style.display = "none";
        }
      });
    }

    if (this.returnToModeSelectBtn) {
      this.returnToModeSelectBtn.addEventListener("click", () => {
        console.log("Click the Back Selection button");
        const gameOverModal = document.getElementById("gameOverModal");
        if (gameOverModal) {
          gameOverModal.style.display = "none";
        }

        if (this.board) {
          window.game.isRunning = false;
          this.board.drawModeSelection();
        }
      });
    }

    this.initAudioControls();
    this.initFullscreenControl();
    this.initMobileControls();
  }

  initAudioControls() {
    const musicEnabled = localStorage.getItem("tetris_music") !== "false";
    const soundEnabled = localStorage.getItem("tetris_sound") !== "false";
    this.updateAudioButtonState(this.musicToggle, musicEnabled);
    this.updateAudioButtonState(this.soundToggle, soundEnabled);
    if (this.musicToggle) {
      this.musicToggle.addEventListener("click", () => {
        const newState = localStorage.getItem("tetris_music") === "false";
        localStorage.setItem("tetris_music", newState);
        this.updateAudioButtonState(this.musicToggle, newState);

        if (this.isRunning && !this.isPaused) {
          if (newState) {
            this.board.playSound("background");
          } else {
            this.board.stopSound("background");
          }
        }
      });
    }

    if (this.soundToggle) {
      this.soundToggle.addEventListener("click", () => {
        const newState = localStorage.getItem("tetris_sound") === "false";
        localStorage.setItem("tetris_sound", newState);
        this.updateAudioButtonState(this.soundToggle, newState);

        if (this.board && this.board.sounds) {
          Object.keys(this.board.sounds).forEach((key) => {
            if (key !== "background") {
              this.board.sounds[key].muted = !newState;
            }
          });
        }
      });
    }
  }

  updateAudioButtonState(button, enabled) {
    if (!button) return;
    const iconElement = button.querySelector(".material-icons");
    if (!iconElement) return;
	
    if (enabled) {
      button.classList.remove("disabled");
      iconElement.style.opacity = "1";
	  
      if (button.id === "musicToggle") {
        iconElement.textContent = "music_note";
      } else if (button.id === "soundToggle") {
        iconElement.textContent = "volume_up";
      }
    } else {
      button.classList.add("disabled");
      iconElement.style.opacity = "0.5";

      if (button.id === "musicToggle") {
        iconElement.textContent = "music_off";
      } else if (button.id === "soundToggle") {
        iconElement.textContent = "volume_off";
      }
    }
  }

  initMobileControls() {
    console.log("Initialize mobile device control buttons");
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");
    const downBtn = document.getElementById("downBtn");
    const rotateBtn = document.getElementById("rotateBtn");
    const dropBtn = document.getElementById("dropBtn");

    if (!leftBtn || !rightBtn || !downBtn || !rotateBtn || !dropBtn) {
      console.log("The mobile device control button does not exist or was not found");
      return;
    }

    this.addMobileButtonEvent(leftBtn, () => {
      if (this.board && !this.board.isGameOver && !this.board.isPaused) {
        this.board.movePiece(-1, 0);
      }
    });

    this.addMobileButtonEvent(rightBtn, () => {
      if (this.board && !this.board.isGameOver && !this.board.isPaused) {
        this.board.movePiece(1, 0);
      }
    });

    this.addMobileButtonEvent(downBtn, () => {
      if (this.board && !this.board.isGameOver && !this.board.isPaused) {
        this.board.movePiece(0, 1);
      }
    });

    this.addMobileButtonEvent(rotateBtn, () => {
      if (this.board && !this.board.isGameOver && !this.board.isPaused) {
        this.board.rotatePiece();
      }
    });

    this.addMobileButtonEvent(dropBtn, () => {
      if (this.board && !this.board.isGameOver && !this.board.isPaused) {
        this.board.hardDrop();
      }
    });

    console.log("Mobile device control button initialization completed");
  }

  addMobileButtonEvent(button, action) {
    button.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault(); 
        action();

        if ("vibrate" in navigator) {
          navigator.vibrate(15);
        }
      },
      { passive: false }
    );
  }

  bindEvents() {
    this.gameCanvas.addEventListener(
      "touchstart",
      (e) => {
        if (!this.isRunning || this.board.isGameOver || this.board.isPaused)
          return;

        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.touchStartTime = Date.now();
        this.isSwiping = true;

        if (e.touches.length > 1) {
          e.preventDefault();
        }
      },
      { passive: false }
    );

    this.gameCanvas.addEventListener(
      "touchmove",
      (e) => {
        if (!this.isSwiping) return;
        e.preventDefault();
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        const threshold = 15;
        const currentTime = Date.now();
        const timeDelta = currentTime - this.lastMoveTime || 0;
		
        if (timeDelta < 50) return;
        this.lastMoveTime = currentTime;
        if (Math.abs(deltaX) > threshold) {
          const moveSteps = Math.min(
            2,
            Math.floor(Math.abs(deltaX) / threshold)
          );
          const direction = deltaX > 0 ? 1 : -1;
          this.board
            .movePiece(direction, 0)
            .then((success) => {
              if (success && moveSteps > 1) {
                return this.board.movePiece(direction, 0);
              }
              return false;
            })
            .catch((error) => {
              console.error("Error moving block:", error);
            });

          this.touchStartX = touch.clientX - (deltaX % threshold) * 0.5;
          this.lastMoveDirection = "horizontal";
        }

        if (deltaY > threshold) {
          this.board.movePiece(0, 1).catch((error) => {
            console.error("Error moving block down:", error);
          });

          this.touchStartY = touch.clientY - (deltaY % threshold) * 0.5;
          this.lastMoveDirection = "vertical";
        }
      },
      { passive: false }
    );

    this.gameCanvas.addEventListener(
      "touchend",
      (e) => {
        if (!this.isSwiping) return;

        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - this.touchStartTime;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        const threshold = 15; 

        let hasPerformedSlideAction = false;
        const isRecentMove = touchEndTime - this.lastMoveTime < 200;

        if (!isRecentMove && !this.lastMoveDirection) {
          if (Math.abs(deltaX) > threshold || Math.abs(deltaY) > threshold) {
            hasPerformedSlideAction = true;
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
              this.board
                .movePiece(deltaX > 0 ? 1 : -1, 0)
                .catch((error) =>
                  console.error("Error moving block when touch ends:", error)
                );
            } else {
              this.board
                .movePiece(0, 1)
                .catch((error) =>
                  console.error("Error moving the block down when touch ends:", error)
                );
            }
          }
        } else if (this.lastMoveDirection) {
          hasPerformedSlideAction = true;
        }

        if (
          !hasPerformedSlideAction &&
          touchDuration < 200 &&
          Math.abs(deltaX) < threshold &&
          Math.abs(deltaY) < threshold
        ) {
          this.board
            .rotatePiece()
            .catch((error) => console.error("Error in rotating the block:", error));
        }

        this.isSwiping = false;
        this.lastMoveDirection = null;
      },
      { passive: true }
    );
  }

  startGame() {
    console.log("Start the game");
    this.board.reset();

    if (this.startBtn) {
      this.startBtn.style.display = "none";
    }

    if (this.pauseBtn) {
      this.pauseBtn.disabled = false;
      this.pauseBtn.classList.remove("disabled");

      const iconElement = this.pauseBtn.querySelector(".material-icons");
      if (iconElement) {
        iconElement.textContent = "pause";
      }
    }

    this.isRunning = true;
    this.isPaused = false;
    this.board.spawnNewPiece();
    this.startGameLoop();
    this.board.startTimer();
    this.board.playSound("background");
  }

  clearDropInterval() {
    if (this.dropInterval) {
      clearInterval(this.dropInterval);
      this.dropInterval = null;
    }
  }

  recalculateDropTime() {
    this.clearDropInterval();
    console.log(`Resume game, using drop interval: ${this.board.interval}ms`);
    this.dropInterval = setInterval(() => {

      if (
        !this.isRunning ||
        this.board.isPaused ||
        this.board.isGameOver ||
        !this.board.currentPiece ||
        this.board._processingLineClear
      ) {
        return;
      }

      console.log("Timer triggers the block to fall");

      this.board
        .movePiece(0, 1, true)
        .catch((error) => console.error("Error when dropping blocks:", error));
    }, this.board.interval);
  }

  togglePause() {
    if (!this.isRunning) return;
    this.isPaused = !this.isPaused;
    if (this.board) {
      this.board.isPaused = this.isPaused;
    }
    console.log(`Game${this.isPaused ? "Paused" : "Continue"}`);

    if (this.pauseBtn) {
      const iconElement = this.pauseBtn.querySelector(".material-icons");
      if (iconElement) {
        iconElement.textContent = this.isPaused ? "play_arrow" : "pause";
      }
    }

    const pauseOverlay = document.getElementById("pauseOverlay");
    if (pauseOverlay) {
      pauseOverlay.style.display = this.isPaused ? "flex" : "none";
    }

    if (this.isPaused) {
      this.stopGameLoop();
      this.board.pauseTimer();
	  
      if (this.board) {
        this.board.drawPauseScreen();
      }

      this.board.stopBackgroundSound();
    } else {
      this.stopGameLoop();
      this.startGameLoop();
      this.lastRenderTime = performance.now();
      this.dropAccumulator = 0;
      requestAnimationFrame((time) => this.gameLoop(time));
      this.board.resumeTimer();

      this.board.playSound("background");
    }
  }

  stopGameLoop() {
    console.log("Stop the game loop");

    this.clearDropInterval();
  }

  restartGame() {
    console.log("Restart the game");
    this.stopGameLoop();

    if (this.board.sounds) {
      Object.keys(this.board.sounds).forEach((soundName) => {
        this.board.stopSound(soundName);
      });
    }

    const gameOverModal = document.getElementById("gameOverModal");
    if (gameOverModal) {
      gameOverModal.style.display = "none";
    }

    const pauseOverlay = document.getElementById("pauseOverlay");
    if (pauseOverlay) {
      pauseOverlay.style.display = "none";
    }
    this.board.reset();
    this.startGame();
  }


  gameLoop(currentTime = performance.now()) {
    if (!this.isRunning) {
      console.log("The game stops running");
      return;
    }

    if (!this.board.isPaused && !this.board.isGameOver) {
      if (!this.board.currentPiece && !this.board._processingLineClear) {
        console.log("Generate New Blocks");
        this.board.spawnNewPiece();
      }

      this.board.draw();
    }

    if (this.board.isGameOver) {
      console.log("Game Over");
      this.isRunning = false;
      this.startBtn.disabled = false;
      this.pauseBtn.disabled = true;
      document.getElementById("gameOverModal").style.display = "block";
      return;
    }

    this.lastRenderTime = currentTime;
    requestAnimationFrame((time) => this.gameLoop(time));
  }

  disableDoubleTapZoom() {
    let lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      (event) => {
        const now = Date.now();
        if (now - lastTouchEnd < 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    if (this.gameCanvas) {
      this.gameCanvas.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );

      this.gameCanvas.addEventListener(
        "touchmove",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );

      this.gameCanvas.addEventListener(
        "touchend",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );

      this.gameCanvas.addEventListener(
        "gesturestart",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );

      this.gameCanvas.addEventListener(
        "gesturechange",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );

      this.gameCanvas.addEventListener(
        "gestureend",
        (e) => {
          e.preventDefault();
        },
        { passive: false }
      );
    }
  }

  startGameLoop() {
    console.log("Start the game loop");
    this.recalculateDropTime();
    this.lastRenderTime = performance.now();
    this.dropAccumulator = 0; 
    requestAnimationFrame((time) => this.gameLoop(time));

    console.log("Game loop started");
  }

  initKeyboardEvents() {
    console.log("Initialize keyboard events");
    document.addEventListener("keydown", (e) => {
      if (!this.isRunning || this.board.isPaused || this.board.isGameOver)
        return;

      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          this.board.movePiece(-1, 0);
          break;
        case "ArrowRight":
        case "d":
        case "D":
          this.board.movePiece(1, 0);
          break;
        case "ArrowDown":
        case "s":
        case "S":
          this.board.movePiece(0, 1);
          break;
        case "ArrowUp":
        case "w":
        case "W":
          this.board.rotatePiece();
          break;
        case " ": 
          this.board.hardDrop();
          break;
        case "c":
        case "C":
          this.board.holdPiece();
          break;
        case "p":
        case "P":
          this.togglePause();
          break;
        default:
          return;
      }

      e.preventDefault();
    });

    console.log("Keyboard event initialization completed");
  }

  gameOver() {
    console.log("Game Over");
    this.stopGameLoop();
    this.isRunning = false;
    this.isPaused = false;
    this.board.drawGameOver();
    this.board.stopBackgroundSound();

    this.board.playSound("gameover");

    if (this.pauseBtn) {
      const iconElement = this.pauseBtn.querySelector(".material-icons");
      if (iconElement) {
        iconElement.textContent = "play_arrow";
      }
      this.pauseBtn.disabled = false;
      this.pauseBtn.classList.remove("disabled");
    }
  }

  _handleVisibilityChange(isHidden) {
    if (isHidden) {
      if (this.isRunning && !this.board.isPaused) {
        console.log("The page switches to the background and the music is paused");
        if (this.board.sounds && this.board.sounds.background) {
          console.log("Pause background music");
          try {
            this.board.sounds.background.pause();
          } catch (error) {
            console.error("Error pausing background music:", error);
          }
        }

        this._wasRunningBeforeHidden = true;
      }
    } else {
      if (
        this._wasRunningBeforeHidden &&
        this.isRunning &&
        !this.board.isPaused
      ) {
        console.log("The page switches back to the foreground and music playback resumes");
        if (this.board.sounds && this.board.sounds.background) {
          console.log("Restore background music");
          try {
            this.board.sounds.background.play().catch((error) => {
              console.warn("Error restoring background music:", error);
            });
          } catch (error) {
            console.error("Error restoring background music:", error);
          }
        }

        this._wasRunningBeforeHidden = false;
      }
    }
  }

  resumeGame() {
    if (this.isPaused) {
      this.togglePause();
    }
  }

  initGameModeSelector() {
    this.updateModeDisplay();
  }

  updateModeDisplay() {
    const currentModeName = window.getCurrentGameMode();

    if (this.modeToggle) {
      this.modeToggle.title = `Game Mode: ${currentModeName}`;
    }

    if (this.modeDescription) {
      if (window.GAME_CONFIG.CURRENT_MODE === "STANDARD") {
        this.modeDescription.textContent =
          "Standard mode: Standard speed, suitable for begginers and casual players.";
      } 
    }
  }

  initFullscreenControl() {
    this.fullscreenToggle = document.getElementById("fullscreenToggle");	
  }

}

window.addEventListener("load", () => {
  const isMobile = window.innerWidth <= 480;
  window.game = new Game();

  if (isMobile) {
    window.game.holdCanvas = null;
    window.game.board = new Board(
      window.game.gameCanvas,
      window.game.nextCanvas,
      null
    );

    const mobileControls = document.querySelector(".mobile-controls-area");
    if (mobileControls) {
      mobileControls.style.display = "flex";
    }

    console.log("Mobile game initialization completed");
  }
});
