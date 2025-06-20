const GAME_CONFIG = {
  COLS: 10, // Game panel columns
  ROWS: 20, // Number of game panel rows
  PREVIEW_SIZE: 4, // Preview area size
  // Game Mode Configuration
  GAME_MODES: {
    STANDARD: {
      name: "Standard Mode",
      base_speed: 1000,
      min_speed: 300,
      speed_factor: 0.1,
    },
  },
  CURRENT_MODE: "STANDARD", 
  PIECES: ["I", "J", "L", "O", "S", "T", "Z"],
  COLORS: {
    I: { primary: "#9ce9ff", secondary: "#00bef7" },
    J: { primary: "#4940f7", secondary: "#1F4FED" },
    L: { primary: "#ffd991", secondary: "#F4810F" },
    O: { primary: "#fffbab", secondary: "#fade00" }, 
    S: { primary: "#b7ffb0", secondary: "#02c415" },
    T: { primary: "#dda6ff", secondary: "#B009EE" },
    Z: { primary: "#fa6666", secondary: "#ff0000" },
  },
  SHAPES: {
    I: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],

    O: [
      [1, 1],
      [1, 1],
    ],

    T: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],

    S: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],

    Z: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],

    J: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],

    L: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
  },
};

// Saves the history of recently generated blocks
let pieceHistory = [];
const MAX_HISTORY_LENGTH = 3; // Record the last 3 blocks

// Block pool, used for pooled generation
let piecePool = [];

/**
 * Get random block types, using a combination of pooling generation and intelligent generation
 * @param {Array<Array>} grid Current Game Grid
 * @returns {string} Block Type
 */
function getRandomPiece(grid) {
  // If the block pool is empty, refill it
  if (piecePool.length === 0) {
    console.log("The block pool is empty, refill");
    piecePool = [...GAME_CONFIG.PIECES, ...GAME_CONFIG.PIECES];
    // Shuffle the block pool order
    shuffleArray(piecePool);
  }

  let selectedPiece = piecePool.pop();
  console.log("Using pooling to generate blocks");
  pieceHistory.push(selectedPiece);
  if (pieceHistory.length > MAX_HISTORY_LENGTH) {
    pieceHistory.shift();
  }

  console.log(`Generate Blocks: ${selectedPiece}, Remaining pool size: ${piecePool.length}`);
  return selectedPiece;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getCellSize() {
  if (document.body.clientWidth < 768) {
    let height = document.body.clientHeight;
    let width = document.body.clientWidth;
    if ("visualViewport" in window) {
      height = visualViewport.height;
      width = visualViewport.width;
    }

    let width1 = document.querySelector(".score-grid")?.offsetWidth || 0;
    let width2 = document.querySelector(".audio-controls")?.offsetWidth || 0;

    let height2 = document.querySelector(".game-controls")?.offsetHeight || 0;

    let clientHeight = height - height2 - 20;
    let clientWidth = width - width1 - width2 - 20;

    let cellSize = Math.min(
      clientHeight / GAME_CONFIG.ROWS,
      clientWidth / GAME_CONFIG.COLS
    );

    return Math.floor(cellSize);
  }

  const blockSize = getComputedStyle(document.documentElement)
    .getPropertyValue("--block-size")
    .trim();
  return parseInt(blockSize) || 30;
}

function getPreviewCellSize() {
  if (document.body.clientWidth < 768) {
    return Math.floor(getCellSize() * 0.4);
  }
  return Math.floor(getCellSize() * 0.7);
}

function create2DArray(rows, cols, defaultValue = null) {
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(defaultValue));
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function rotateMatrix(matrix) {
  const N = matrix.length;
  const result = create2DArray(N, N);

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      result[j][N - 1 - i] = matrix[i][j];
    }
  }

  return result;
}

