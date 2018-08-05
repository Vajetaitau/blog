import { DirectionStatus } from '../enums/direction-status';

export default class Point {
    readonly x: number;
    readonly y: number;
    readonly north: DirectionStatus;
    readonly south: DirectionStatus;
    readonly east: DirectionStatus;
    readonly west: DirectionStatus;

    constructor(x: number, y: number, north: DirectionStatus, south: DirectionStatus,
                east: DirectionStatus, west: DirectionStatus) {
        this.x = x;
        this.y = y;
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
    }

}
