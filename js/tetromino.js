class Tetromino {
  constructor(type) {
    if (!GAME_CONFIG.SHAPES[type]) {
      throw new Error(`Invalid tetromino type: ${type}`);
    }

    this.type = type;
    this.shape = deepClone(GAME_CONFIG.SHAPES[type]);
    this.color = type;
    this.x = 0;
    this.y = 0;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }
  
  rotate() {
    const rows = this.shape[0].length;
    const cols = this.shape.length;
    const newShape = Array(rows)
      .fill()
      .map(() => Array(cols).fill(0));

    for (let y = 0; y < cols; y++) {
      for (let x = 0; x < rows; x++) {
        newShape[x][cols - 1 - y] = this.shape[y][x];
      }
    }

    return newShape;
  }

  getCollisionPoints() {
    const points = [];
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          points.push({
            x: this.x + x,
            y: Math.floor(this.y) + y,
          });
        }
      }
    }
    return points;
  }

  draw(ctx, isGhost = false) {
    const cellSize = getCellSize();

    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x]) {
          drawBlock(
            ctx,
            this.x + x,
            this.y + y,
            this.type,
            cellSize,
            null,
            isGhost
          );
        }
      }
    }
  }

  drawPreview(ctx) {
    const size = getPreviewCellSize();
    const shape = this.shape;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const blockWidth = shape[0].length * size;
    const blockHeight = shape.length * size;
    const startX = (ctx.canvas.width - blockWidth) / 2 / size;
    const startY = (ctx.canvas.height - blockHeight) / 2 / size;

    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          drawBlock(ctx, startX + col, startY + row, this.type, size);
        }
      }
    }
  }

  getGhost(board) {
    if (!board) return null;
	
    const ghost = new Tetromino(this.type);
    ghost.shape = [...this.shape]; 
    ghost.x = this.x;
    ghost.y = this.y;

    while (isValidMove(board, ghost.shape, ghost.x, ghost.y + 1)) {
      ghost.y++;
    }

    if (ghost.y === this.y) {
      return null;
    }

    return ghost;
  }

  clone() {
    try {
      const clone = new Tetromino(this.type);
      if (!clone || !this.shape) return null;

      clone.shape = deepClone(this.shape);
      clone.x = this.x;
      clone.y = this.y;
      return clone;
    } catch (error) {
      console.error("Error cloning piece:", error);
      return null;
    }
  }

  tryWallKick(board, newShape) {
	  
    const offsets = [
      { x: 0, y: 0 }, 
      { x: -1, y: 0 }, 
      { x: 1, y: 0 }, 
      { x: 0, y: -1 }, 
      { x: -2, y: 0 }, 
      { x: 2, y: 0 }, 
    ];

    for (const offset of offsets) {
      if (isValidMove(board, newShape, this.x + offset.x, this.y + offset.y)) {
        this.x += offset.x;
        this.y += offset.y;
        this.shape = newShape;
        return true;
      }
    }

    return false;
  }
}

window.Tetromino = Tetromino;
