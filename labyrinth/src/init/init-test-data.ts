import QueryBuilder from '../repositories/query/query-builder';

new QueryBuilder()
.addQuery(
    "delete from backtrack_info"
    , (res) => {
        console.log(res);
    }
)
.addQuery(
    "insert into backtrack_info (x, y, north, south, east, west) " +
    "values " + 
    "(0, 0, 'CLOSED', 'CLOSED', 'NOT_VISITED_CHILD', 'CLOSED'), " +
    "(1, 0, 'NOT_VISITED_CHILD', 'CLOSED', 'CLOSED', 'PARENT'), " +
    "(1, 1, 'CLOSED', 'PARENT', 'CLOSED', 'NOT_VISITED_CHILD'), " +
    "(0, 1, 'CLOSED', 'CLOSED', 'PARENT', 'NOT_VISITED_CHILD'), " +
    "(-1, 1, 'CLOSED', 'NOT_VISITED_CHILD', 'PARENT', 'CLOSED'), " +
    "(-1, 0, 'PARENT', 'NOT_VISITED_CHILD', 'CLOSED', 'CLOSED'), " +
    "(-1, -1, 'PARENT', 'CLOSED', 'NOT_VISITED_CHILD', 'CLOSED'), " +
    "(0, -1, 'CLOSED', 'CLOSED', 'NOT_VISITED_CHILD', 'PARENT'), " +
    "(1, -1, 'CLOSED', 'CLOSED', 'NOT_VISITED_CHILD', 'PARENT'), " +
    "(2, -1, 'NOT_VISITED_CHILD', 'CLOSED', 'CLOSED', 'PARENT'), " +
    "(2, 0, 'CLOSED', 'PARENT', 'CLOSED', 'NOT_VISITED_CHILD'), " +
    "(3, 0, 'CLOSED', 'CLOSED', 'PARENT', 'NOT_VISITED_CHILD')"
    , (res) => {
        console.log(res);
    }
)
.addQuery(
    "delete from labyrinth"
    , (res) => {
        console.log(res);
    }
)
.addQuery(
    "insert into labyrinth (x, y, north, south, east, west) " +
    "values " +
    "(0, 0, 'CLOSED', 'CLOSED', 'OPEN', 'CLOSED'), " +
    "(1, 0, 'OPEN', 'CLOSED', 'CLOSED', 'PARENT'), " +
    "(1, 1, 'CLOSED', 'PARENT', 'CLOSED', 'OPEN'), " +
    "(0, 1, 'CLOSED', 'CLOSED', 'PARENT', 'OPEN'), " +
    "(-1, 1, 'CLOSED', 'OPEN', 'PARENT', 'CLOSED'), " +
    "(-1, 0, 'PARENT', 'OPEN', 'CLOSED', 'CLOSED'), " +
    "(-1, -1, 'PARENT', 'CLOSED', 'OPEN', 'CLOSED'), " +
    "(0, -1, 'CLOSED', 'CLOSED', 'OPEN', 'PARENT'), " +
    "(1, -1, 'CLOSED', 'CLOSED', 'OPEN', 'PARENT'), " +
    "(2, -1, 'OPEN', 'CLOSED', 'CLOSED', 'PARENT'), " +
    "(2, 0, 'CLOSED', 'PARENT', 'CLOSED', 'OPEN'), " +
    "(3, 0, 'CLOSED', 'CLOSED', 'PARENT', 'OPEN')"
    , (res) => {
        console.log(res);
    }
)
.executeInTransaction();