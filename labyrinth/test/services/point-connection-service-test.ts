import * as Chai from "chai"
import Point from "../../src/models/point";
import PointConnectionService from "../../src/services/point-connection-service";

describe("PointConnectionService", function () {
    describe("#connectPoints", function () {
        it('Path should probably be longer, than shortest distance between two points', function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(10, 0);
            var path = PointConnectionService.connectPoints(startPoint, endPoint);
            Chai.assert.isTrue(path.length > 10);
        });
    });
});