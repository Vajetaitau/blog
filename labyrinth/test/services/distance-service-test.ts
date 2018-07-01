import * as _ from "lodash"
import * as Chai from "chai"
import distanceService from "../../src/services/distance-service";
import Point from "../../src/models/point";
import Direction from "../../src/enums/direction";
import DirectionalDistance from '../../src/models/directional-distance';

describe('DistanceService', function () {
    describe('#getDirectionalDistance', function () {
        it('Should be { NORTH, 10 }', function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(0, 10);
            var directions = distanceService.directionalDistance(startPoint, endPoint);

            Chai.assert.strictEqual(_.isEqual(directions, [new DirectionalDistance(Direction.NORTH, 10)]), true, "fix assertions");
        });
        it('Should be { NORTH, 10 } and { EAST, 10 }', function () {
            var startPoint = new Point(0, 0);
            var endPoint = new Point(10, 10);
            var directions = distanceService.directionalDistance(startPoint, endPoint);
            Chai.assert.strictEqual(
                _.isEqual(
                    directions.sort(), 
                    [new DirectionalDistance(Direction.EAST, 10), new DirectionalDistance(Direction.NORTH, 10)].sort()
                ), true, JSON.stringify(directions));
        });
    });
});