import * as _ from "lodash"
import * as Mocha from "mocha"
import * as Chai from "chai"
import BacktrackingService from "./backtracking-service";
import Point from "../models/point";
import Path from "../models/path";

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
        
            var lastOpenPoint = new BacktrackingService().getLastOpenPoint(path);
            Chai.assert.deepEqual<Point>(lastOpenPoint, new Point(2, 2));
        });
        it("Should return the second last", function() {
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

            var lastOpenPoint = new BacktrackingService().getLastOpenPoint(path);
            Chai.assert.deepEqual<Point>(lastOpenPoint, new Point(1, 0));
        });
    });
});

BacktrackingService