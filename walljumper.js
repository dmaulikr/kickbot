var canvas = document.getElementById("game");

var manifest = {
	"images": {
		"spikes": "images/spikes.png",
		"bg": "images/bg.png",
	},
	"sounds": {
		"jump1": "audio/jump1.wav",
		"jump2": "audio/jump2.wav",
		"jump3": "audio/jump3.wav",
		"jump4": "audio/jump4.wav",
		"jump5": "audio/jump5.wav",
		"laser": "audio/laser.wav",
		"spikes": "audio/spikes.wav",
		"music": "audio/Rolemusic_-_01_-_A_ninja_among_culturachippers-mono-loop.mp3",
	},
	"fonts": [
		"pixelade"
	],
	"animations": {
		"arrow-left": {
			"strip": "images/arrow-key-sprite.png",
			"frames": 2,
			"msPerFrame": 500
		},
		"arrow-right": {
			"strip": "images/arrow-key-sprite.png",
			"frames": 2,
			"msPerFrame": 500,
			"flip": "horizontal"
		},
		"tap-left": {
			"strip": "images/tap-icons-sprite.png",
			"frames": 2,
			"msPerFrame": 500
		},
		"tap-right": {
			"strip": "images/tap-icons-sprite.png",
			"frames": 2,
			"msPerFrame": 500,
			"flip": "horizontal"
		},
		"laser-left": {
			"strip": "images/laser-anim.png",
			"frames": 12,
			"msPerFrame": 70
		},
		"laser-right": {
			"strip": "images/laser-anim.png",
			"frames": 12,
			"msPerFrame": 70,
			"flip": "horizontal"
		},
		"player-left": {
			"strip": "images/player.png",
			"frames": 1,
			"msPerFrame": 70
		},
		"player-right": {
			"strip": "images/player.png",
			"frames": 1,
			"msPerFrame": 70,
			"flip": "horizontal"
		},
		"wall-1-left": {
			"strip": "images/wall1.png",
			"frames": 1,
			"msPerFrame": 300
		},
		"wall-1-right": {
			"strip": "images/wall1.png",
			"frames": 1,
			"msPerFrame": 300,
			"flip": "horizontal"
		},
		"wall-2-left": {
			"strip": "images/wall2.png",
			"frames": 1,
			"msPerFrame": 300
		},
		"wall-2-right": {
			"strip": "images/wall2.png",
			"frames": 1,
			"msPerFrame": 300,
			"flip": "horizontal"
		},
		"player-slide-left": {
			"strip": "images/player-slide-anim.png",
			"frames": 8,
			"msPerFrame": 100
		},
		"player-slide-right": {
			"strip": "images/player-slide-anim.png",
			"frames": 8,
			"msPerFrame": 100,
			"flip": "horizontal"
		},
		"window-1-left": {
			"strip": "images/wall-grate.png",
			"frames": 1,
			"msPerFrame": 300
		},
		"window-1-right": {
			"strip": "images/wall-grate.png",
			"frames": 1,
			"msPerFrame": 300,
			"flip": "horizontal"
		},
		"window-2-left": {
			"strip": "images/window-robot-2f.png",
			"frames": 2,
			"msPerFrame": 300
		},
		"window-2-right": {
			"strip": "images/window-robot-2f.png",
			"frames": 2,
			"msPerFrame": 300,
			"flip": "horizontal"
		},
		"window-3-left": {
			"strip": "images/window-scientist1.png",
			"frames": 2,
			"msPerFrame": 300
		},
		"window-3-right": {
			"strip": "images/window-scientist1.png",
			"frames": 2,
			"msPerFrame": 300,
			"flip": "horizontal"
		},
		"window-4-left": {
			"strip": "images/window-scientist2.png",
			"frames": 2,
			"msPerFrame": 300
		},
		"window-4-right": {
			"strip": "images/window-scientist2.png",
			"frames": 2,
			"msPerFrame": 300,
			"flip": "horizontal"
		},
		"window-5-left": {
			"strip": "images/window-scientist3.png",
			"frames": 2,
			"msPerFrame": 300
		},
		"window-5-right": {
			"strip": "images/window-scientist3.png",
			"frames": 2,
			"msPerFrame": 300,
			"flip": "horizontal"
		},
	}
};

