import * as _ from "lodash"
import Direction from '../enums/direction';
import Point from '../models/point';
import DirectionStatus from '../enums/direction-status';
import BacktrackStatus from '../enums/backtrack-status';
class NextPointFactory {
    private _newCoord: Point;
    private _parentDirection: Direction;
    private _neighboars: Array<Direction>;
    private _startCoord: Point;
    private _endCoord: Point;
    private _tooFar: number;

    constructor(newCoord: Point, parentDirection: Direction, neighboars: Array<Direction>, startCoord: Point, endCoord: Point, tooFar: number) {
        this._newCoord = newCoord;
        this._parentDirection = parentDirection;
        this._neighboars = neighboars;
        this._startCoord = startCoord;
        this._endCoord = endCoord;
        this._tooFar = tooFar;
    }

    public getNextPoint(): Point {
        return new Point(
            this._newCoord.x, this._newCoord.y,
            this.getDirectionStatus(Direction.NORTH),
            this.getDirectionStatus(Direction.SOUTH),
            this.getDirectionStatus(Direction.EAST),
            this.getDirectionStatus(Direction.WEST),
            this.getBacktrackStatus(Direction.NORTH),
            this.getBacktrackStatus(Direction.SOUTH),
            this.getBacktrackStatus(Direction.EAST),
            this.getBacktrackStatus(Direction.WEST)
        )
    }

    private getDirectionStatus(direction: Direction): DirectionStatus {
        const neighboarExists = _.includes(this._neighboars, direction);
        if (neighboarExists && direction !== this._parentDirection) {
            return DirectionStatus.CLOSED;
        } else if (this.endCoordsAreTooFar()) {
            return DirectionStatus.OPEN_BUT_TOO_FAR;
        } else {
            return DirectionStatus.OPEN;
        }
    }

    private endCoordsAreTooFar() {
        // distance from a straight line going between points: startCoord and endCoord
        const distanceFromLine =
            Math.abs(
                (this._endCoord.y - this._startCoord.y) * this._newCoord.x
                - (this._endCoord.x - this._startCoord.x) * this._newCoord.y
                + this._endCoord.x * this._startCoord.y
                - this._endCoord.y * this._startCoord.x
            )
            /
            Math.sqrt(
                Math.pow(this._endCoord.y - this._startCoord.y, 2)
                + Math.pow(this._endCoord.x - this._startCoord.x, 2)
            )
        // midle point of that line
        const middlePoint = new Point(
            (this._startCoord.x + this._endCoord.x) / 2, 
            (this._startCoord.y + this._endCoord.y) / 2
        );
        const halfOfLine = this._startCoord.getDistanceTo(middlePoint);
        // distance from the middle of the line
        const distanceFromMiddle = this._newCoord.getDistanceTo(middlePoint);
        return distanceFromLine > this._tooFar || distanceFromMiddle > halfOfLine + this._tooFar;
    }

    private getBacktrackStatus(direction: Direction): BacktrackStatus {
        if (direction === this._parentDirection) {
            return BacktrackStatus.PARENT;
        } else {
            const neighboarExists = _.includes(this._neighboars, direction);
            if (neighboarExists) {
                return BacktrackStatus.CLOSED;
            } else {
                return BacktrackStatus.NOT_VISITED_CHILD;
            }
        }
    }
}

export default NextPointFactory;