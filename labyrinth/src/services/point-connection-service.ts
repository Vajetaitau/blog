import Point from "../models/point";
import labyrinthRepo from "../repositories/labyrinth-repo";
import backtrackRepo from "../repositories/backtrack-repo";
import NextMoveDirectionFactory from '../factories/next-move-direction-factory';
import Direction from "../enums/direction";
import NextPointFactory from '../factories/next-point-factory';

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
            let newPoint = await this.move(currentPoint, nextMoveDirection, startCoord, endCoord, tooFar);
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

    private async move(moveFrom: Point, moveTo: Direction, startCoord: Point, endCoord: Point, tooFar: number) {
        const newCoord = moveFrom.pointInDirection(moveTo);
        const exists = await labyrinthRepo.exists(newCoord.x, newCoord.y);

        if (exists) {
            await backtrackRepo.updateToVisitedChild(moveFrom, moveTo);
            return newCoord;
        } else {
            const neighbours = await labyrinthRepo.getNeighbourDirections(newCoord.x, newCoord.y);
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

    private async cleanState() {
        // let's not clean OPEN_BUT_TOO_FAR, so we can fill the labyrinth in a better way later
        //await labyrinthRepo.cleanState();
        await backtrackRepo.cleanState();
    }
}

export let pointConnectionService = new PointConnectionService();