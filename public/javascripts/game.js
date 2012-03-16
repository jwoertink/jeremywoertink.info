// jQuery 1.4.2+ is required
// Create the main game object
var Game = {};
Game.characters = [];
//w=119 a=97 s=115 d=100 space=32
Game.controls = {115: "down", 100: "right", 119: "up", 97: "left", 32: 'space'};
Game.currentMap = null;

// This is for the debug area. could use console later
Game.log = $('#console');
// The main canvas window
Game.canvas = $('#game')[0];
// the main context
Game.handle = Game.canvas.getContext('2d');

// the debugger function
Game.debug = function(message, _console) {
  if(_console) {
   window.console.log(message);
  } else {
    var now = new Date();
    timestamp = (now.getHours()) + ':' + (now.getMinutes() + 1) + ':' + (now.getSeconds() + 1);
    Game.log.prepend('<p>'+timestamp+'&raquo;&nbsp;' + message + '</p>');
  }
};

Game.setMap = function(mapData) {
	Game.currentMap = mapData;
	Game.canvas.height = window.innerHeight;
	Game.canvas.width = window.innerWidth;
}

Game.screen = {
  width: Game.canvas.width,
  height: Game.canvas.height,
  tilesX: Game.canvas.width / 16, // size of tile width 
  tilesY: Game.canvas.height / 16 // size of tile height
};

Game.viewport = {
  x: 0,
  y: 0,
	playerOffsetX: 0,
	playerOffsetY: 0,
	overflowTile: 1
};

Game.tile = {
  draw: function(x, y, tile) {
  	var img = Game.tile.retrieve(tile.ground);
		var rx = x * 16 + Game.viewport.playerOffsetX;
		var ry = y * 16 + Game.viewport.playerOffsetY;
  	Game.handle.drawImage(img, rx, ry);
  	if(tile.item) {
    	Game.handle.drawImage(Game.tile.retrieve(tile.item), rx, ry);
  	}
  },
  images: [],
  store: function(id, imgSrc) {
    var newid = Game.tile.images.length;
    var tile = [id, new Image(), false];
    tile[1].src = imgSrc;
    tile[1].onload = function() {
      tile[2] = true;
    }
    Game.tile.images[newid] = tile
  },
  retrieve: function(id) {
    var i, len = Game.tile.images.length;
    
    for(i=0; i < len; i++) {
      if(Game.tile.images[i][0] == id) {
        return Game.tile.images[i][1];
      }
    }
  },
  allLoaded: function() {
    var i, len = Game.tile.images.length;
    for(i=0;i<len;i++) {
      if(Game.tile.images[i][2] == false) {
        return false;
      }
    }
    
    return true;
  }
};

Game.map = {
  draw: function() {
    var xPos, yPos, tile;
    var mapX = 0;
    var mapY = 0;
    
		var iMax = Game.screen.tilesX + Game.viewport.overflowTile;
		var jMax = Game.screen.tilesY + Game.viewport.overflowTile;

    // Game.debug('drawing map from ' + Game.viewport.x + ',' + Game.viewport.y + ' to ' +  (Game.viewport.x + Game.screen.tilesX) + ',' + (Game.viewport.y + Game.screen.tilesY), true);
    
    for(yPos = -Game.viewport.overflowTile; yPos < jMax; yPos++) {
      for(xPos = -Game.viewport.overflowTile; xPos < iMax; xPos++) {
        mapX = xPos + Game.viewport.x;
        mapY = yPos + Game.viewport.y;
        tile = (Game.currentMap[mapY] && Game.currentMap[mapY][mapX]) ? Game.currentMap[mapY][mapX] : {ground: 0};
        Game.tile.draw(xPos, yPos, tile);
      }
    }
  }
};

Game.draw = function(mapData) {
  if(Game.tile.allLoaded() === false) {
    setTimeout(Game.draw, 100);
  } else {
    Game.map.draw();
		Game.player.draw();
  }
}

