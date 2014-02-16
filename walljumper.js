var canvas = document.getElementById("game");

var manifest = {
	"images": {
		"wall1": "images/wall1.png",
		"wall2": "images/wall2.png"
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
var onWall;

function drawWall(context) {
	context.fillStyle = this.color;
	context.fillRect(this.x, this.y, this.width, this.height);
}

function drawFlipped(context) {
	context.save();
	context.scale(-1, 1);
	context.drawImage(this.sprite, -this.x - this.sprite.width, this.y);
	context.restore();
}

function makeWall(y) {
	var img = game.images.get(Math.random() > 0.5 ? "wall1" : "wall2");
	var wall = new Splat.AnimatedEntity(0, y, img.width, img.height, img, 0, 0);
	walls.push(wall);

	wall = new Splat.AnimatedEntity(canvas.width - img.width, y, img.width, img.height, img, 0, 0);
	wall.draw = drawFlipped;
	walls.push(wall);
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
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	this.camera.vy = -0.3;

	player = new Splat.Entity(84, canvas.height / 2, 50, 50);
	player.draw = function(context) {
		context.fillStyle = "#ff0000";
		context.fillRect(this.x, this.y, this.width, this.height);
	};
},
function(elapsedMillis) {
	// dead
	if (player.y > this.camera.y + this.camera.height) {
		this.camera.vy = 0;
		return;
	}

	for (var i = 0; i < walls.length; i++) {
		walls[i].move(elapsedMillis);
	}
	populateWalls(this);

	// gravity
	player.vy += elapsedMillis * 0.003;
	if (onWall && player.vy > 0.5) {
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
	context.fillStyle = "#3d5a64";
	context.fillRect(this.camera.x, this.camera.y, canvas.width, canvas.height);
	for (var i = 0; i < walls.length; i++) {
		walls[i].draw(context);
	}
	player.draw(context);
}));

game.scenes.switchTo("loading");
