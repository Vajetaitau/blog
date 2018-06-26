import _ from "lodash"
import MoveOptionsService from "./move-options-service"
import Direction from "../enums/direction"
import DirectionRandomizer from "../models/direction-randomizer"
import Path from "../models/path"

class PointConnectionService {
    connectPoints(startPoint, endPoint) {
        let currentPoint = startPoint;
        var path = new Path();
        let safeguard = 0;
        while (!_.isEqual(currentPoint, endPoint)) {
            let directionalProbabilities = new MoveOptionsService().availableOptionsProbabilities(path, currentPoint, endPoint);
            let directionRandomizer = new DirectionRandomizer(directionalProbabilities);
            let direction = directionRandomizer.randomDirection();
            currentPoint = currentPoint.pointInDirection(direction);
            path.add(currentPoint);
            
            safeguard++;
            if (safeguard > 1000) {
                throw new Error("Could not connect points, safeguard was hit!");
            }
        }
    
        return path;
    }
}

export default PointConnectionService