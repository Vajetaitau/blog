import Direction from "../enums/direction"
import DirectionalDistance from "../models/directional-distance"
import Point from "../models/point";

class DistanceService {
    directionalDistance(startPoint: Point, endPoint: Point) {
        var directions = [];
        var xDistance = Math.abs(endPoint.x - startPoint.x);
        var yDistance = Math.abs(endPoint.y - startPoint.y);
    
        if (xDistance > 0) {
            directions.push(new DirectionalDistance(Direction.EAST, xDistance));
        } else if (xDistance < 0) {
            directions.push(new DirectionalDistance(Direction.WEST, xDistance));
        }
    
        if (yDistance > 0) {
            directions.push(new DirectionalDistance(Direction.NORTH, yDistance));
        } else if (yDistance < 0) {
            directions.push(new DirectionalDistance(Direction.SOUTH, yDistance));
        }
    
        return directions;
    }
}

export default DistanceService;