function isValidMove(board, piece, x, y) {
  if (!board || !piece || !Array.isArray(piece) || !Array.isArray(board)) {
    console.error("isValidMove: Invalid input parameters", { board, piece, x, y });
    return false;
  }
  if (typeof x !== "number" || typeof y !== "number") {
    console.error("isValidMove: Coordinates are not numbers", { x, y });
    return false;
  }
  const N = piece.length;
  for (let i = 0; i < N; i++) {
    if (!Array.isArray(piece[i]) || piece[i].length !== N) {
      console.error("isValidMove: piece is not a valid 2D array", piece);
      return false;
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (piece[i][j]) {
        const newX = x + j;
        const newY = y + i;

        if (newX < 0 || newX >= GAME_CONFIG.COLS || newY >= GAME_CONFIG.ROWS) {
          return false;
        }

        if (newY < 0) continue;

        if (board[newY] === undefined) {
          console.error(`isValidMove: board[${newY}] Undefined`, board);
          return false;
        }

        if (board[newY][newX] === undefined) {
          console.error(
            `isValidMove: board[${newY}][${newX}] Undefined`,
            board[newY]
          );
          return false;
        }

        if (board[newY][newX] !== null) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Formatting Number Display
 * @param {number} num The number to format
 * @returns {string} The formatted string
 */
function formatNumber(num) {
  return num.toString();
}

/**
 * Draw a single block
 * @param {CanvasRenderingContext2D} ctx Canvas Context
 * @param {number} x Square x coordinate
 * @param {number} y Square y coordinate
 * @param {string} type Block Type（I、O、T、S、Z、J、L）
 * @param {number} size Block size
 * @param {Object} customColors Custom color object (optional)
 * @param {boolean} isGhost Whether it is a simulated falling block (optional）
 */
function drawBlock(
  ctx,
  x,
  y,
  type,
  size,
  customColors = null,
  isGhost = false
) {
  const blockSize = size || getCellSize();
  const padding = Math.max(1, blockSize * 0.05);
  const xPos = x * blockSize;
  const yPos = y * blockSize;
  const innerSize = blockSize - padding * 2;
  const colors = customColors || GAME_CONFIG.COLORS[type];
  
  if (isGhost) {
    ctx.save();
    const radius = Math.max(2, blockSize * 0.15);
    ctx.beginPath();
    ctx.moveTo(xPos + padding + radius, yPos + padding);
    ctx.lineTo(xPos + blockSize - padding - radius, yPos + padding);
    ctx.quadraticCurveTo(
      xPos + blockSize - padding,
      yPos + padding,
      xPos + blockSize - padding,
      yPos + padding + radius
    );
    ctx.lineTo(xPos + blockSize - padding, yPos + blockSize - padding - radius);
    ctx.quadraticCurveTo(
      xPos + blockSize - padding,
      yPos + blockSize - padding,
      xPos + blockSize - padding - radius,
      yPos + blockSize - padding
    );
    ctx.lineTo(xPos + padding + radius, yPos + blockSize - padding);
    ctx.quadraticCurveTo(
      xPos + padding,
      yPos + blockSize - padding,
      xPos + padding,
      yPos + blockSize - padding - radius
    );
    ctx.lineTo(xPos + padding, yPos + padding + radius);
    ctx.quadraticCurveTo(
      xPos + padding,
      yPos + padding,
      xPos + padding + radius,
      yPos + padding
    );
    ctx.closePath();
    ctx.strokeStyle = `#091114`; /** Menghilangkan bayangan tetris code ${colors.primary} ganti dengan warna #091114*/
    ctx.lineWidth = Math.max(1, blockSize * 0.05);
    ctx.setLineDash([blockSize * 0.15, blockSize * 0.1]); 
    ctx.stroke();
    ctx.fillStyle = `${colors.primary}20`;
    ctx.restore();
    return; 
  }

  ctx.save();
  const radius = Math.max(2, blockSize * 0.15);
  ctx.beginPath();
  ctx.moveTo(xPos + padding + radius, yPos + padding);
  ctx.lineTo(xPos + blockSize - padding - radius, yPos + padding);
  ctx.quadraticCurveTo(
    xPos + blockSize - padding,
    yPos + padding,
    xPos + blockSize - padding,
    yPos + padding + radius
  );
  ctx.lineTo(xPos + blockSize - padding, yPos + blockSize - padding - radius);
  ctx.quadraticCurveTo(
    xPos + blockSize - padding,
    yPos + blockSize - padding,
    xPos + blockSize - padding - radius,
    yPos + blockSize - padding
  );
  ctx.lineTo(xPos + padding + radius, yPos + blockSize - padding);
  ctx.quadraticCurveTo(
    xPos + padding,
    yPos + blockSize - padding,
    xPos + padding,
    yPos + blockSize - padding - radius
  );
  ctx.lineTo(xPos + padding, yPos + padding + radius);
  ctx.quadraticCurveTo(
    xPos + padding,
    yPos + padding,
    xPos + padding + radius,
    yPos + padding
  );
  ctx.closePath();
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = blockSize * 0.15;
  ctx.shadowOffsetX = blockSize * 0.05;
  ctx.shadowOffsetY = blockSize * 0.05;

  const mainGradient = ctx.createLinearGradient(
    xPos + padding,
    yPos + padding,
    xPos + blockSize - padding,
    yPos + blockSize - padding
  );
  mainGradient.addColorStop(0, colors.primary);
  mainGradient.addColorStop(1, colors.secondary);
  ctx.fillStyle = mainGradient;
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  const innerPadding = blockSize * 0.15;
  const innerRadius = Math.max(1, radius - 2);

  ctx.beginPath();
  ctx.moveTo(
    xPos + padding + innerPadding + innerRadius,
    yPos + padding + innerPadding
  );
  ctx.lineTo(
    xPos + blockSize - padding - innerPadding - innerRadius,
    yPos + padding + innerPadding
  );
  ctx.quadraticCurveTo(
    xPos + blockSize - padding - innerPadding,
    yPos + padding + innerPadding,
    xPos + blockSize - padding - innerPadding,
    yPos + padding + innerPadding + innerRadius
  );
  ctx.lineTo(
    xPos + blockSize - padding - innerPadding,
    yPos + blockSize - padding - innerPadding - innerRadius
  );
  ctx.quadraticCurveTo(
    xPos + blockSize - padding - innerPadding,
    yPos + blockSize - padding - innerPadding,
    xPos + blockSize - padding - innerPadding - innerRadius,
    yPos + blockSize - padding - innerPadding
  );
  ctx.lineTo(
    xPos + padding + innerPadding + innerRadius,
    yPos + blockSize - padding - innerPadding
  );
  ctx.quadraticCurveTo(
    xPos + padding + innerPadding,
    yPos + blockSize - padding - innerPadding,
    xPos + padding + innerPadding,
    yPos + blockSize - padding - innerPadding - innerRadius
  );
  ctx.lineTo(
    xPos + padding + innerPadding,
    yPos + padding + innerPadding + innerRadius
  );
  ctx.quadraticCurveTo(
    xPos + padding + innerPadding,
    yPos + padding + innerPadding,
    xPos + padding + innerPadding + innerRadius,
    yPos + padding + innerPadding
  );
  ctx.closePath();

  const highlightGradient = ctx.createLinearGradient(
    xPos + padding + innerPadding,
    yPos + padding + innerPadding,
    xPos + blockSize - padding - innerPadding,
    yPos + blockSize - padding - innerPadding
  );
  highlightGradient.addColorStop(0, "rgba(0, 0, 0, 0.25)");
  highlightGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.15)");
  highlightGradient.addColorStop(1, "rgba(0, 0, 0, 0.25)");

  ctx.fillStyle = highlightGradient;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(xPos + padding + radius, yPos + padding);
  ctx.lineTo(xPos + blockSize - padding - radius, yPos + padding);
  ctx.quadraticCurveTo(
    xPos + blockSize - padding,
    yPos + padding,
    xPos + blockSize - padding,
    yPos + padding + radius
  );
  ctx.lineTo(xPos + blockSize - padding, yPos + padding + blockSize * 0.3);
  ctx.lineTo(xPos + padding, yPos + padding + blockSize * 0.3);
  ctx.lineTo(xPos + padding, yPos + padding + radius);
  ctx.quadraticCurveTo(
    xPos + padding,
    yPos + padding,
    xPos + padding + radius,
    yPos + padding
  );
  ctx.closePath();

  const topHighlight = ctx.createLinearGradient(
    xPos + padding,
    yPos + padding,
    xPos + padding,
    yPos + padding + blockSize * 0.3
  );
  topHighlight.addColorStop(0, "rgba(255, 255, 255, 0)");
  topHighlight.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = topHighlight;
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(xPos + padding, yPos + padding + radius);
  ctx.lineTo(xPos + padding, yPos + blockSize - padding - radius);
  ctx.quadraticCurveTo(
    xPos + padding,
    yPos + blockSize - padding,
    xPos + padding + radius,
    yPos + blockSize - padding
  );
  ctx.lineTo(xPos + padding + blockSize * 0.3, yPos + blockSize - padding);
  ctx.lineTo(xPos + padding + blockSize * 0.3, yPos + padding);
  ctx.lineTo(xPos + padding + radius, yPos + padding);
  ctx.quadraticCurveTo(
    xPos + padding,
    yPos + padding,
    xPos + padding,
    yPos + padding + radius
  );
  ctx.closePath();

  const leftHighlight = ctx.createLinearGradient(
    xPos + padding,
    yPos + padding,
    xPos + padding + blockSize * 0.3,
    yPos + padding
  );
  leftHighlight.addColorStop(0, "rgba(255, 255, 255, 0)");
  leftHighlight.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = leftHighlight;
  ctx.fill();
  ctx.restore();
}

function calculateDropSpeed(level) {
  level = level - 1;
  const currentMode = GAME_CONFIG.GAME_MODES[GAME_CONFIG.CURRENT_MODE];
  let multiplier = Math.min(
    1 + level * currentMode.speed_factor,
    currentMode.base_speed / currentMode.min_speed
  );
  multiplier = multiplier.toFixed(1);
  const interval = Math.max(
    currentMode.min_speed,
    Math.floor(currentMode.base_speed / multiplier)
  );

  return {
    interval,
    multiplier,
  };
}

window.GAME_CONFIG = GAME_CONFIG;
window.create2DArray = create2DArray;
window.deepClone = deepClone;
window.rotateMatrix = rotateMatrix;
window.isValidMove = isValidMove;
window.formatNumber = formatNumber;
window.drawBlock = drawBlock;
window.getCellSize = getCellSize;
window.getPreviewCellSize = getPreviewCellSize;
window.calculateDropSpeed = calculateDropSpeed;
window.getRandomPiece = getRandomPiece;

function setGameMode(mode) {
  if (GAME_CONFIG.GAME_MODES[mode]) {
    GAME_CONFIG.CURRENT_MODE = mode;
    console.log(`Game mode has been switched to: ${GAME_CONFIG.GAME_MODES[mode].name}`);
    return GAME_CONFIG.GAME_MODES[mode];
  } else {
    console.error(`Unknown game mode: ${mode}`);
    return GAME_CONFIG.GAME_MODES[GAME_CONFIG.CURRENT_MODE];
  }
}

function getCurrentGameMode() {
  return GAME_CONFIG.GAME_MODES[GAME_CONFIG.CURRENT_MODE].name;
}
window.setGameMode = setGameMode;
window.getCurrentGameMode = getCurrentGameMode;
