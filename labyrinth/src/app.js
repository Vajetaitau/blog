import express from "express";
import Cors from "cors";

import LabyrinthController from "./controllers/labyrinth-controller";

let app = express();

// Cors library is only required, when accessing controllers in same domain
// TODO: maybe delete later, if not neccessary any more 2018-06-08
app.use(Cors());
app.options("*", Cors());

// Register controllers

LabyrinthController(app);

app.get("/", (req, res) => res.send("Hello world!x"));
app.listen(3000, () => console.log("Example app listening on port 3000x!"));
