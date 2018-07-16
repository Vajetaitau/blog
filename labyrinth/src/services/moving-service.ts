import Point from "../models/point";
import Direction from "../enums/direction";

class MovingService {
    
    public move(moveFrom: Point, moveTo: Direction) : Point {
        return moveFrom;
    }

}

export let movingService = new MovingService();