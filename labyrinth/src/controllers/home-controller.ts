import * as express from "express"

class HomeController {
    private _router: express.Router;

    constructor() {
        this._router = express.Router();
        this.exposeIndex();
    }

    private exposeIndex() {
        this._router.get("/", (request, response) => {
            response.send(
                "/play?playerName={playerName}         \n" + 
                "/play FormData[playerName, direction] \n"
            );
        });
    }

    public get router() {
        return this._router;
    }
}

export const homeController = new HomeController();