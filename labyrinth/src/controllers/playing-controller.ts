import * as express from "express";
import { playingService } from '../services/playing-service';

class PlayingController {
    private _router: express.Router;

    constructor() {
        this._router = express.Router();
        this.getPoints();
        this.move();
    }

    private getPoints() {
        this._router.get("/points", async (request, response) => {
            const playerName = request.query.playerName;
            const visiblePoints = await playingService.getVisiblePoints(playerName);
            response.send(visiblePoints);
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