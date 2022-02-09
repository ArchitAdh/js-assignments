let levels = [];

levels[0] = {
  map: [
    // a 0 represents a floor tile.
    // a 1 represents a wall tile.

    [1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
  ],

  //player coordinate -- bottom left corner (0,4)
  player: {
    x: 0,
    y: 4,
  },

  //goal coordinate -- close to top right corner (4,1)

  goal: {
    x: 4,
    y: 1,
  },

  theme: "default",
};

//contains the key properties and methods that will make our game run.
class Game {
  constructor(id, level) {
    this.el = document.getElementById(id);
    this.tileTypes = ["floor", "wall"];

    //tile dimension
    this.tileDim = 32;

    // inherit the level's properties: map, player start, goal start.
    this.map = level.map;
    this.theme = level.theme;
    this.player = { ...level.player };
    this.goal = { ...level.goal };

    this.player.el = null;
  }

  populateMap = () => {
    this.el.className = "game-container " + this.theme;

    let tiles = document.getElementById("tiles");

    for (let y = 0; y < this.map.length; ++y) {
      for (let x = 0; x < this.map[y].length; ++x) {
        let tileCode = this.map[y][x];
        let tileType = this.tileTypes[tileCode];

        let tile = this.createEl(x, y, tileType);
        tiles.appendChild(tile);
      }
    }
  };

  //   x and y to specify the tile’s location
  // tileType to specify whether it is a floor or wall tile
  createEl = (x, y, type) => {
    let el = document.createElement("div");
    el.className = type;
    el.style.width = el.style.height = this.tileDim + "px";
    el.style.left = x * this.tileDim + "px";
    el.style.top = y * this.tileDim + "px";
    return el;
  };

  //Fix the layout
  sizeUp = () => {
    let map = this.el.querySelector(".game-map");
    map.style.height = this.map.length * this.tileDim + "px";
    map.style.width = this.map[0].length * this.tileDim + "px";
  };

  //player and goal sprites
  placeSprite = (type) => {
    //'this' to reference myGame

    let x = this[type].x;
    let y = this[type].y;

    //  create sprite
    let sprite = this.createEl(x, y, type);
    sprite.id = type;
    sprite.style.borderRadius = this.tileDim + "px";

    //  append to sprites layer
    let layer = this.el.querySelector("#sprites");
    layer.appendChild(sprite);
    return sprite;
  };

  //keyboard listener
  keyboardListeners = () => {
    document.addEventListener("keydown", (e) => {
      this.movePlayer(e);
      this.checkGoal();
    });
  };

  //move player
  movePlayer = (e) => {
    e.preventDefault();
    //  to prevent unwanted default actions resulting from the key presses, like scrolling.

    if (e.keyCode < 37 || e.keyCode > 40) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        this.moveLeft();
        break;

      case 38:
        this.moveUp();
        break;

      case 39:
        this.moveRight();
        break;

      case 40:
        this.moveDown();
        break;
    }
  };

  //   MOVEMENT HELPERS
  //move up
  moveUp = () => {
    //boundary
    if (this.player.y == 0) {
      return;
    }

    //wall detection
    let nextTile = this.map[this.player.y - 1][this.player.x];
    if (nextTile == 1) {
      return;
    }

    this.player.y -= 1;
    this.updateVert();
  };

  //move down
  moveDown = () => {
    //boundary
    if (this.player.y == this.map.length - 1) {
      return;
    }

    //  wall detection
    let nextTile = this.map[this.player.y + 1][this.player.x];
    if (nextTile == 1) {
      return;
    }

    this.player.y += 1;
    this.updateVert();
  };

  //move left
  moveLeft = () => {
    //boundary
    if (this.player.x == 0) {
      return;
    }

    //  wall detection
    let nextTile = this.map[this.player.y][this.player.x - 1];
    if (nextTile == 1) {
      return;
    }

    this.player.x -= 1;
    this.updateHoriz();
  };

  //move right
  moveRight = () => {
    //boundary
    if (this.player.x == this.map[this.player.y].length - 1) {
      return;
    }

    //wall detection
    let nextTile = this.map[this.player.y][this.player.x + 1];

    if (nextTile == 1) {
      return;
    }

    this.player.x += 1;
    this.updateHoriz();
  };

  //update vertical movements
  updateVert = () => {
    this.player.el.style.top = this.player.y * this.tileDim + "px";
  };

  //update horizontal movements
  updateHoriz = () => {
    this.player.el.style.left = this.player.x * this.tileDim + "px";
  };

  //GOAL DETECTION
  checkGoal = () => {
    let body = document.querySelector("body");

    if (this.player.y == this.goal.y && this.player.x == this.goal.x) {
      body.className = "success";
    } else {
      body.className = "";
    }
  };
}

//Start the game
function init() {
  let myGame = new Game("game-container-1", levels[0]);
  myGame.populateMap();
  myGame.sizeUp();
  myGame.placeSprite("goal");

  //capture element in playerSprite variable
  let playerSprite = myGame.placeSprite("player");
  //assign playerSprite to the player's el property
  myGame.player.el = playerSprite;

  myGame.keyboardListeners();
}

init();