var game = new Splat.Game(canvas, manifest);

var player;

var walls = [];
var obstacles = [];
var onWall;
var dead = false;
var waitingToStart = true;
var wallImages = ["wall-1", "wall-2"];
var windowImages = ["window-1", "window-2", "window-3", "window-4", "window-5"];
var jumpSounds = ["jump1", "jump2", "jump3", "jump4", "jump5"];
var bgY = 0;
var score = 0;
var best = 0;

function drawFlipped(context) {
	context.save();
	context.scale(-1, 1);
	context.drawImage(this.sprite, -this.x - this.sprite.width, this.y);
	context.restore();
}

function jumpSound() {
	var i = Math.random() * jumpSounds.length |0;
	game.sounds.play(jumpSounds[i]);
}

function chooseWall(y, possibleWalls, isLeft) {
	var i = Math.random() * possibleWalls.length |0;
	var name = isLeft ? "-left" : "-right";
	var anim = game.animations.get(possibleWalls[i] + name);
	var x = 0;
	if (!isLeft) {
		x = canvas.width - anim.width;
	}
	var wall = new Splat.AnimatedEntity(x, y, anim.width, anim.height, anim, 0, 0);
	walls.push(wall);
}

function makeWall(y) {
	var hasObstacle = Math.random() > 0.6;

	var lastLeftWall = walls[walls.length - 2];
	var lastLeftWallIsWindow = false;
	if (lastLeftWall) {
		lastLeftWallIsWindow = lastLeftWall.sprite.name.indexOf("window") > -1;
	}
	var lastRightWall = walls[walls.length - 1];
	var lastRightWallIsWindow = false;
	if (lastRightWall) {
		lastRightWallIsWindow = lastRightWall.sprite.name.indexOf("window") > -1;
	}

	function getWindowImages(isLeft) {
		if ((isLeft && lastLeftWallIsWindow) || (!isLeft && lastRightWallIsWindow)) {
			return wallImages;
		}
		return Math.random() > 0.9 ? windowImages : wallImages;
	}

	if (hasObstacle) {
		var onRight = Math.random() > 0.5;
		chooseWall(y, onRight ? getWindowImages(true) : wallImages, true);
		chooseWall(y, onRight ? wallImages : getWindowImages(false), false);

		var img;
		var obstacle;

		var wallImg = game.animations.get("wall-1-left");
		var x = wallImg.width - 8;
		if (Math.random() > 0.5) {
			img = game.animations.get(onRight ? "laser-right" : "laser-left");
			obstacle = new Splat.AnimatedEntity(x, y, img.width, img.height, img, 0, 0);
		} else {
			img = game.images.get("spikes");
			obstacle = new Splat.AnimatedEntity(x, y, img.width, img.height, img, 0, 0);
			if (onRight) {
				obstacle.draw = drawFlipped;
			}
		}
		if (onRight) {
			obstacle.x = canvas.width - wallImg.width - img.width + 8;
		}
		obstacles.push(obstacle);
	} else {
		chooseWall(y, getWindowImages(true), true);
		chooseWall(y, getWindowImages(false), false);
	}
}

function populateWallsUp(scene) {
	var wallH = game.animations.get("wall-1-left").height;
	if (walls.length == 0) {
		makeWall(scene.camera.y + scene.camera.height - wallH);
	}
	while (walls[walls.length - 1].y + walls[walls.length - 1].height > scene.camera.y) {
		makeWall(walls[walls.length - 1].y - wallH);
	}
	while (walls[0].y > scene.camera.y + scene.camera.height) {
		walls.shift();
	}
	while (obstacles.length > 0 && obstacles[0].y > scene.camera.y + scene.camera.height) {
		obstacles.shift();
	}
}
function populateWallsDown(scene) {
	var wallH = game.animations.get("wall-1-left").height;
	if (walls.length == 0) {
		makeWall(scene.camera.y);
	}
	while (walls[0].y < scene.camera.y + scene.camera.height) {
		makeWall(walls[0].y + wallH);
		walls.unshift(walls.pop());
		walls.unshift(walls.pop());
	}
	while (walls[walls.length - 1].y + walls[walls.length - 1].height < scene.camera.y) {
		walls.pop();
	}
	obstacles = [];
}