Game.start = function(mapData, x, y) {
  Game.handle.translate(0,0);
  Game.debug('loading...');
  Game.viewport.x = x;
  Game.viewport.y = y;
  Game.tile.store(0, '/images/tile_black.png');
  Game.tile.store(1, '/images/tile_grass.png');
  Game.tile.store(2, '/images/tile_rock.png');
	Game.tile.store(3, '/images/ladderdown.png');
	Game.tile.store(4, '/images/ladderup.png');
	Game.tile.store(5, '/images/cave.png');
	Game.tile.store(6, '/images/sign.png');
	Game.setMap(mapData);
	
	Game.player.store(0, '/images/scientist_n0.png');
	Game.player.store(1, '/images/scientist_n1.png');
	Game.player.store(2, '/images/scientist_n2.png');
	Game.player.store(3, '/images/scientist_e0.png');
	Game.player.store(4, '/images/scientist_e1.png');
	Game.player.store(5, '/images/scientist_e2.png');
	Game.player.store(6, '/images/scientist_s0.png');
	Game.player.store(7, '/images/scientist_s1.png');
	Game.player.store(8, '/images/scientist_s2.png');
	Game.player.store(9, '/images/scientist_w0.png');
	Game.player.store(10,'/images/scientist_w1.png');
	Game.player.store(11,'/images/scientist_w2.png');
	
  Game.draw();
	Game.keyboard.canInput = true;
  Game.debug('complete');
	Game.debug('Walk using W A S D, and the spacebar for actions.');
};

Game.keyboard = {
	canInput: false
};
//keydown
//w=87 a=65 s=83 d=68 space=32
//keypress
//w=119 a=97 s=115 d=100 space=32
Game.keyboard.getValue = function(key) {
   switch(key) {
      case 'up':    return 119;
      case 'down':  return 115;
      case 'left':  return 97;
      case 'right': return 100;
			case 'space': return 32;

      // more keys here later
   }
};

Game.keyboard.parseInput = function(event) {
	var code = (event.keyCode ? event.keyCode : event.which);
	if(Game.keyboard.canInput === true) {
		switch(code) {
			case Game.keyboard.getValue('up'):
				Game.player.move('up');
				break;
			case Game.keyboard.getValue('down'):
				Game.player.move('down');
				break;
			case Game.keyboard.getValue('left'):
				Game.player.move('left');
				break;
			case Game.keyboard.getValue('right'):
				Game.player.move('right');
				break;
			case Game.keyboard.getValue('space'):
				Game.player.activate();
				break;
		}
	}

	Game.draw();
};

Game.player = {
	leftLeg: false
};
Game.player.sprite = [];
Game.player.spriteIndex = 6;

Game.player.store = function(index, imgSrc) {
	var sprite = [new Image(), false];
	sprite[0].src = imgSrc;
	sprite[0].onload = function() {
		sprite[1] = true;
	}
	
	Game.player.sprite[index] = sprite;
}

Game.player.retrieve = function(index) {
	return Game.player.sprite[index][0];
}

Game.player.allLoaded = function() {
	var i;
	for(i=0; i < 12; i++) {
		if(Game.player.sprite[i][1] === false) {
			return false;
		}
	}
	
	return true;
}

Game.player.calcLoc = function() {
	var character = {
		width: Math.ceil(Game.player.sprite[0][0].width),
		height: Math.ceil(Game.player.sprite[0][0].height)
	};
	var screen = {
		width: Game.screen.width,
		height: Game.screen.height
	};
	var x = (screen.width / 2) - (character.width / 2);
	var y = (screen.height / 2) + 8 - (character.height);
	
	return {left: x, top: y};
}

Game.player.draw = function() {
	var loc = Game.player.calcLoc();
	Game.handle.drawImage(Game.player.sprite[Game.player.spriteIndex][0], loc.left, loc.top);
}

