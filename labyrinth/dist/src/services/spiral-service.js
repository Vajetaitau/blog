"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var jimp_1 = require("jimp");
function getSpiralPoints(amountOfPoints) {
    var spiralPoints = lodash_1.default.times(amountOfPoints, function (index) {
        var pointCoord = getSpiralPoint(index);
        function transform(num) {
            return parseInt(num);
        }
        pointCoord.x = transform(pointCoord.x);
        pointCoord.y = transform(pointCoord.y);
        return pointCoord;
    });
    var image = new jimp_1.default(1000, 1000, function (err, image) {
        lodash_1.default.times(1000, function (rowIndex) {
            lodash_1.default.times(1000, function (colIndex) {
                image.setPixelColor(jimp_1.default.rgbaToInt(255, 255, 255, 255), rowIndex, colIndex);
                // image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), rowIndex, colIndex);   
            });
        });
        lodash_1.default.forEach(spiralPoints, function (point) {
            image.setPixelColor(jimp_1.default.rgbaToInt(0, 0, 0, 255), point.y + 500, point.x + 500);
        });
        console.log(getMustVisitSpiralPoints());
        lodash_1.default.forEach(getMustVisitSpiralPoints(), function (point) {
            image.setPixelColor(jimp_1.default.rgbaToInt(255, 0, 0, 255), point.y + 500, point.x + 500);
        });
        image.write("test.png", function (err) {
            if (err)
                throw err;
        });
    });
    return spiralPoints;
}
function getSpiralPoint(angle) {
    var cofA = 0.1, cofB = 0.45, e = 2.71828;
    // Polar coordinates
    var angleInRadius = angle / 180 * Math.PI;
    var distance = cofA * Math.pow(e, cofB * angleInRadius) - cofA;
    // To Cartesian coordinates
    var x = distance * Math.cos(angleInRadius);
    var y = distance * Math.sin(angleInRadius);
    return { x: x, y: y };
}
function getMustVisitSpiralPoints(loops) {
    var angles = [0, 360];
    lodash_1.default.times(loops, function (index) {
        addCircle(360 * (index + 1), 90 / Math.pow(3, index));
    });
    function addCircle(beginAt, step) {
        lodash_1.default.times(360 / step, function (index) {
            angles.push(beginAt + step * (index + 1));
        });
    }
    return lodash_1.default.map(angles, function (angle) {
        return getSpiralPoint(angle);
    });
}
function getNextSpiralPoint(spiral) {
    return true;
}
exports.default = {
    getNextSpiralPoint: getNextSpiralPoint,
    getSpiralPoints: getSpiralPoints,
    getMustVisitSpiralPoints: getMustVisitSpiralPoints
};
