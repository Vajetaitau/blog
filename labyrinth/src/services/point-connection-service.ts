import Point from "../models/point";
import { movingService } from "./moving-service";
import labyrinthRepo from "../repositories/labyrinth-repo";
import backtrackRepo from "../repositories/backtrack-repo";
import NextMoveDirectionFactory from '../factories/next-move-direction-factory';

class PointConnectionService {

    public async connectPointsNew(startCoord: Point, endCoord: Point, tooFar: number) {
        await this.makeMoves(startCoord, startCoord, endCoord, 0, tooFar);
        await this.cleanState();
    }

    private async makeMoves(currentCoord: Point, startCoord: Point, endCoord: Point, i: number, tooFar: number): Promise<Point> {
        const currentPoint = await labyrinthRepo.getPoint(currentCoord.x, currentCoord.y);
        const options = currentPoint.getAvailableOptions();
        let nextPoint;
        if (options.length > 0) {
            const nextMoveDirection = new NextMoveDirectionFactory(currentPoint, endCoord).getRandomDirection();
            let newPoint = await movingService.move(currentPoint, nextMoveDirection, startCoord, endCoord, tooFar);
            nextPoint = newPoint;
        } else {
            nextPoint = currentPoint.parentPoint();
        }
        
        if (nextPoint.hasSameCoordinates(endCoord)/*|| i > 1000*/) {
            return nextPoint;
        } else {
            return await this.makeMoves(nextPoint, startCoord, endCoord, i + 1, tooFar);
        }        
    }

    private async cleanState() {
        await labyrinthRepo.cleanState();
        await backtrackRepo.cleanState();
    }
}

export let pointConnectionService = new PointConnectionService();