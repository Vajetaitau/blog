import Direction from "../enums/direction"
import DirectionalDistance from "../models/directional-distance"

class DistanceService {
    directionalDistance(startPoint, endPoint) {
        var directions = [];
        var xDistance = endPoint.x - startPoint.x;
        var yDistance = endPoint.y - startPoint.y;
    
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