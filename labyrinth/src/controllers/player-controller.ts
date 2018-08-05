import * as express from "express";
import { playingService } from '../services/playing-service';


class PlayerController {
    private _router: express.Router;

    constructor() {
        this._router = express.Router();
        this.getPlayer();
    }

    private getPlayer() {
        this._router.get("/", async (request, response) => {
            const playerName = request.query.playerName;
            const player = await playingService.getPlayer(playerName);
            response.send(player);
        });
    }

    public get router() {
        return this._router;
    }
}

export const playerController = new PlayerController();