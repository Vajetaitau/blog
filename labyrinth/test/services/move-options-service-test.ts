import * as Chai from "chai"
import Point from "../../src/models/point";
import Path from "../../src/models/path";
import { moveOptionsService } from "../../src/services/move-options-service";
import DirectionalProbability from "../../src/models/directional-probability";
import Direction from "../../src/enums/direction";

describe("MoveOptionsService", function () {
    describe("#availableOptions", function () {
        it('Should return only NORTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, -1), new Point(1, 0), new Point(-1, 0)]);
            var options = moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["NORTH"]);
        });
        it('Should return only SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(1, 0), new Point(-1, 0)]);
            var options = moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["SOUTH"]);
        });
        it('Should return only EAST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(0, -1), new Point(-1, 0)]);
            var options = moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["EAST"]);
        });
        it('Should return only WEST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(0, -1), new Point(1, 0)]);
            var options = moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["WEST"]);
        });
        it('Should return NORTH and SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(1, 0), new Point(-1, 0)]);
            var options = moveOptionsService.availableOptions(takenPath, currentPoint);
            Chai.assert.deepStrictEqual(options, ["NORTH", "SOUTH"]);
        });
    });
    describe("#availableOptionsProbabilities", function () {
        it("Should have bigger probabilities in the NORTH and EAST", function () {
            var takenPath = new Path([]);
            var currentPoint = new Point(0, 0);
            var endPoint = new Point(10, 10);
            var actualDirectionalProbabilities = moveOptionsService.availableOptionsProbabilities(takenPath, currentPoint, endPoint, 0.8);
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
            var actualDirectionalProbabilities = moveOptionsService.availableOptionsProbabilities(takenPath, currentPoint, endPoint, 0.8);
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