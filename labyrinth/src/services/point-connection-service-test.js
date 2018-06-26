import _ from "lodash"
import assert from "assert"
import PointConnectionService from "./point-connection-service"
import Point from "../models/point"

describe("PointConnectionService", function () {
    describe("#connectPoints", function () {
        it('Path should probably be longer, than shortest distance between two points', function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(10, 0);
            var path = new PointConnectionService().connectPoints(startPoint, endPoint);
            assert.strictEqual(path.length > 10, true, path);
        });
    });
});