import * as express from "express";
import { playingService } from '../services/playing-service';

class PlayingController {
    private _router: express.Router;

    constructor() {
        this._router = express.Router();
        this.getPoint();
        this.move();
    }

    private getPoint() {
        this._router.get("/", async (request, response) => {
            const playerName = request.query.playerName;
            const point = await playingService.getPoint(playerName);
            response.send({
                north: point.north,
                south: point.south,
                east: point.east,
                west: point.west
            });
        })
    }

    private move() {
        this._router.post("/", async(request, response) => {
            console.log(request.body);
            const playerName = request.body.playerName;
            const direction = request.body.direction;
            const point = await playingService.move(playerName, direction);
            response.send({
                north: point.north,
                south: point.south,
                east: point.east,
                west: point.west
            });
        });
    }

    public get router() {
        return this._router;
    }
}

export const playingController = new PlayingController();