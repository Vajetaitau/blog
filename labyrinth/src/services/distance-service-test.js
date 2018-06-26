import Assert from "assert"
import _ from "lodash"
import DistanceService from "./distance-service"
import DirectionalDistance from "../models/directional-distance"
import Direction from "../enums/direction"

describe('DistanceService', function () {
    describe('#getDirectionalDistance', function () {
        it('Should be { NORTH, 10 }', function () {
            var startPoint = { x: 0, y: 0 };
            var endPoint = { x: 0, y: 10 };
            var directions = new DistanceService().directionalDistance(startPoint, endPoint);
            Assert.strictEqual(_.isEqual(directions, [new DirectionalDistance(Direction.NORTH, 10)]), true, directions);
        });
        it('Should be { NORTH, 10 } and { EAST, 10 }', function () {
            var startPoint = { x: 0, y: 0 };
            var endPoint = { x: 10, y: 10 };
            var directions = new DistanceService().directionalDistance(startPoint, endPoint);
            Assert.strictEqual(
                _.isEqual(
                    directions.sort(), 
                    [new DirectionalDistance(Direction.EAST, 10), new DirectionalDistance(Direction.NORTH, 10)].sort()
                ), true, JSON.stringify(directions));
        });
    });
});