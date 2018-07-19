import * as _ from "lodash";
import Point from "../models/point";
import Direction from '../enums/direction';
import labyrinthRepo from "../repositories/labyrinth-repo";
import DirectionStatus from '../enums/direction-status';
import BacktrackStatus from "../enums/backtrack-status";

class MovingService {

    public async move(moveFrom: Point, moveTo: Direction) {
        const newCoord = moveFrom.pointInDirection(moveTo);
        const neighbourDirections = await labyrinthRepo.getNeighbourPointDirections(newCoord.x, newCoord.y);

        const parentDirection = Direction.oposite(moveTo);
        const nextPoint = this.getNextPoint(newCoord, parentDirection, neighbourDirections);
        const parentForNextPoint = this.getMoveFromWithVisitedChild(moveFrom, moveTo);
        await labyrinthRepo.saveNewPoint(nextPoint, parentForNextPoint, neighbourDirections);

        return nextPoint;
    }

    private getMoveFromWithVisitedChild(moveFrom: Point, moveTo: Direction) {
        let northBS = moveFrom.backtrackNorth;
        let southBS = moveFrom.backtrackSouth;
        let eastBS = moveFrom.backtrackEast;
        let westBS = moveFrom.backtrackWest;

        if (moveTo === Direction.NORTH) {
            northBS = BacktrackStatus.VISITED_CHILD;
        } else if (moveTo === Direction.SOUTH) {
            southBS = BacktrackStatus.VISITED_CHILD;
        } else if (moveTo === Direction.EAST) {
            eastBS = BacktrackStatus.VISITED_CHILD;
        } else if (moveTo === Direction.WEST) {
            westBS = BacktrackStatus.VISITED_CHILD;
        } else {
            throw new Error("Wrong direction argument: " + moveTo);
        }

        return new Point(moveFrom.x, moveFrom.y, 
            moveFrom.north, moveFrom.south, moveFrom.east, moveFrom.west,
            northBS, southBS, eastBS, westBS
        );
    }

    private getNextPoint(newCoord: Point, parentDirection: Direction, neighbourDirections: Array<Direction>): Point {
        const north = this.getDirectionStatus(Direction.NORTH, neighbourDirections, parentDirection);
        const south = this.getDirectionStatus(Direction.SOUTH, neighbourDirections, parentDirection);
        const east = this.getDirectionStatus(Direction.EAST, neighbourDirections, parentDirection);
        const west = this.getDirectionStatus(Direction.WEST, neighbourDirections, parentDirection);
        const northBS = this.getBacktrackStatus(Direction.NORTH, neighbourDirections, parentDirection);
        const southBS = this.getBacktrackStatus(Direction.SOUTH, neighbourDirections, parentDirection);
        const eastBS = this.getBacktrackStatus(Direction.EAST, neighbourDirections, parentDirection);
        const westBS = this.getBacktrackStatus(Direction.WEST, neighbourDirections, parentDirection);

        return new Point(
            newCoord.x, newCoord.y,
            north, south, east, west,
            northBS, southBS, eastBS, westBS
        )
    }

    private getDirectionStatus(neighbourDirection: Direction, existingNeighboars: Array<Direction>, parentDirection: Direction): DirectionStatus {
        const neighbourExists = _.includes(existingNeighboars, neighbourDirection);
        return neighbourExists && neighbourDirection !== parentDirection ? DirectionStatus.CLOSED : DirectionStatus.OPEN;
    }

    private getBacktrackStatus(neighbourDirection: Direction, existingNeighboars: Array<Direction>, parentDirection: Direction): BacktrackStatus {
        if (neighbourDirection === parentDirection) {
            return BacktrackStatus.PARENT;
        } else {
            const neighbourExists = _.includes(existingNeighboars, neighbourDirection)
            if (neighbourExists) {
                return BacktrackStatus.CLOSED;
            } else {
                return BacktrackStatus.NOT_VISITED_CHILD;
            }
        }
    }

}

export let movingService = new MovingService();