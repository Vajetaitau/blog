export default class Player {
    name: string;
    x: number;
    y: number;
    visibleRadius: number;

    constructor(name: string, x: number, y: number, visibleRadius: number) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.visibleRadius = visibleRadius;
    }
}