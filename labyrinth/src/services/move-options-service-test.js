import Assert from "assert"
import _ from "lodash"
import MoveOptionsService from "./move-options-service"
import Point from "../models/point"
import Path from "../models/path"
import Direction from "../enums/direction"
import DirectionalProbability from "../models/directional-probability";

describe("MoveOptionsService", function () {
    describe("#availableOptions", function () {
        it('Should return only NORTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path({ x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 });
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Assert.strictEqual(_.isEqual(options, ["NORTH"]), true, options);
        });
        it('Should return only SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path({ x: 0, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 });
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Assert.strictEqual(_.isEqual(options, ["SOUTH"]), true, options);
        });
        it('Should return only EAST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path({ x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 });
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Assert.strictEqual(_.isEqual(options, ["EAST"]), true, options);
        });
        it('Should return only WEST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path({ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 });
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Assert.strictEqual(_.isEqual(options, ["WEST"]), true, options);
        });
        it('Should return NORTH and SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path({ x: 1, y: 0 }, { x: -1, y: 0 });
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Assert.strictEqual(_.isEqual(options, ["NORTH", "SOUTH"]), true, options);
        });
    });
    describe("#availableOptionsProbabilities", function () {
        it("Should have equal probabilities", function () {
            var takenPath = new Path();
            var currentPoint = new Point(0, 0);
            var endPoint = new Point(10, 10);
            var directionalProbabilities = new MoveOptionsService().availableOptionsProbabilities(takenPath, currentPoint, endPoint);
            Assert.strictEqual(directionalProbabilities.length, 4);
            // TODO: make better, easier to use asertions
        });
    });
});