Game.player.move = function(direction) {
	var index, x, y;
	index = x = y = 0;
	Game.keyboard.canInput = false;
	
	switch(direction) {
		case 'up': index = 0; y = 1; break;
		case 'right' : index = 3; x = -1; break;
		case 'left' : index = 9; x = 1; break;
		case 'down' : index = 6; y = -1; break;
	}
	var toX = Game.viewport.x + (Game.screen.tilesX / 2 - 0.5) - x;
	var toY = Game.viewport.y + (Game.screen.tilesY / 2 - 0.5) - y;
	
	if(Game.currentMap[toY] && 
		Game.currentMap[toY][toX].item && 
		(Game.currentMap[toY][toX].item == 2 ||
		 Game.currentMap[toY][toX].item == 6)) {
		Game.keyboard.canInput = true;
	} else {
		Game.viewport.playerOffsetX = x * 5;
		Game.viewport.playerOffsetY = y * 5;
		setTimeout(Game.player.animate, 100);
		setTimeout(Game.player.reset, 200);
	}
	
	Game.player.spriteIndex = index;	
	Game.draw();
}

Game.player.animate = function() {
	var x, y;
	
	x = y = 0;
	
	switch(Game.player.spriteIndex) {
		case 0: y = 11; break;
		case 3: x = -11; break;
		case 6: y = -11; break;
		case 9: x = 11; break;
	}
	
	Game.player.spriteIndex += (Game.player.leftLeg === true) ? 1 : 2;
	Game.player.leftLeg = !Game.player.leftLeg;
	Game.viewport.playerOffsetX = x;
	Game.viewport.playerOffsetY = y;
	Game.draw();
}

Game.player.reset = function() {
	var index, x, y;
	x = Game.viewport.x;
	y = Game.viewport.y;
	index = 0;
	
	switch(Game.player.spriteIndex) {
		case 1:
		case 2: y--; index = 0; break;
		case 4:
		case 5: x++; index = 3; break;
		case 7:
		case 8: y++; index = 6; break;
		case 10:
		case 11: x--; index = 9; break;
	}
	
	Game.viewport.x = x;
	Game.viewport.y = y;
	Game.keyboard.canInput = true;
	Game.viewport.playerOffsetX = 0;
	Game.viewport.playerOffsetY = 0;
	Game.player.spriteIndex = index;
	Game.draw();
	
	var tileX = x + (Game.screen.tilesX / 2 - 0.5);
	var tileY = y + (Game.screen.tilesY / 2 - 0.5);

	if(Game.currentMap[tileY] && Game.currentMap[tileY][tileX] && Game.currentMap[tileY][tileX].onenter != undefined) {
		Game.script.call[Game.currentMap[tileY][tileX].onenter]();
	}
}

Game.player.activate = function() {
	var x = Game.viewport.x + (Game.screen.tilesX / 2 - 0.5);
	var y = Game.viewport.y + (Game.screen.tilesY / 2 - 0.5);
	
	switch(Game.player.spriteIndex) {
		case 0: y--; break;
    case 3: x++; break;
    case 6: y++; break;
    case 9: x--; break;
	}
	
	if(Game.currentMap[y] &&
		 Game.currentMap[y][x] &&
		 Game.currentMap[y][x].onactivate != undefined) {
		Game.script.call[Game.currentMap[y][x].onactivate]();	
	}
}
Game.script = {};

Game.script.call = [
	function() {
		Game.setMap(maptwo);
		Game.viewport.x = -2;
		Game.viewport.y = 1;
		Game.player.spriteIndex = 6;
		
		Game.draw();
	},
	function() {
		Game.setMap(mapone);
		Game.viewport.x = -2;
		Game.viewport.y = 5;
		Game.player.spriteIndex = 6;
		
		Game.draw();
	},
  function() {
		Game.debug('WTF DOES THIS SAY?!?');
		//alert("Im in ur cave, scriptin' ur scientist");
  }
];
