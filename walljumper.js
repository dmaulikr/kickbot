var canvas = document.getElementById("game");

var manifest = {
	"images": {
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

function makeWall(y) {
	var wall = new Splat.Entity(0, y, 50, 100);
	wall.color = Math.random() > 0.5 ? "#666666" : "#888888";
	wall.draw = drawWall;
	walls.push(wall);

	wall = new Splat.Entity(canvas.width - 50, y, 50, 100);
	wall.color = Math.random() > 0.5 ? "#666666" : "#888888";
	wall.draw = drawWall;
	walls.push(wall);
}

function populateWalls(scene) {
	if (walls.length == 0) {
		makeWall(scene.camera.y + scene.camera.height - 100);
	}
	while (walls[walls.length - 1].y + walls[walls.length - 1].height > scene.camera.y) {
		makeWall(walls[walls.length - 1].y - 100);
	}
	while (walls[0].y > scene.camera.y + scene.camera.height) {
		walls.shift();
	}
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	this.camera.vy = -0.3;

	player = new Splat.Entity(50, canvas.height / 2, 50, 50);
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
	context.clearRect(this.camera.x, this.camera.y, canvas.width, canvas.height);
	for (var i = 0; i < walls.length; i++) {
		walls[i].draw(context);
	}
	player.draw(context);
}));

game.scenes.switchTo("loading");
