import * as express from "express";
import * as bodyParser from "body-parser";
import * as Cors from "cors";
import { homeController } from './controllers/home-controller';
import { playingController } from './controllers/playing-controller';

class App {
    constructor() {
        let app = express();

        // Cors library is only required, when accessing controllers in same domain
        // TODO: maybe delete later, if not neccessary any more 2018-06-08
        app.use(Cors());
        app.options("*", Cors());
        app.use(bodyParser.urlencoded());
        app.use(bodyParser.json());
        app.use("/home", homeController.router);
        app.use("/play", playingController.router);

        app.listen(3000, () => console.log("Example app listening on port 3000!"));
    }
}

new App()






