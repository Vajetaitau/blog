import * as _ from "lodash"
import * as Mocha from "mocha"
import * as Chai from "chai"
import MoveOptionsService from "./move-options-service"
import Point from "../models/point"
import Path from "../models/path"
import Direction from "../enums/direction"
import DirectionalProbability from "../models/directional-probability";

describe("MoveOptionsService", function () {
    describe("#availableOptions", function () {
        it('Should return only NORTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, -1), new Point(1, 0), new Point(-1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["NORTH"]);
        });
        it('Should return only SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(1, 0), new Point(-1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["SOUTH"]);
        });
        it('Should return only EAST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(0, -1), new Point(-1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["EAST"]);
        });
        it('Should return only WEST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(0, -1), new Point(1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["WEST"]);
        });
        it('Should return NORTH and SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(1, 0), new Point(-1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["NORTH", "SOUTH"]);
        });
    });
    describe("#availableOptionsProbabilities", function () {
        it("Should have bigger probabilities in the NORTH and EAST", function () {
            var takenPath = new Path([]);
            var currentPoint = new Point(0, 0);
            var endPoint = new Point(10, 10);
            var actualDirectionalProbabilities = new MoveOptionsService().availableOptionsProbabilities(takenPath, currentPoint, endPoint, 0.8);
            var expectedDirectionalProbabilities = [
                new DirectionalProbability(Direction.NORTH, 0.3),
                new DirectionalProbability(Direction.SOUTH, 0.2),
                new DirectionalProbability(Direction.EAST, 0.3),
                new DirectionalProbability(Direction.WEST, 0.2),
            ];
            ;
            Chai.assert.deepStrictEqual(actualDirectionalProbabilities, expectedDirectionalProbabilities);
        });
        it("Should have bigger probabilities in the SOUTH and WEST", function () {
            var takenPath = new Path([]);
            var currentPoint = new Point(10, 10);
            var endPoint = new Point(0, 0);
            var actualDirectionalProbabilities = new MoveOptionsService().availableOptionsProbabilities(takenPath, currentPoint, endPoint, 0.8);
            var expectedDirectionalProbabilities = [
                new DirectionalProbability(Direction.NORTH, 0.2),
                new DirectionalProbability(Direction.SOUTH, 0.3),
                new DirectionalProbability(Direction.EAST, 0.2),
                new DirectionalProbability(Direction.WEST, 0.3),
            ];
            ;
            Chai.assert.deepStrictEqual(actualDirectionalProbabilities, expectedDirectionalProbabilities);
        });
    });
});