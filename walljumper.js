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
	context.fillStyle = "#666666";
	context.fillRect(this.x, this.y, this.width, this.height);
}

game.scenes.add("title", new Splat.Scene(canvas, function() {
	player = new Splat.Entity(50, canvas.height / 2, 50, 50);
	player.draw = function(context) {
		context.fillStyle = "#ff0000";
		context.fillRect(this.x, this.y, this.width, this.height);
	};

	var wall = new Splat.Entity(0, 0, 50, canvas.height);
	wall.draw = drawWall;
	walls.push(wall);
	onWall = wall;

	var wall = new Splat.Entity(canvas.width - 50, 0, 50, canvas.height);
	wall.draw = drawWall;
	walls.push(wall);
},
function(elapsedMillis) {
	// dead
	if (player.y > this.camera.y + this.camera.height) {
		return;
	}

	for (var i = 0; i < walls.length; i++) {
		walls[i].move(elapsedMillis);
	}

	// gravity
	player.vy += elapsedMillis * 0.002;
	if (onWall && player.vy > 0.5) {
		player.vy = 0.5;
	}

	player.move(elapsedMillis);

	for (var i = 0; i < walls.length; i++) {
		var wall = walls[i];
		if (player.collides(wall)) {
			player.resolveCollisionWith(wall);
			onWall = wall;
		}
	}

	if (onWall && game.keyboard.consumePressed("space")) {
		player.vx = 1.0;
		if (onWall.x > player.x) {
			player.vx *= -1;
		}
		player.vy = -1.0;
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
