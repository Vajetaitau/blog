"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Chai = require("chai");
var point_1 = require("../../src/models/point");
var path_1 = require("../../src/models/path");
var move_options_service_1 = require("../../src/services/move-options-service");
var directional_probability_1 = require("../../src/models/directional-probability");
var direction_1 = require("../../src/enums/direction");
describe("MoveOptionsService", function () {
    describe("#availableOptions", function () {
        it('Should return only NORTH', function () {
            var currentPoint = new point_1.default(0, 0);
            var takenPath = new path_1.default([new point_1.default(0, -1), new point_1.default(1, 0), new point_1.default(-1, 0)]);
            var options = move_options_service_1.moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["NORTH"]);
        });
        it('Should return only SOUTH', function () {
            var currentPoint = new point_1.default(0, 0);
            var takenPath = new path_1.default([new point_1.default(0, 1), new point_1.default(1, 0), new point_1.default(-1, 0)]);
            var options = move_options_service_1.moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["SOUTH"]);
        });
        it('Should return only EAST', function () {
            var currentPoint = new point_1.default(0, 0);
            var takenPath = new path_1.default([new point_1.default(0, 1), new point_1.default(0, -1), new point_1.default(-1, 0)]);
            var options = move_options_service_1.moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["EAST"]);
        });
        it('Should return only WEST', function () {
            var currentPoint = new point_1.default(0, 0);
            var takenPath = new path_1.default([new point_1.default(0, 1), new point_1.default(0, -1), new point_1.default(1, 0)]);
            var options = move_options_service_1.moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["WEST"]);
        });
        it('Should return NORTH and SOUTH', function () {
            var currentPoint = new point_1.default(0, 0);
            var takenPath = new path_1.default([new point_1.default(1, 0), new point_1.default(-1, 0)]);
            var options = move_options_service_1.moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["NORTH", "SOUTH"]);
        });
    });
    describe("#availableOptionsProbabilities", function () {
        it("Should have bigger probabilities in the NORTH and EAST", function () {
            var takenPath = new path_1.default([]);
            var currentPoint = new point_1.default(0, 0);
            var endPoint = new point_1.default(10, 10);
            var actualDirectionalProbabilities = move_options_service_1.moveOptionsService.availableOptionsProbabilities(takenPath, currentPoint, endPoint, 0.8);
            var expectedDirectionalProbabilities = [
                new directional_probability_1.default(direction_1.default.NORTH, 0.3),
                new directional_probability_1.default(direction_1.default.SOUTH, 0.2),
                new directional_probability_1.default(direction_1.default.EAST, 0.3),
                new directional_probability_1.default(direction_1.default.WEST, 0.2),
            ];
            ;
            Chai.assert.deepStrictEqual(actualDirectionalProbabilities, expectedDirectionalProbabilities);
        });
        it("Should have bigger probabilities in the SOUTH and WEST", function () {
            var takenPath = new path_1.default([]);
            var currentPoint = new point_1.default(10, 10);
            var endPoint = new point_1.default(0, 0);
            var actualDirectionalProbabilities = move_options_service_1.moveOptionsService.availableOptionsProbabilities(takenPath, currentPoint, endPoint, 0.8);
            var expectedDirectionalProbabilities = [
                new directional_probability_1.default(direction_1.default.NORTH, 0.2),
                new directional_probability_1.default(direction_1.default.SOUTH, 0.3),
                new directional_probability_1.default(direction_1.default.EAST, 0.2),
                new directional_probability_1.default(direction_1.default.WEST, 0.3),
            ];
            ;
            Chai.assert.deepStrictEqual(actualDirectionalProbabilities, expectedDirectionalProbabilities);
        });
    });
});
