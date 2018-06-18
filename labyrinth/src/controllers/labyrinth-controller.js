import LabyrinthService from "../services/labyrinth-service"

import Router from "express"
var router = Router();

router.post("/", function(request, response) {
    console.log("xxx");
});

router.get("/", function(request, response) {
    LabyrinthService.createLabyrinth(5, 5);
    const labyrinth = LabyrinthService.getLabyrinth();

    response.send(labyrinth);
});

export default function (app) {
    console.log("Labyrinth controller!");
    app.use("/labyrinth", router);
}