function oscillate(current, period, height) {
	return Math.sin(current / period * Math.PI) * height;
}

function centerText(context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) |0;
	var y = offsetY |0;
	context.fillText(text, x, y);
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	walls = [];
	obstacles = [];
	waitingToStart = true;
	dead = false;
	this.camera.y = 0;
	score = 0;

	var wallW = game.animations.get("wall-1-left").width;
	var playerImg = game.animations.get("player-slide-left");
	player = new Splat.AnimatedEntity(wallW, canvas.height / 2, 40, 130, playerImg, -30, -13);

	this.clearTimers();

	game.animations.get("arrow-left").reset();
	game.animations.get("arrow-right").reset();
	game.animations.get("arrow-right").frame = 1;
	game.animations.get("tap-left").reset();
	game.animations.get("tap-right").reset();
	game.animations.get("tap-right").frame = 1;
},
function(elapsedMillis) {
	if (waitingToStart) {
		this.camera.vy = 0.6;
		player.vy = this.camera.vy;
		if (game.keyboard.isPressed("left") || game.keyboard.isPressed("right") || game.mouse.buttons[0]) {
			game.sounds.play("music", true);
			waitingToStart = false;
			this.camera.vy = -0.6;
		}
		game.animations.get("arrow-left").move(elapsedMillis);
		game.animations.get("arrow-right").move(elapsedMillis);
		game.animations.get("tap-left").move(elapsedMillis);
		game.animations.get("tap-right").move(elapsedMillis);
	}

	bgY -= this.camera.vy / 1.5 * elapsedMillis;
	var bgH = game.images.get("bg").height;
	if (bgY > bgH) {
		bgY -= bgH;
	}

	if (player.y > this.camera.y + this.camera.height) {
		if (!dead) {
			game.sounds.play("spikes");
		}
		dead = true;

		var ftb = this.timer("fade to black");
		if (ftb > 2000) {
			game.scenes.switchTo("title");
		}
		if (!ftb) {
			this.startTimer("fade to black");
		}

		this.camera.vy = 0;
		return;
	}

	for (var i = 0; i < walls.length; i++) {
		walls[i].move(elapsedMillis);
	}
	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].move(elapsedMillis);
	}
	if (this.camera.vy > 0) {
		populateWallsDown(this);
	} else {
		populateWallsUp(this);
	}

	// gravity
	if (!waitingToStart) {
		player.vy += elapsedMillis * 0.003;
	}
	if (onWall && !dead && !waitingToStart && player.vy > 0.5) {
		player.vy = 0.5;
	}

	var lju = this.timer("left jump up");
	if (lju > 200) {
		this.stopTimer("left jump up");
		lju = 0;
	}
	if (lju > 0) {
		player.vx = oscillate(lju + 100, 200, 1);
	}

	var rju = this.timer("right jump up");
	if (rju > 200) {
		this.stopTimer("right jump up");
		rju = 0;
	}
	if (rju > 0) {
		player.vx = -oscillate(rju + 100, 200, 1);
	}

	player.move(elapsedMillis);

	onWall = undefined;
	for (var i = 0; i < walls.length; i++) {
		var wall = walls[i];
		if (player.collides(wall)) {
			player.resolveLeftCollisionWith(wall);
			player.resolveRightCollisionWith(wall);
			player.resolveTopCollisionWith(wall);
			this.stopTimer("left jump up");
			this.stopTimer("right jump up");

			if (player.overlapsVert(wall)) {
				onWall = wall;
			}
		}
	}
	if (dead) {
		return;
	}
	if (onWall) {
		var wallIsOnLeft = player.x > onWall.x;
		if (wallIsOnLeft) {
			player.sprite = game.animations.get("player-slide-left");
		} else {
			player.sprite = game.animations.get("player-slide-right");
		}
	} else {
		if (player.vx > 0) {
			player.sprite = game.animations.get("player-left");
		} else if (player.vx < 0) {
			player.sprite = game.animations.get("player-right");
		}
	}

	for (var i = 0; i < obstacles.length; i++) {
		var obstacle = obstacles[i];
		if (!obstacle.counted && obstacle.y > player.y + player.height) {
			score++;
			if (score > best) {
				best = score;
			}
			obstacle.counted = true;
		}
		if (player.collides(obstacle)) {
			if (!this.timer("flash")) {
				if (obstacle.sprite == game.animations.get("laser-left") || obstacle.sprite == game.animations.get("laser-right")) {
					game.sounds.play("laser");
				} else if (obstacle.sprite == game.images.get("spikes")) {
					game.sounds.play("spikes");
				}
			}
			this.startTimer("flash");
			dead = true;
			return;
		}
	}

	if (onWall) {
		var wallIsOnLeft = player.x > onWall.x;

		var left = false;
		var right = false;
		if (game.mouse.buttons[0]) {
			if (game.mouse.x < canvas.width / 2) {
				left = true;
			} else {
				right = true;
			}
			game.mouse.buttons[0] = false;
		} else if (game.keyboard.consumePressed("left")) {
			left = true;
		} else if (game.keyboard.consumePressed("right")) {
			right = true;
		}

		if (left) {
			if (wallIsOnLeft) {
				this.startTimer("left jump up");
			} else {
				player.vx = -1.0;
			}
			player.vy = -1.5;
			onWall = undefined;
			jumpSound();
		} else if (right) {
			if (wallIsOnLeft) {
				player.vx = 1.0;
			} else {
				this.startTimer("right jump up");
			}
			player.vy = -1.5;
			onWall = undefined;
			jumpSound();
		}
	}
},
function(context) {
	this.camera.drawAbsolute(context, function() {
		var bg = game.images.get("bg");
		for (var y = bgY - bg.height; y <= canvas.height; y += bg.height)  {
			context.drawImage(bg, 0, y);
		}
	});

	for (var i = 0; i < walls.length; i++) {
		walls[i].draw(context);
	}
	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].draw(context);
	}
	player.draw(context);

	var flashTime = this.timer("flash");
	var flashLen = 150;
	if (flashTime > flashLen) {
		this.stopTimer("flash");
		flashTime = 0;
	}
	if (flashTime > 0) {
		var opacity = oscillate(this.timer("flash"), flashLen, 1);
		context.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
		context.fillRect(this.camera.x, this.camera.y, canvas.width, canvas.height);
	}

	var ftb = this.timer("fade to black");
	if (ftb > 0) {
		var opacity = ftb / 1000;
		context.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
		context.fillRect(this.camera.x, this.camera.y, canvas.width, canvas.height);

		this.camera.drawAbsolute(context, function() {
			context.fillStyle = "#ffffff";
			context.font = "50px pixelade";
			centerText(context, "SCORE", 0, 300);
			context.font = "100px pixelade";
			centerText(context, score, 0, 400);
			context.font = "50px pixelade";
			centerText(context, "BEST", 0, 600);
			context.font = "100px pixelade";
			centerText(context, best, 0, 700);
		});
		return;
	}

	if (waitingToStart) {
		this.camera.drawAbsolute(context, function() {
			var isTouch = game.mouse.supportsTouch();
			var arrow = game.animations.get(isTouch ? "tap-left" : "arrow-left");
			var x = (canvas.width / 4);
			arrow.draw(context, x, canvas.height * 3 / 4);

			x = canvas.width - (canvas.width / 4) - arrow.width;
			game.animations.get(isTouch ? "tap-right" : "arrow-right").draw(context, x, canvas.height * 3 / 4);
		});
	}
	this.camera.drawAbsolute(context, function() {
		context.fillStyle = "#ffffff";
		context.font = "100px pixelade";
		centerText(context, score, 0, 100);
	});
}));

game.scenes.switchTo("loading");
