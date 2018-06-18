import _ from "lodash"

let labyrinth = [];

function getLabyrinth() {
    return labyrinth;
}

function createLabyrinth(xSize, ySize) {
    labyrinth = [];
    _.times(ySize, function() {
        console.log(" row xx");
        let row = [];
        _.times(xSize, function() {
            row.push(getRandomBlock());
        });
        labyrinth.push(row);
    });
}

function getRandomBlock() {
    return {
        top: true,
        left: true
    }
}

export default {
    createLabyrinth: createLabyrinth,
    getLabyrinth: getLabyrinth
}