import NodeFetch from "node-fetch";

export default {
    getLabyrinth: function() {
        return NodeFetch("http://localhost:3000/labyrinth", {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json();
        }).catch(err => {
            console.log(err);
        });
    }
}