import Direction from '../enums/direction';
import DirectionStatus from '../enums/direction-status';
import BacktrackStatus from '../enums/backtrack-status';
import DirectionalDistance from './directional-distance';

class Point {
    private _x: number;
    private _y: number;
    private _north: DirectionStatus;
    private _south: DirectionStatus;
    private _east: DirectionStatus;
    private _west: DirectionStatus;
    private _backtrackNorth: BacktrackStatus;
    private _backtrackSouth: BacktrackStatus;
    private _backtrackEast: BacktrackStatus;
    private _backtrackWest: BacktrackStatus;

    constructor(x: number, y: number,
        north?: DirectionStatus, south?: DirectionStatus, east?: DirectionStatus, west?: DirectionStatus,
        backtrackNorth?: BacktrackStatus, backtrackSouth?: BacktrackStatus, backtrackEast?: BacktrackStatus, backtrackWest?: BacktrackStatus) {

        this._x = x;
        this._y = y;
        this._north = north;
        this._south = south;
        this._east = east;
        this._west = west;
        this._backtrackNorth = backtrackNorth;
        this._backtrackSouth = backtrackSouth;
        this._backtrackEast = backtrackEast;
        this._backtrackWest = backtrackWest;
    }

    public get x() {
        return this._x;
    }

    public get y() {
        return this._y;
    }

    public get north(): DirectionStatus {
        return this._north;
    }

    public get south(): DirectionStatus {
        return this._south;
    }

    public get east(): DirectionStatus {
        return this._east;
    }

    public get west(): DirectionStatus {
        return this._west;
    }

    public get backtrackNorth(): BacktrackStatus {
        return this._backtrackNorth;
    }

    public get backtrackSouth(): BacktrackStatus {
        return this._backtrackSouth;
    }

    public get backtrackEast(): BacktrackStatus {
        return this._backtrackEast;
    }

    public get backtrackWest(): BacktrackStatus {
        return this._backtrackWest;
    }

    public northPoint(): Point {
        return new Point(this.x, this.y + 1);
    }

    public southPoint(): Point {
        return new Point(this.x, this.y - 1);
    }

    public eastPoint(): Point {
        return new Point(this.x + 1, this.y);
    }

    public westPoint(): Point {
        return new Point(this.x - 1, this.y);
    }

    public parentDirection(): Direction {
        if (this._backtrackNorth === BacktrackStatus.PARENT) {
            return Direction.NORTH;
        } else if (this._backtrackSouth === BacktrackStatus.PARENT) {
            return Direction.SOUTH;
        } else if (this._backtrackEast === BacktrackStatus.PARENT) {
            return Direction.EAST;
        } else if (this._backtrackWest === BacktrackStatus.PARENT) {
            return Direction.WEST;
        } else {
            throw new Error("Parent point does not exist :/");
        }
    }

    public parentPoint(): Point {
        return this.pointInDirection(this.parentDirection());
    }

    public pointInDirection(direction: string): Point {
        if (direction === Direction.NORTH) {
            return this.northPoint();
        } else if (direction === Direction.SOUTH) {
            return this.southPoint();
        } else if (direction === Direction.EAST) {
            return this.eastPoint();
        } else if (direction === Direction.WEST) {
            return this.westPoint();
        } else {
            throw new Error("Wrong direction specified! (" + direction + ")");
        }
    }

    public statusInDirection(direction: Direction): DirectionStatus {
        if (direction === Direction.NORTH) {
            return this._north;
        } else if (direction === Direction.SOUTH) {
            return this._south;
        } else if (direction === Direction.EAST) {
            return this._east;
        } else if (direction === Direction.WEST) {
            return this._west;
        } else {
            throw new Error("Wrong direction specified! (" + direction + ")");
        }
    }

    public hasSameCoordinates(point: Point) {
        return this.x === point.x && this.y === point.y;
    }

    public getAvailableOptions(): Array<Direction> {
        let options = [];
        if (this._north === DirectionStatus.OPEN && this._backtrackNorth === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.NORTH);
        }
        if (this._south === DirectionStatus.OPEN && this._backtrackSouth === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.SOUTH);
        }
        if (this._east === DirectionStatus.OPEN && this._backtrackEast === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.EAST);
        }
        if (this._west === DirectionStatus.OPEN && this._backtrackWest === BacktrackStatus.NOT_VISITED_CHILD) {
            options.push(Direction.WEST);
        }
        return options;
    }

    public getDistanceTo(coord: Point) {
        var xDistance = coord.x - this._x;
        var yDistance = coord.y - this._y;
        return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    }

    public getDirectionalDistanceTo(coord: Point) {
        var directions = [];
        var xDistance = coord.x - this._x;
        var yDistance = coord.y - this._y;

        if (xDistance > 0) {
            directions.push(new DirectionalDistance(Direction.EAST, Math.abs(xDistance)));
        } else if (xDistance < 0) {
            directions.push(new DirectionalDistance(Direction.WEST, Math.abs(xDistance)));
        }

        if (yDistance > 0) {
            directions.push(new DirectionalDistance(Direction.NORTH, Math.abs(yDistance)));
        } else if (yDistance < 0) {
            directions.push(new DirectionalDistance(Direction.SOUTH, Math.abs(yDistance)));
        }

        return directions;
    }
}

export default Point