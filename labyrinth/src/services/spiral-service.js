import _ from "lodash"
import Jimp from "jimp"

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
            image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 255), point.x + 500, point.y + 500);   
        });

        image.write("test.png", (err) => {
            if (err) throw err; 
        });
    });

    return spiralPoints;
}

function getSpiralPoint(angle) {
    var cofA = 0.5, cofB = 0.15, e = 2.71828;

    // Polar coordinates
    var angleInRadius = angle / 180 * Math.PI;
    var distance = cofA * Math.pow(e, cofB * angleInRadius) - cofA;
    
    // To Cartesian coordinates
    var x = distance * Math.cos(angleInRadius);
    var y = distance * Math.sin(angleInRadius);

    return { x: x, y: y };
}

function getNextSpiralPoint(spiral) {
    return true;
}

export default {
    getNextSpiralPoint: getNextSpiralPoint,
    getSpiralPoints: getSpiralPoints
}