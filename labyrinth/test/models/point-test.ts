import { assert } from "chai"
import Point from "../../src/models/point";
import Direction from "../../src/enums/direction";
import DirectionStatus from '../../src/enums/direction-status';
import BacktrackStatus from '../../src/enums/backtrack-status';
import DirectionalDistance from "../../src/models/directional-distance";

describe("Point", function () {
    describe("#getAvailableOptions", function () {
        it("Should be only EAST", function () {
            var point = new Point(0, 0, 
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
                DirectionStatus.OPEN,
                DirectionStatus.CLOSED,
                BacktrackStatus.CLOSED,
                BacktrackStatus.CLOSED,
                BacktrackStatus.NOT_VISITED_CHILD,
                BacktrackStatus.CLOSED
            );
            assert.deepStrictEqual(point.getAvailableOptions(), [Direction.EAST]);
        });
        it("Should be only NORTH", function () {
            var point = new Point(0, 0, 
                DirectionStatus.OPEN,
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
                BacktrackStatus.NOT_VISITED_CHILD,
                BacktrackStatus.CLOSED,
                BacktrackStatus.CLOSED,
                BacktrackStatus.CLOSED
            );
            assert.deepStrictEqual(point.getAvailableOptions(), [Direction.NORTH]);
        });
        it("Should be empty", function () {
            var point = new Point(0, 0, 
                DirectionStatus.OPEN,
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
                DirectionStatus.CLOSED,
                BacktrackStatus.VISITED_CHILD,
                BacktrackStatus.CLOSED,
                BacktrackStatus.CLOSED,
                BacktrackStatus.CLOSED
            );
            assert.deepStrictEqual(point.getAvailableOptions(), []);
        });
    });
    describe("#getDirectionalDistance", function () {
        it("Should be { NORTH, 10 }", function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(0, 10);
            assert.deepStrictEqual(
                startPoint.getDirectionalDistanceTo(endPoint), 
                [new DirectionalDistance(Direction.NORTH, 10)]
            );
        });
        it("Should be { NORTH, 10 } and { EAST, 10 }", function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(10, 10);
            assert.deepStrictEqual(
                startPoint.getDirectionalDistanceTo(endPoint),
                [new DirectionalDistance(Direction.EAST, 10), new DirectionalDistance(Direction.NORTH, 10)].sort()
            );
        });
    });
});