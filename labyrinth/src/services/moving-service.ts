import Point from "../models/point";
import Direction from '../enums/direction';
import labyrinthRepo from "../repositories/labyrinth-repo";
import backtrackRepo from "../repositories/backtrack-repo";
import NextPointFactory from '../factories/next-point-factory';

class MovingService {

    public async move(moveFrom: Point, moveTo: Direction, startCoord: Point, endCoord: Point, tooFar: number) {
        const newCoord = moveFrom.pointInDirection(moveTo);
        const exists = await labyrinthRepo.exists(newCoord.x, newCoord.y);

        if (exists) {
            await backtrackRepo.updateToVisitedChild(moveFrom, moveTo);
            return newCoord;
        } else {
            const neighbours = await labyrinthRepo.getNeighbourPointDirections(newCoord.x, newCoord.y);
            const nextPointFactory = new NextPointFactory(
                newCoord,
                Direction.oposite(moveTo),
                neighbours,
                startCoord,
                endCoord,
                tooFar
            );
            const nextPoint = nextPointFactory.getNextPoint();
            await labyrinthRepo.saveNewPoint(nextPoint, neighbours);
            return nextPoint;
        }
    }
}

export let movingService = new MovingService();