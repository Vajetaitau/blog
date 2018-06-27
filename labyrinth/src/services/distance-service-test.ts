import * as _ from "lodash"
import * as Mocha from "mocha"
import * as Chai from "chai"
import DistanceService from "./distance-service"
import DirectionalDistance from "../models/directional-distance"
import Direction from "../enums/direction"
import Point from "../models/point";

describe('DistanceService', function () {
    describe('#getDirectionalDistance', function () {
        it('Should be { NORTH, 10 }', function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(0, 10);
            var directions = new DistanceService().directionalDistance(startPoint, endPoint);

            Chai.assert.strictEqual(_.isEqual(directions, [new DirectionalDistance(Direction.NORTH, 10)]), true, "fix assertions");
        });
        it('Should be { NORTH, 10 } and { EAST, 10 }', function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(10, 10);
            var directions = new DistanceService().directionalDistance(startPoint, endPoint);
            Chai.assert.strictEqual(
                _.isEqual(
                    directions.sort(), 
                    [new DirectionalDistance(Direction.EAST, 10), new DirectionalDistance(Direction.NORTH, 10)].sort()
                ), true, JSON.stringify(directions));
        });
    });
});