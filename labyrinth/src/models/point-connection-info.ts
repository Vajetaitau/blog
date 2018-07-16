import Point from "./point";

class PointConnectionInfo {
    private _from: Point;
    private _to: Point;
    private _moveCount: number;
    private _shortestPath: number;

    constructor(from: Point, to: Point, moveCount: number, shortestPath: number) {
        this._from = from;
        this._to = to;
        this._moveCount = moveCount;
        this._shortestPath = shortestPath;
    }
}