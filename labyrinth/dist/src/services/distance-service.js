"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var direction_1 = require("../enums/direction");
var directional_distance_1 = require("../models/directional-distance");
var DistanceService = /** @class */ (function () {
    function DistanceService() {
    }
    DistanceService.prototype.directionalDistance = function (startPoint, endPoint) {
        var directions = [];
        var xDistance = endPoint.x - startPoint.x;
        var yDistance = endPoint.y - startPoint.y;
        if (xDistance > 0) {
            directions.push(new directional_distance_1.default(direction_1.default.EAST, Math.abs(xDistance)));
        }
        else if (xDistance < 0) {
            directions.push(new directional_distance_1.default(direction_1.default.WEST, Math.abs(xDistance)));
        }
        if (yDistance > 0) {
            directions.push(new directional_distance_1.default(direction_1.default.NORTH, Math.abs(yDistance)));
        }
        else if (yDistance < 0) {
            directions.push(new directional_distance_1.default(direction_1.default.SOUTH, Math.abs(yDistance)));
        }
        return directions;
    };
    return DistanceService;
}());
exports.default = new DistanceService();
