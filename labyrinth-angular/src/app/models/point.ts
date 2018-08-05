import { DirectionStatus } from '../enums/direction-status';

export default class Point {
    x: number;
    y: number;
    north: DirectionStatus;
    south: DirectionStatus;
    east: DirectionStatus;
    west: DirectionStatus;
    hasPlayer: boolean;

    constructor(x: number, y: number,
        north?: DirectionStatus, south?: DirectionStatus,
        east?: DirectionStatus, west?: DirectionStatus) {

        this.x = x;
        this.y = y;
        this.north = north;
        this.south = south;
        this.east = east;
        this.west = west;
        this.hasPlayer = false;
    }

}
