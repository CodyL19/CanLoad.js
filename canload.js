function canLoad(style, op) {
    var speed = (op.speed) ? op.speed : 'medium';
    if (speed.toLowerCase() == 'fast') {
        var speed = 10,
            cspeed = 17;
    } else if (speed.toLowerCase() == 'medium') {
        var speed = 10,
            cspeed = 40;
    } else if (speed.toLowerCase() == 'slow') {
        var speed = 40,
            cspeed = 170;
    } else {
        var speed = 20,
            cspeed = 95;
    }
    var color = (!op.color) ? '#333' : op.color;
    var line = (isInt(op.line) && op.line) ? op.line : 2.5;
    document.getElementById(op.id).innerHTML = "<canvas id='spinner_" + op.id + "'>Not Supported</canvas>";
    var canvas = document.getElementById("spinner_" + op.id);
    var ctx = canvas.getContext('2d');
    var size = (isInt(op.size) && op.size) ? op.size : 40;
    canvas.width = size;
    canvas.height = size;
    var imd = ctx.getImageData(0, 0, size, size);
    var type = {
        line: function() {
            var current = 0,
                direction = false,
                s = {
                    i: '3',
                    t: '97'
                };
            if (op.speed.toLowerCase() == 'fast') {
                s.i = 7;
                s.t = 93;
            } else if (op.speed.toLowerCase() == 'medium') {
                s.i = 2;
                s.t = 98;
            } else if (op.speed.toLowerCase() == 'slow') {
                s.i = 0.5;
                s.t = 99.5;
            }
            function dir() {
                window.requestAnimationFrame(dir);
                if (current < s.t && !direction) {
                    current = current + s.i
                } else if (current >= s.t && direction) {
                    current = s.i;
                    direction = false;
                }
                if (current < s.t && direction) {
                    current = current + s.i;
                } else if (current >= s.t && !direction) {
                    current = s.i;
                    direction = true;
                }
                var cur = current / 100;
                //document.getElementById('debug').innerHTML = cur;
                bg();
                ctx.lineCap = 'round';
                ctx.lineWidth = line;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2 - line / 1.5, -(Math.PI / 2), ((Math.PI * 2) * cur) - Math.PI / 2, direction);
                ctx.stroke();
                ctx.closePath();
            }
            dir();
        },
        chrome: function() {
            var length = (isInt(op.length) && op.length) ? op.length / 100 : 25 / 100;
            function dir() {
                window.requestAnimationFrame(dir);
                bg();
                ctx.translate(size / 2, size / 2);
                ctx.rotate((Math.PI * 2) * 2 / cspeed / 2);
                ctx.translate(-size / 2, -size / 2);
                ctx.lineCap = 'round';
                ctx.lineWidth = line;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2 - line / 1.5, -(Math.PI / 2), ((Math.PI * 2) * length) - Math.PI / 2, false);
                ctx.stroke();
                ctx.closePath();
            }
            dir();
        },
        bubble: function() {
        }
    }
    if (style && type.hasOwnProperty(style)) {
        type[style]();
    } else {
        type.line();
    }
    ctx.putImageData(imd, 0, 0);
    function isInt(value) {
        var x = parseFloat(value);
        return !isNaN(value) && (x | 0) === x;
    }
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());
    function bg() {
        var bg = (op.bg) ? true : false;
        if (bg) {
            var bgLine = (isInt(op.bg.line)) ? op.bg.line : line,
                bgColor = (op.bg.color) ? op.bg.color : "rgba(0,0,0,0)",
                bgCenter = (op.bg.center) ? op.bg.center : "rgba(0,0,0,0)";
            ctx.clearRect(0, 0, size, size);
            ctx.lineCap = 'round';
            ctx.lineWidth = bgLine;
            ctx.strokeStyle = bgColor;
            if (op.bg.center) {
                ctx.beginPath();
                ctx.fillStyle = op.bg.center;
                ctx.arc(size / 2, size / 2, size / 2 - line / 1.5, -(Math.PI / 2), ((Math.PI * 2) * 1) - Math.PI / 2, false);
                ctx.stroke();
                ctx.fill();
                ctx.closePath();
            }
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2 - line / 1.5, -(Math.PI / 2), ((Math.PI * 2) * 1) - Math.PI / 2, false);
            ctx.stroke();
            ctx.closePath();
        }
        if (!bg) {
            ctx.clearRect(0, 0, size, size);
        }
    }
}
