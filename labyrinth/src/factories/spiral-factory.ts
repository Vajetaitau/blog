import Point from '../models/point';
class SpiralFactory {
    private _cofA: number;
    private _cofB: number;
    private readonly e = 2.71828;

    constructor(cofA: number, cofB: number) {
        this._cofA = cofA;
        this._cofB = cofB;
    }

    public getSpiralCoords(angle: number): Point {
        // Polar coordinates
        var angleInRadius = angle / 180 * Math.PI;
        var distance = this._cofA * Math.pow(this.e, this._cofB * angleInRadius) - this._cofA;
        
        // To Cartesian coordinates
        var x = distance * Math.cos(angleInRadius);
        var y = distance * Math.sin(angleInRadius);
    
        return new Point(x|0, y|0);
    }
}

export default SpiralFactory