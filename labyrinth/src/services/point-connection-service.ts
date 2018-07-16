import * as _ from "lodash"
import { moveOptionsService } from "./move-options-service"
import Direction from "../enums/direction"
import DirectionRandomizer from "../models/direction-randomizer"
import Path from "../models/path"
import Point from "../models/point";
import DirectionalProbability from "../models/directional-probability";
import { backtrackingService } from "./backtracking-service";
import { directionRandomizationService } from "./direction-randomization-service";
import { movingService } from "./moving-service";
import { generationService } from "./generation-service";

class PointConnectionService {

    connectPointsNew(startPoint: Point, endPoint: Point) {
        let currentPoint = startPoint;
        let moveCount = 0;
        let shortestPath = 0;
        while (!currentPoint.hasSameCoordinates(endPoint)) { // TODO: should be rewriten using recursion, promises can't loop
            generationService.getAvailableOptions(currentPoint).then(options => {
                if (options.length > 0) {
                    let directionalProbabilities = moveOptionsService.availableOptionsProbabilitiesNew(currentPoint, endPoint, options);
                    let nextMoveDirection = directionRandomizationService.getRandomDirection(directionalProbabilities);
                    let newPoint = movingService.move(currentPoint, nextMoveDirection); // TODO: needs implementation
                    currentPoint = newPoint;

                    shortestPath++;
                }
                else {
                    let parent = backtrackingService.backtrackToParent(currentPoint);
                    currentPoint = parent;
    
                    shortestPath--; // when moving backwards, we substract
                }
            });
            moveCount++;
        }

    }
    connectPoints(startPoint: Point, endPoint: Point) {
        let currentPoint = startPoint;
        var path = new Path([startPoint]);
        let safeguard = 1;
        while (!_.isEqual(currentPoint, endPoint)) {
            var directionalProbabilities = new Array<DirectionalProbability>();

            // We are doing this to make sure, that current point has moving options.
            // In the case it is closed down by a path around it. Backtrack to the 
            // point which has open options.
            while (directionalProbabilities.length == 0) {
                currentPoint = backtrackingService.getLastOpenPoint(path);
                directionalProbabilities = moveOptionsService.availableOptionsProbabilities(path, currentPoint, endPoint);
            }

            // Get random option for the next moving direction. And assign point,
            // which is at that direction to the current point
            let directionRandomizer = new DirectionRandomizer(directionalProbabilities);
            let direction = directionRandomizer.randomDirection();
            currentPoint = currentPoint.pointInDirection(direction);

            // And add it to the path of course :)
            path.add(currentPoint);

            safeguard++;
            if (safeguard > 10000) {
                console.log(path.length);
                console.log(path);
                throw new Error("Could not connect points, safeguard was hit!");
            }
        }

        return path;
    }
}

export default new PointConnectionService()