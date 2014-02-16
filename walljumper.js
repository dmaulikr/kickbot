var canvas = document.getElementById("game");

var manifest = {
	"images": {
		"wall1": "images/wall1.png",
		"wall2": "images/wall2.png",
		"laser": "images/laser.png",
		"bg": "images/bg.png",
	},
	"sounds": {
	},
	"fonts": [
	],
	"animations": {
	}
};

var game = new Splat.Game(canvas, manifest);

var player;

var walls = [];
var obstacles = [];
var onWall;
var dead = false;

var bgY = 0;

function drawFlipped(context) {
	context.save();
	context.scale(-1, 1);
	context.drawImage(this.sprite, -this.x - this.sprite.width, this.y);
	context.restore();
}

function makeWall(y) {
	var wallImg = game.images.get(Math.random() > 0.5 ? "wall1" : "wall2");
	var wall = new Splat.AnimatedEntity(0, y, wallImg.width, wallImg.height, wallImg, 0, 0);
	walls.push(wall);

	wall = new Splat.AnimatedEntity(canvas.width - wallImg.width, y, wallImg.width, wallImg.height, wallImg, 0, 0);
	wall.draw = drawFlipped;
	walls.push(wall);

	if (Math.random() > 0.8) {
		var img = game.images.get("laser");
		var laser = new Splat.AnimatedEntity(wallImg.width - 8, y, img.width, img.height, img, 0, 0);
		if (Math.random() > 0.5) {
			laser.draw = drawFlipped;
			laser.x = canvas.width - wallImg.width - img.width + 8;
		}
		obstacles.push(laser);
	}
}

function populateWalls(scene) {
	if (walls.length == 0) {
		makeWall(scene.camera.y + scene.camera.height - 234);
	}
	while (walls[walls.length - 1].y + walls[walls.length - 1].height > scene.camera.y) {
		makeWall(walls[walls.length - 1].y - 234);
	}
	while (walls[0].y > scene.camera.y + scene.camera.height) {
		walls.shift();
	}
	while (obstacles.length > 0 && obstacles[0].y > scene.camera.y + scene.camera.height) {
		obstacles.shift();
	}
}

function oscillate(current, period, height) {
	return Math.sin(current / period * Math.PI) * height;
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	dead = false;
	this.camera.vy = -0.3;

	player = new Splat.Entity(84, canvas.height / 2, 50, 50);
	player.draw = function(context) {
		context.fillStyle = "#ff0000";
		context.fillRect(this.x, this.y, this.width, this.height);
	};

	this.clearTimers();
},
function(elapsedMillis) {
	bgY -= this.camera.vy / 1.5 * elapsedMillis;
	var bgH = game.images.get("bg").height;
	if (bgY > bgH) {
		bgY -= bgH;
	}

	if (player.y > this.camera.y + this.camera.height) {
		dead = true;
		this.camera.vy = 0;
		return;
	}

	for (var i = 0; i < walls.length; i++) {
		walls[i].move(elapsedMillis);
	}
	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].move(elapsedMillis);
	}
	populateWalls(this);

	// gravity
	player.vy += elapsedMillis * 0.003;
	if (onWall && !dead && player.vy > 0.5) {
		player.vy = 0.5;
	}

	player.move(elapsedMillis);

	onWall = undefined;
	for (var i = 0; i < walls.length; i++) {
		var wall = walls[i];
		if (player.collides(wall)) {
			player.resolveLeftCollisionWith(wall);
			player.resolveRightCollisionWith(wall);
			player.resolveTopCollisionWith(wall);

			if (player.overlapsVert(wall)) {
				onWall = wall;
			}
		}
	}
	if (dead) {
		return;
	}
	for (var i = 0; i < obstacles.length; i++) {
		var obstacle = obstacles[i];
		if (player.collides(obstacle)) {
			this.startTimer("flash");
			dead = true;
			return;
		}
	}

	if (onWall && game.keyboard.consumePressed("space")) {
		player.vx = 1.0;
		if (onWall.x > player.x) {
			player.vx *= -1;
		}
		player.vy = -1.5;
		onWall = undefined;
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
}));

game.scenes.switchTo("loading");
