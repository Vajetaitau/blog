import * as express from "express";

class PlayerController {
    private _router: express.Router;

    constructor() {
        this._router = express.Router();
        this.getVisibleRadius();
    }

    private getVisibleRadius() {
        this._router.get("/radius", async (request, response) => {
            const playerName = request.query.playerName;
            response.send("10");
        })
    }

    public get router() {
        return this._router;
    }
}

export const playerController = new PlayerController();