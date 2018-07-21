import * as _ from "lodash"

class SpiralService {
    
}

function getSpiralPoints(amountOfPoints) {
    var spiralPoints = _.times(amountOfPoints, function (index) {
        var pointCoord = getSpiralPoint(index);

        function transform(num) {
            return parseInt(num);
        }

        pointCoord.x = transform(pointCoord.x);
        pointCoord.y = transform(pointCoord.y);

        return pointCoord;
    });

    var image = new Jimp(1000, 1000, function (err, image) {
        _.times(1000, function(rowIndex) {
            _.times(1000, function(colIndex) {
                image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), rowIndex, colIndex);   
                // image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), rowIndex, colIndex);   
            });
        });    
        
        _.forEach(spiralPoints, function(point) {
            image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), point.y + 500, point.x + 500);   
        });

        console.log(getMustVisitSpiralPoints());
        _.forEach(getMustVisitSpiralPoints(), function(point) {
            image.setPixelColor(Jimp.rgbaToInt(255, 0, 0, 255), point.y + 500, point.x + 500);   
        });

        image.write("test.png", (err) => {
            if (err) throw err; 
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

    _.times(loops, function(index) {
        addCircle(360 * (index + 1), 90 / Math.pow(3, index));
    });

    function addCircle(beginAt, step) {
        _.times(360 / step, function(index) {
            angles.push(beginAt + step * (index + 1));
        });
    }

    return _.map(angles, function(angle) {
        return getSpiralPoint(angle);
    });
}

function getNextSpiralPoint(spiral) {
    return true;
}

export default {
    getNextSpiralPoint: getNextSpiralPoint,
    getSpiralPoints: getSpiralPoints,
    getMustVisitSpiralPoints: getMustVisitSpiralPoints
}