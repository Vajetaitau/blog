import labyrinthRepo from "../repositories/labyrinth-repo";
import Point from "../models/point";
import Direction from '../enums/direction';
import DirectionStatus from '../enums/direction-status';

class PlayingService {
    public async getVisiblePoints(player: string): Promise<Array<Point>> {
        return await labyrinthRepo.getVisiblePoints(player);
    }
    public async move(player: string, direction: Direction): Promise<Point> {
        const currentPoint = await labyrinthRepo.getPlayerPoint(player);
        if (currentPoint.statusInDirection(direction) === DirectionStatus.OPEN) {
            const nextCoords = currentPoint.pointInDirection(direction);
            await labyrinthRepo.move(player, nextCoords.x, nextCoords.y);
            return await labyrinthRepo.getPlayerPoint(player);
        } else {
            return currentPoint;
        }        
    }
}

export const playingService = new PlayingService();