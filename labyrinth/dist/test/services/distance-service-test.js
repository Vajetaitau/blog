"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Chai = require("chai");
var distance_service_1 = require("../../src/services/distance-service");
var point_1 = require("../../src/models/point");
var direction_1 = require("../../src/enums/direction");
var directional_distance_1 = require("../../src/models/directional-distance");
describe('DistanceService', function () {
    describe('#getDirectionalDistance', function () {
        it('Should be { NORTH, 10 }', function () {
            var startPoint = new point_1.default(0, 0);
            var endPoint = new point_1.default(0, 10);
            var directions = distance_service_1.default.directionalDistance(startPoint, endPoint);
            Chai.assert.strictEqual(_.isEqual(directions, [new directional_distance_1.default(direction_1.default.NORTH, 10)]), true, "fix assertions");
        });
        it('Should be { NORTH, 10 } and { EAST, 10 }', function () {
            var startPoint = new point_1.default(0, 0);
            var endPoint = new point_1.default(10, 10);
            var directions = distance_service_1.default.directionalDistance(startPoint, endPoint);
            Chai.assert.strictEqual(_.isEqual(directions.sort(), [new directional_distance_1.default(direction_1.default.EAST, 10), new directional_distance_1.default(direction_1.default.NORTH, 10)].sort()), true, JSON.stringify(directions));
        });
    });
});
