import Point from "../models/point";
import Direction from "../enums/direction";
import labyrinthRepo from "../repositories/labyrinth-repo";
import DirectionStatus from "../enums/direction-status";
import BacktrackStatus from "../enums/backtrack-status";

class GenerationService {
    public getAvailableOptions(currentPoint: Point): Array<Direction> {
        let options = [];
        if (currentPoint.backtrackNorth === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.NORTH);
        }
        if (currentPoint.backtrackSouth === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.SOUTH);
        }
        if (currentPoint.backtrackEast === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.EAST);
        }
        if (currentPoint.backtrackWest === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.WEST);
        }
        return options;
    }
}

export let generationService = new GenerationService();