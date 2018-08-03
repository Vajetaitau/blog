import * as express from "express"
import * as Cors from "cors"
import * as path from "path"


// import * as x from "./public/move.min.js"
// import a from "./public/index.html"
// console.log(x);
// const moveJs = require("./public/move.min.js");
// const moveJs = require(path.join(__dirname, "../node_modules/move-js/move.min.js"));


class App {
    constructor() {
        let app = express();

        // Cors library is only required, when accessing controllers in same domain
        // TODO: maybe delete later, if not neccessary any more 2018-06-08
        app.use(Cors());
        app.options("*", Cors());
        
        app.use("/static", express.static(path.join(__dirname, "/public")));

        app.get('/', function (request, response) {
            response.sendFile(path.join(__dirname, "/public/index.html"));
        });            

        app.listen(8080, () => console.log("Example app listening on port 8080!"));
    }
}

new App();






