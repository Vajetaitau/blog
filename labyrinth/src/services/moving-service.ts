import * as _ from "lodash";
import Point from "../models/point";
import Direction from '../enums/direction';
import labyrinthRepo from "../repositories/labyrinth-repo";
import DirectionStatus from '../enums/direction-status';
import BacktrackStatus from "../enums/backtrack-status";

class MovingService {

    public async move(moveFrom: Point, moveTo: Direction, endCoord: Point) {
        const newCoord = moveFrom.pointInDirection(moveTo);
        const neighbourDirections = await labyrinthRepo.getNeighbourPointDirections(newCoord.x, newCoord.y);

        const parentDirection = Direction.oposite(moveTo);
        const nextPoint = this.getNextPoint(newCoord, endCoord, parentDirection, neighbourDirections);
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

    private getNextPoint(newCoord: Point, endCoord: Point, parentDirection: Direction, neighbourDirections: Array<Direction>): Point {
        const north = this.getDirectionStatus(newCoord, endCoord, Direction.NORTH, neighbourDirections, parentDirection);
        const south = this.getDirectionStatus(newCoord, endCoord, Direction.SOUTH, neighbourDirections, parentDirection);
        const east = this.getDirectionStatus(newCoord, endCoord, Direction.EAST, neighbourDirections, parentDirection);
        const west = this.getDirectionStatus(newCoord, endCoord, Direction.WEST, neighbourDirections, parentDirection);
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

    private getDirectionStatus(newCoord: Point, endCoord: Point, neighbourDirection: Direction, existingNeighboars: Array<Direction>, parentDirection: Direction): DirectionStatus {
        const neighbourExists = _.includes(existingNeighboars, neighbourDirection);
        if (neighbourExists && neighbourDirection !== parentDirection) {
            return DirectionStatus.CLOSED;
        } else if (Math.abs(endCoord.x - newCoord.x) + Math.abs(endCoord.y - newCoord.y) > 110) {
            return DirectionStatus.OPEN_BUT_TOO_FAR;
        } else {
            return DirectionStatus.OPEN;
        }
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