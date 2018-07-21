import backtrackRepo from "../../src/repositories/backtrack-repo";
import Point from "../../src/models/point";
import * as Chai from "chai";
import BacktrackStatus from '../../src/enums/backtrack-status';

describe("BacktrackRepo", function () {
    describe("#getBacktrackStatus", function () {
        // it("(0, 0) should return values", function () {
        //     const point = new Point(0, 0);
        //     const expectedPointBacktrackStatus = new PointBacktrackStatus(
        //         BacktrackStatus.CLOSED,
        //         BacktrackStatus.CLOSED,
        //         BacktrackStatus.NOT_VISITED_CHILD,
        //         BacktrackStatus.CLOSED
        //     );

        //     return backtrackRepo.getBacktrackStatus(point).then((actualBacktrackStatus) => {
        //         Chai.assert.deepStrictEqual(actualBacktrackStatus, expectedPointBacktrackStatus);
        //     });
        // });
    });
});