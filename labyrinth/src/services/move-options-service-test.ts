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
            Chai.assert.strictEqual(_.isEqual(options, ["NORTH"]), true, "fix this");
        });
        it('Should return only SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(1, 0), new Point(-1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.strictEqual(_.isEqual(options, ["SOUTH"]), true, "fix this");
        });
        it('Should return only EAST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(0, -1), new Point(-1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.strictEqual(_.isEqual(options, ["EAST"]), true, "fix this");
        });
        it('Should return only WEST', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(0, 1), new Point(0, -1), new Point(1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.strictEqual(_.isEqual(options, ["WEST"]), true, "fix this");
        });
        it('Should return NORTH and SOUTH', function () {
            var currentPoint = new Point(0, 0);
            var takenPath = new Path([new Point(1, 0), new Point(-1, 0)]);
            var options = new MoveOptionsService().availableOptions(takenPath, currentPoint);
            Chai.assert.strictEqual(_.isEqual(options, ["NORTH", "SOUTH"]), true, "fix this");
        });
    });
    describe("#availableOptionsProbabilities", function () {
        it("Should have equal probabilities", function () {
            var takenPath = new Path([]);
            var currentPoint = new Point(0, 0);
            var endPoint = new Point(10, 10);
            var directionalProbabilities = new MoveOptionsService().availableOptionsProbabilities(takenPath, currentPoint, endPoint);
            Chai.assert.strictEqual(directionalProbabilities.length, 4);
            // TODO: make better, easier to use asertions
        });
    });
});