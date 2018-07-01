import * as Chai from 'chai';
import Path from "../../src/models/path";
import Point from "../../src/models/point";
import { backtrackingService } from "../../src/services/backtracking-service";
import Direction from '../../src/enums/direction';
import DirectionStatus from '../../src/enums/direction-status';

describe("BacktrackingService", function () {
    describe("#getLastOpenPoint", function () {
        it("Should return the last point of the path", function () {
            var path = new Path([
                new Point(0, 0),
                new Point(0, 1),
                new Point(0, 2),
                new Point(1, 2),
                new Point(2, 2),
            ]);

            var lastOpenPoint = backtrackingService.getLastOpenPoint(path);
            Chai.assert.deepEqual<Point>(lastOpenPoint, new Point(2, 2));
        });
        it("Should return the second last", function () {
            var path = new Path([
                new Point(0, 0),
                new Point(0, 1),
                new Point(0, 2),
                new Point(1, 2),
                new Point(2, 2),
                new Point(2, 1),
                new Point(2, 0),
                new Point(1, 0),
                new Point(1, 1)
            ]);

            var lastOpenPoint = backtrackingService.getLastOpenPoint(path);
            Chai.assert.deepEqual(lastOpenPoint, new Point(1, 0));
        });
    });
    describe("#getUnexploredOptions", function () {
        it("(0, 0) only east is open", function () {
            var point = new Point(
                0, 0,
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
                DirectionStatus.OPEN,
                DirectionStatus.CLOSED,
            );
            return backtrackingService.getUnexploredOptions(point).then((unexploredOptions) => {
                Chai.assert.deepStrictEqual(unexploredOptions, [Direction.EAST]);
            })
        });
        it("(1, 0) only north is open", function () {
            var point = new Point(
                1, 0,
                DirectionStatus.OPEN,
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
            );
            return backtrackingService.getUnexploredOptions(point).then((unexploredOptions) => {
                Chai.assert.deepStrictEqual(unexploredOptions, [Direction.NORTH]);
            })
        });
    });
});