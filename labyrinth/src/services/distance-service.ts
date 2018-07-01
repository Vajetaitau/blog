import Direction from "../enums/direction"
import DirectionalDistance from "../models/directional-distance"
import Point from "../models/point";

class DistanceService {
    directionalDistance(startPoint: Point, endPoint: Point) {
        var directions = [];
        var xDistance = endPoint.x - startPoint.x;
        var yDistance = endPoint.y - startPoint.y;
    
        if (xDistance > 0) {
            directions.push(new DirectionalDistance(Direction.EAST, Math.abs(xDistance)));
        } else if (xDistance < 0) {
            directions.push(new DirectionalDistance(Direction.WEST, Math.abs(xDistance)));
        }
    
        if (yDistance > 0) {
            directions.push(new DirectionalDistance(Direction.NORTH, Math.abs(yDistance)));
        } else if (yDistance < 0) {
            directions.push(new DirectionalDistance(Direction.SOUTH, Math.abs(yDistance)));
        }
    
        return directions;
    }
}

export default new DistanceService();