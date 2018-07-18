import * as Chai from "chai"
import Point from "../../src/models/point";
import { pointConnectionService } from "../../src/services/point-connection-service";

describe("PointConnectionService", function () {
    describe("#connectPointsNew", function () {
        it('Path should probably be longer, than shortest distance between two points', async function () {
            var startPoint = new Point(100, 0);
            var endPoint = new Point(110, 10);
            var moveCount = await pointConnectionService.connectPointsNew(startPoint, endPoint);
            Chai.assert.isTrue(false);
        });
    });
});