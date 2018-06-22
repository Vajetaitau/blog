import _ from "lodash"
import assert from "assert"
import PointConnectionService from "./point-connection-service"

describe("PointConnectionService", function () {
    describe("#getMovingOptions", function () {
        it('Should return only NORTH', function () {
            var currentPoint = { x: 0, y: 0 };
            var takenPath = [{ x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
            var options = PointConnectionService.getMovingOptions(takenPath, currentPoint);
            assert.strictEqual(_.isEqual(options, ["NORTH"]), true, options);
        });
        it('Should return only SOUTH', function () {
            var currentPoint = { x: 0, y: 0 };
            var takenPath = [{ x: 0, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }];
            var options = PointConnectionService.getMovingOptions(takenPath, currentPoint);
            assert.strictEqual(_.isEqual(options, ["SOUTH"]), true, options);
        });
        it('Should return only EAST', function () {
            var currentPoint = { x: 0, y: 0 };
            var takenPath = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
            var options = PointConnectionService.getMovingOptions(takenPath, currentPoint);
            assert.strictEqual(_.isEqual(options, ["EAST"]), true, options);
        });
        it('Should return only WEST', function () {
            var currentPoint = { x: 0, y: 0 };
            var takenPath = [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }];
            var options = PointConnectionService.getMovingOptions(takenPath, currentPoint);
            assert.strictEqual(_.isEqual(options, ["WEST"]), true, options);
        });
        it('Should return NORTH and SOUTH', function () {
            var currentPoint = { x: 0, y: 0 };
            var takenPath = [{ x: 1, y: 0 }, { x: -1, y: 0 }];
            var options = PointConnectionService.getMovingOptions(takenPath, currentPoint);
            assert.strictEqual(_.isEqual(options, ["NORTH", "SOUTH"]), true, options);
        });
    });
    describe("#getCorrectMovingDirections", function () {
        it('Should be NORTH', function () {
            var startPoint = { x: 0, y: 0 };
            var endPoint = { x: 0, y: 10 };
            var directions = PointConnectionService.getCorrectMovingDirrections(startPoint, endPoint);
            assert.strictEqual(_.isEqual(directions, ["NORTH"]), true, directions);
        });
        it('Should be NORTH and EAST', function () {
            var startPoint = { x: 0, y: 0 };
            var endPoint = { x: 10, y: 10 };
            var directions = PointConnectionService.getCorrectMovingDirrections(startPoint, endPoint);
            assert.strictEqual(_.isEqual(directions, ["EAST", "NORTH"]), true, directions);
        });
    });
    describe("#connectPoints", function () {
        it('Path should probably be longer, than shortest distance between two points', function () {
            var startPoint = { x: 0, y: 0 };
            var endPoint = { x: 10, y: 10 };
            var path = PointConnectionService.connectPoints(startPoint, endPoint);
            assert.strictEqual(_.isEqual(path.length > 10), true, path);
        });
    });
});