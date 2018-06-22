import _ from "lodash"

function connectPoints(startPoint, endPoint) {
    var xDistance = Math.abs(endPoint.x - startPoint.x);
    var yDistance = Math.abs(endPoint.y - startPoint.y);

    var currentPoint = startPoint;
    var path = [];
    var safeguard = 0;
    while (!_.isEqual(currentPoint, endPoint) && hasOptionsToMove(path, currentPoint)) {
        var movingOptions = getMovingOptions(path, currentPoint);
        var movingDirections = getCorrectMovingDirrections(currentPoint, endPoint);

        // TODO: From moving options and directions get random next point

        if (safeguard++ > 10000) {
            throw "Could not connect points, safeguard was hit!";
        }
    }

    return path;

    function hasOptionsToMove(takenPath, currentPoint) {
        return getMovingOptions(takenPath, currentPoint).length > 0;
    }
}

function getCorrectMovingDirrections(currentPoint, endPoint) {
    var directions = [];
    var xDistance = endPoint.x - currentPoint.x;
    var yDistance = endPoint.y - currentPoint.y;

    if (xDistance > 0) {
        directions.push("EAST");
    } else if (xDistance < 0) {
        directions.push("WEST")
    }

    if (yDistance > 0) {
        directions.push("NORTH");
    } else if (yDistance < 0) {
        directions.push("SOUTH");
    }

    return directions;
}

function getMovingOptions(takenPath, currentPoint) {
    var options = [];
    if (!_.find(takenPath, _.matches(getNorthPoint(currentPoint)))) {
        options.push("NORTH");
    }
    if (!_.find(takenPath, _.matches(getSouthPoint(currentPoint)))) {
        options.push("SOUTH");
    }
    if (!_.find(takenPath, _.matches(getEastPoint(currentPoint)))) {
        options.push("EAST");
    }
    if (!_.find(takenPath, _.matches(getWestPoint(currentPoint)))) {
        options.push("WEST");
    }
    return options;
}

function getNorthPoint(point) {
    return {x: point.x, y: point.y + 1};
}

function getSouthPoint(point) {
    return {x: point.x, y: point.y - 1};
}

function getEastPoint(point) {
    return {x: point.x + 1, y: point.y};
}

function getWestPoint(point) {
    return {x: point.x - 1, y: point.y};
}

export default {
    connectPoints: connectPoints,
    getMovingOptions: getMovingOptions,
    getCorrectMovingDirrections: getCorrectMovingDirrections
}