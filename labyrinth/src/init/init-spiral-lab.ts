import SpiralFactory from '../factories/spiral-factory';
import Point from '../models/point';
import { pointConnectionService } from '../services/point-connection-service';

const spiralFactory = new SpiralFactory(1, 0.3063489);
const distanceBetweenPoints = 10;
const tooFar = 3;

let angle: number;
let coords: Point;

init().then(() => {
    generate(200);
})

async function init() {
    angle = 360;
    coords = spiralFactory.getSpiralCoords(angle);
    await pointConnectionService.connectPointsNew(new Point(0, 0), coords, tooFar);
}

async function generate(times: number) {
    for (let i = 0; i < times; i++) {
        angle = getNextAngle();
        const nextCoords = spiralFactory.getSpiralCoords(angle);
        await pointConnectionService.connectPointsNew(coords, nextCoords, tooFar);
        coords = nextCoords;
        console.log(coords.x, coords.y);
    }
}

function getNextAngle() {
    const r = coords.getDistanceTo(new Point(0, 0));
    const nextAngle = (180 * distanceBetweenPoints) / (Math.PI * r);
    return (nextAngle + angle) | 0;
}