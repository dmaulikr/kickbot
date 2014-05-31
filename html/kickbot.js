var canvas = document.getElementById("canvas");

var manifest = {
	"images": {
		"bg": "images/bg.png",
		"logo": "images/kickbot-logo.png",
	},
	"sounds": {
		"jump1": "audio/jump1.mp3",
		"jump2": "audio/jump2.mp3",
		"jump3": "audio/jump3.mp3",
		"jump4": "audio/jump4.mp3",
		"jump5": "audio/jump5.mp3",
		"laser": "audio/laser.mp3",
		"spikes": "audio/spikes.mp3",
		"point": "audio/point.mp3",
		"music": "audio/Rolemusic_-_01_-_A_ninja_among_culturachippers-mono-loop.mp3",
	},
	"fonts": {
		"pixelade": {
			"embedded-opentype": "pixelade/pixelade-webfont.eot",
			"woff": "pixelade/pixelade-webfont.woff",
			"truetype": "pixelade/pixelade-webfont.ttf",
			"svg": "pixelade/pixelade-webfont.svg#pixeladeregular"
		}
	},
	"animations": {
		"two-scoop": {
			"strip": "images/two-scoop-pixel-anim.png",
			"frames": 16,
			"msPerFrame": 100,
			"repeatAt": 15
		},
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
		"spikes-left": {
			"strip": "images/spikes.png",
			"frames": 1,
			"msPerFrame": 70
		},
		"spikes-right": {
			"strip": "images/spikes.png",
			"frames": 1,
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
		"ghost-left": {
			"strip": "images/ghost.png",
			"frames": 1,
			"msPerFrame": 70
		},
		"ghost-right": {
			"strip": "images/ghost.png",
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
		"player-explode-left": {
			"strip": "images/explode.png",
			"frames": 8,
			"msPerFrame": 70,
			"repeatAt": 7
		},
		"player-explode-right": {
			"strip": "images/explode.png",
			"frames": 8,
			"msPerFrame": 70,
			"repeatAt": 7,
			"flip": "horizontal"
		},
		"ghost-slide-left": {
			"strip": "images/ghost-slide-anim.png",
			"frames": 8,
			"msPerFrame": 100
		},
		"ghost-slide-right": {
			"strip": "images/ghost-slide-anim.png",
			"frames": 8,
			"msPerFrame": 100,
			"flip": "horizontal"
		},
		"ghost-explode-left": {
			"strip": "images/ghost-explode.png",
			"frames": 8,
			"msPerFrame": 70,
			"repeatAt": 7
		},
		"ghost-explode-right": {
			"strip": "images/ghost-explode.png",
			"frames": 8,
			"msPerFrame": 70,
			"repeatAt": 7,
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

game.scenes.add("title", new Splat.Scene(canvas, function() {
	this.timers.running = new Splat.Timer(null, 2000, function() {
		game.scenes.switchTo("main");
	});
	this.timers.running.start();
}, function(elapsedMillis) {
	game.animations.get("two-scoop").move(elapsedMillis);
}, function(context) {
	context.fillStyle = "#93cbcd";
	context.fillRect(0, 0, canvas.width, canvas.height);

	var anim = game.animations.get("two-scoop");

	context.fillStyle = "#ffffff";
	context.font = "50px pixelade";
	centerText(context, "TWO SCOOP GAMES", 0, (canvas.height / 2) + (anim.height / 2) + 30);

	anim.draw(context, (canvas.width / 2) - (anim.width / 2), (canvas.height / 2) - (anim.height / 2));
}));

function getBest() {
	var b = parseInt(Splat.saveData.get("bestScore"));
	if (isNaN(b) || b < 0 || !b) {
		b = 0;
	}
	return b;
}

function setBest(b) {
	best = b;
	Splat.saveData.set("bestScore", best);
}

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
var best = getBest();
var newBest = false;


function Inputs(captureFrameDataFunc) {
	this.captureFrameData = captureFrameDataFunc;
	this.data = [];
	this.rand = new Splat.math.Random();
	this.recording = false;
	this.playing = false;
}
Inputs.prototype.record = function(elapsedMillis, initialData) {
	this.recording = true;
	var seed = new Date().getTime();
	this.rand = new Splat.math.Random(seed);
	this.data = [];
	this.data.push(seed);

	this.nextFrame(elapsedMillis);
	for (var key in initialData) {
		if (initialData.hasOwnProperty(key)) {
			this.currentFrame[key] = initialData[key];
		}
	}
};
Inputs.prototype.replay = function() {
	this.playing = true;
	var seed = this.data[0];
	this.rand = new Splat.math.Random(seed);
	this.frameIndex = 1;
	this.currentFrame = this.data[1];
};
Inputs.prototype.stop = function() {
	this.playing = false;
	this.recording = false;
};
Inputs.prototype.get = function(key) {
	return this.currentFrame[key];
};
Inputs.prototype.random = function() {
	return this.rand.random();
};
Inputs.prototype.nextFrame = function(elapsedMillis) {
	if (this.playing) {
		this.frameIndex++;
		this.currentFrame = this.data[this.frameIndex];
		return;
	}
	this.currentFrame = {};
	if (this.recording) {
		this.currentFrame = this.captureFrameData();
	}
	this.currentFrame["elapsedMillis"] = elapsedMillis;
	if (this.recording) {
		this.data.push(this.currentFrame);
	}
};


function jumpSound() {
	var i = Math.random() * jumpSounds.length |0;
	game.sounds.play(jumpSounds[i]);
}

function chooseWall(scene, y, possibleWalls, isLeft) {
	var i = scene.recording.random() * possibleWalls.length |0;
	var name = isLeft ? "-left" : "-right";
	var anim = game.animations.get(possibleWalls[i] + name);
	var x = 0;
	if (!isLeft) {
		x = canvas.width - anim.width;
	}
	var wall = new Splat.AnimatedEntity(x, y, anim.width, anim.height, anim, 0, 0);
	walls.push(wall);
}

function isWindow(entity) {
	if (!entity) {
		return false;
	}
	return entity.sprite.name.indexOf("window") > -1 || entity.cantHaveWindowNearby;
}

function wallIsBelowScreen(y) {
	return y > walls[0].y && y > walls[walls.length - 2].y;
}

function getLastLeftWall(y) {
	if (walls.length > 1) {
		return wallIsBelowScreen(y) ? walls[0] : walls[walls.length - 2];
	}
}

function getLastRightWall(y) {
	if (walls.length > 1) {
		return wallIsBelowScreen(y) ? walls[1] : walls[walls.length - 1];
	}
}

function makeObstacle(scene, onRight, y, getWindowImages) {
	var img;
	var obstacle;

	var wallImg = game.animations.get("wall-1-left");
	var x = wallImg.width - 8;
	if (scene.recording.random() > 0.5) {
		img = game.animations.get(onRight ? "laser-right" : "laser-left");
		if (onRight) {
			obstacle = new Splat.AnimatedEntity(canvas.width - wallImg.width - img.width + 8 + 4, y + 10, 8, 211, img, -4, -10);
		} else {
			obstacle = new Splat.AnimatedEntity(x + 29, y + 10, 8, 211, img, -29, -10);
		}
	} else {
		img = game.animations.get(onRight ? "spikes-right" : "spikes-left");
		obstacle = new Splat.AnimatedEntity(x, y, img.width, img.height, img, 0, 0);
		if (onRight) {
			obstacle.x = canvas.width - wallImg.width - img.width + 8;
		}
	}
	obstacles.push(obstacle);
}

var lastObstacle = false;
var pita = 0;
function makeWall(scene, y) {
	var hasObstacle = !lastObstacle;
	if (!hasObstacle) {
		pita++;
	}
	if (pita == 2) {
		hasObstacle = true;
		pita = 0;
	}
	lastObstacle = hasObstacle;

	var lastLeftWallIsWindow = isWindow(getLastLeftWall(y));
	var lastRightWallIsWindow = isWindow(getLastRightWall(y));

	function getWindowImages(isLeft) {
		if ((isLeft && lastLeftWallIsWindow) || (!isLeft && lastRightWallIsWindow)) {
			return wallImages;
		}
		return scene.recording.random() > 0.9 ? windowImages : wallImages;
	}

	if (hasObstacle) {
		var onRight = scene.recording.random() > 0.5;
		chooseWall(scene, y, onRight ? getWindowImages(true) : wallImages, true);
		chooseWall(scene, y, onRight ? wallImages : getWindowImages(false), false);
		makeObstacle(scene, onRight, y, getWindowImages);
	} else {
		chooseWall(scene, y, getWindowImages(true), true);
		chooseWall(scene, y, getWindowImages(false), false);
	}
}

function populateWallsUp(scene) {
	var wallH = game.animations.get("wall-1-left").height;
	var first = false;
	if (walls.length == 0) {
		makeWall(scene, scene.camera.y + scene.camera.height - wallH);
		first = true;
	}
	while (walls[walls.length - 1].y + walls[walls.length - 1].height > scene.camera.y) {
		makeWall(scene, walls[walls.length - 1].y - wallH);
	}
	if (first) {
		obstacles = [];
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
		makeWall(scene, scene.camera.y);
	}
	while (walls[0].y < scene.camera.y + scene.camera.height) {
		makeWall(scene, walls[0].y + wallH);
		walls.unshift(walls.pop());
		walls.unshift(walls.pop());
	}
	while (walls[walls.length - 1].y + walls[walls.length - 1].height < scene.camera.y) {
		walls.pop();
	}
	obstacles = [];
}

function centerText(context, text, offsetX, offsetY) {
	var w = context.measureText(text).width;
	var x = offsetX + (canvas.width / 2) - (w / 2) |0;
	var y = offsetY |0;
	context.fillText(text, x, y);
}

function anythingWasPressed() {
	return game.keyboard.isPressed("left") || game.keyboard.isPressed("right") || game.mouse.isPressed(0);
}

function drawScoreScreen(context, scene) {
	var ftb = scene.timers.fadeToBlack.time;
	scene.camera.drawAbsolute(context, function() {
		var opacity = Math.min(ftb / 300, 0.7);
		context.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
		context.fillRect(0, 0, canvas.width, canvas.height);

		context.fillStyle = "#ffffff";
		context.font = "50px pixelade";
		centerText(context, "SCORE", 0, 300);
		context.font = "100px pixelade";
		centerText(context, score, 0, 400);

		context.font = "50px pixelade";
		if (newBest) {
			context.fillStyle = "#be4682";
			centerText(context, "NEW BEST!", 0, 600);
		} else {
			centerText(context, "BEST", 0, 600);
		}

		context.font = "100px pixelade";
		centerText(context, best, 0, 700);
	});
}

function drawIntroOverlay(context, scene) {
	scene.camera.drawAbsolute(context, function() {
		var logo = game.images.get("logo");
		context.drawImage(logo, (canvas.width / 2) - (logo.width / 2)|0, 200);

		var isTouch = game.mouse.supportsTouch();
		var arrow = game.animations.get(isTouch ? "tap-left" : "arrow-left");
		var x = (canvas.width / 4);
		arrow.draw(context, x, canvas.height * 3 / 4);

		x = canvas.width - (canvas.width / 4) - arrow.width;
		game.animations.get(isTouch ? "tap-right" : "arrow-right").draw(context, x, canvas.height * 3 / 4);

		context.fillStyle = "#fff";
		context.font = "50px pixelade";
		centerText(context, "MUSIC BY ROLEMUSIC", 0, canvas.height - 90);
	});
}

function drawFlash(context, scene) {
	var flashTime = scene.timers.flash.time;
	var flashLen = scene.timers.flash.expireMillis;

	if (flashTime > 0) {
		var opacity = Splat.math.oscillate(flashTime, flashLen);
		context.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
		context.fillRect(scene.camera.x, scene.camera.y, canvas.width, canvas.height);
	}
}

game.scenes.add("main", new Splat.Scene(canvas, function() {
	walls = [];
	obstacles = [];
	waitingToStart = true;
	dead = false;
	this.camera.y = 0;
	score = 0;
	newBest = false;

	var wallW = game.animations.get("wall-1-left").width;
	var playerImg = game.animations.get("player-slide-left");
	player = new Splat.AnimatedEntity(wallW, canvas.height / 2, 30, 100, playerImg, -35, -13);

	this.timers.flash = new Splat.Timer(null, 150, function() {
		this.reset();
	});
	var scene = this;
	this.timers.fadeToBlack = new Splat.Timer(null, 800, function() {
		scene.recording.stop();
		game.scenes.switchTo("main");
	});
	this.timers.leftJumpUp = new Splat.Timer(function(elapsedMillis) {
		player.vx = Splat.math.oscillate(this.time + 100, 200);
	}, 200, function() {
		this.reset();
	});
	this.timers.rightJumpUp = new Splat.Timer(function(elapsedMillis) {
		player.vx = -Splat.math.oscillate(this.time + 100, 200);
	}, 200, function() {
		this.reset();
	});

	this.adjustTimestamp = function(elapsedMillis) {
		scene.recording.nextFrame(elapsedMillis);
		return scene.recording.get("elapsedMillis");
	};

	if (!this.recording) {
		this.recording = new Inputs(function() {
			var left = false;
			var right = false;
			if (game.mouse.consumePressed(0)) {
				if (game.mouse.x < canvas.width / 2) {
					left = true;
				} else {
					right = true;
				}
			} else if (game.keyboard.consumePressed("left")) {
				left = true;
			} else if (game.keyboard.consumePressed("right")) {
				right = true;
			}
			return {
				left: left,
				right: right
			};
		});
	}

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
		var wallH = game.animations.get("wall-1-left").height;
		if (game.keyboard.consumePressed("r") && this.recording && walls.length > 0) {
			waitingToStart = false;
			this.camera.vy = -0.6;
			lastObstacle = false;
			pita = 0;
			walls[0].cantHaveWindowNearby = true;
			walls[1].cantHaveWindowNearby = true;

			this.recording.replay();

			console.log("replay");
			player.y = Math.floor(player.y);
			var minWall = walls.reduce(function(a, b) {
				return Math.min(a.y, b.y) || b.y;
			});
			var actualOffset = player.y - minWall;
			var desiredOffset = this.recording.get("playerOffsetY");
			var adjustment = desiredOffset - actualOffset;
			player.y += adjustment;
			this.camera.y += adjustment;

			elapsedMillis = this.recording.get("elapsedMillis");
		}
		if (anythingWasPressed()) {
			game.sounds.play("music", true);
			waitingToStart = false;
			this.camera.vy = -0.6;
			lastObstacle = false;
			pita = 0;
			walls[0].cantHaveWindowNearby = true;
			walls[1].cantHaveWindowNearby = true;

			player.y = Math.floor(player.y);
			var minWall = walls.reduce(function(a, b) {
				return Math.min(a.y, b.y) || b.y;
			});

			this.recording.record(elapsedMillis, {
				playerOffsetY: player.y - minWall
			});
			console.log("start");
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

		this.timers.fadeToBlack.start();
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

	player.move(elapsedMillis);

	onWall = undefined;
	for (var i = 0; i < walls.length; i++) {
		var wall = walls[i];
		if (player.collides(wall)) {
			player.resolveLeftCollisionWith(wall);
			player.resolveRightCollisionWith(wall);
			player.resolveTopCollisionWith(wall);

			this.timers.leftJumpUp.stop();
			this.timers.leftJumpUp.reset();
			this.timers.rightJumpUp.stop();
			this.timers.rightJumpUp.reset();

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
			game.sounds.play("point");
			if (score > best) {
				setBest(score);
				newBest = true;
			}
			obstacle.counted = true;
		}
		if (player.collides(obstacle)) {
			if (!this.timers.flash.running) {
				var explode;
				if (player.sprite.name.indexOf("left") > -1) {
					explode = game.animations.get("player-explode-left");
				} else {
					explode = game.animations.get("player-explode-right");
				}
				explode.reset();
				player.sprite = explode;

				if (obstacle.sprite == game.animations.get("laser-left") || obstacle.sprite == game.animations.get("laser-right")) {
					game.sounds.play("laser");
				} else if (obstacle.sprite.name.indexOf("spikes") > -1) {
					game.sounds.play("spikes");
				}
			}
			this.timers.flash.start();
			dead = true;
			return;
		}
	}
	if (onWall) {
		var left = this.recording.get("left");
		var right = this.recording.get("right");

		var wallIsOnLeft = player.x > onWall.x;
		if (left) {
			if (wallIsOnLeft) {
				this.timers.leftJumpUp.start();
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
				this.timers.rightJumpUp.start();
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
			y = y |0;
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

	drawFlash(context, this);

	if (this.timers.fadeToBlack.running) {
		drawScoreScreen(context, this);
		return;
	}

	if (waitingToStart) {
		drawIntroOverlay(context, this);
	}
	this.camera.drawAbsolute(context, function() {
		context.fillStyle = "#ffffff";
		context.font = "100px pixelade";
		centerText(context, score, 0, 100);
	});
}));

game.scenes.switchTo("loading");
