import * as _ from "lodash"
import * as Mocha from "mocha"
import * as Chai from "chai"
import PointConnectionService from "./point-connection-service"
import Point from "../models/point"

describe("PointConnectionService", function () {
    describe("#connectPoints", function () {
        it('Path should probably be longer, than shortest distance between two points', function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(10, 0);
            var path = new PointConnectionService().connectPoints(startPoint, endPoint);
            Chai.assert.strictEqual(path.length > 10, true, "fix this");
        });
    });
});