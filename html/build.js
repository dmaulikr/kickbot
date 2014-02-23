var browserify = require("browserify");
var fs = require("fs");

var bundler = browserify(__dirname + "/kickbot.js");

bundler.transform({
	global: true,
}, "uglifyify");

bundler.bundle().pipe(fs.createWriteStream(__dirname + "/out.js"));
