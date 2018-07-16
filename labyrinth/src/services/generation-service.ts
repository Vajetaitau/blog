import Point from "../models/point";
import Direction from "../enums/direction";
import labyrinthRepo from "../repositories/labyrinth-repo";
import DirectionStatus from "../enums/direction-status";
import BacktrackStatus from "../enums/backtrack-status";

class GenerationService {
    public getAvailableOptions(currentPoint: Point): Promise<Array<Direction>> {
        return labyrinthRepo.getPointX(currentPoint.x, currentPoint.y).then(point => {
            let options = [];
            if (point.north === DirectionStatus.OPEN && point.backtrackNorth === BacktrackStatus.NOT_VISITED_CHILD) {
                options.push(Direction.NORTH);
            }
            if (point.south === DirectionStatus.OPEN && point.backtrackSouth === BacktrackStatus.NOT_VISITED_CHILD) {
                options.push(Direction.SOUTH);
            }
            if (point.east === DirectionStatus.OPEN && point.backtrackEast === BacktrackStatus.NOT_VISITED_CHILD) {
                options.push(Direction.EAST);
            }
            if (point.west === DirectionStatus.OPEN && point.backtrackWest === BacktrackStatus.NOT_VISITED_CHILD) {
                options.push(Direction.WEST);
            }
            return options;
        });
    }
}

export let generationService = new GenerationService();