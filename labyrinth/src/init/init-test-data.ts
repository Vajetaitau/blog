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
    "(3, 0, 'CLOSED', 'CLOSED', 'PARENT', 'NOT_VISITED_CHILD'), " +
    "(99, 0, 'VISITED_CHILD', 'CLOSED', 'CLOSED', 'CLOSED'), " +
    "(100, 0, 'NOT_VISITED_CHILD', 'PARENT', 'NOT_VISITED_CHILD', 'NOT_VISITED_CHILD')"    
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
    "(1, 0, 'OPEN', 'CLOSED', 'CLOSED', 'OPEN'), " +
    "(1, 1, 'CLOSED', 'OPEN', 'CLOSED', 'OPEN'), " +
    "(0, 1, 'CLOSED', 'CLOSED', 'OPEN', 'OPEN'), " +
    "(-1, 1, 'CLOSED', 'OPEN', 'OPEN', 'CLOSED'), " +
    "(-1, 0, 'OPEN', 'OPEN', 'CLOSED', 'CLOSED'), " +
    "(-1, -1, 'OPEN', 'CLOSED', 'OPEN', 'CLOSED'), " +
    "(0, -1, 'CLOSED', 'CLOSED', 'OPEN', 'OPEN'), " +
    "(1, -1, 'CLOSED', 'CLOSED', 'OPEN', 'OPEN'), " +
    "(2, -1, 'OPEN', 'CLOSED', 'CLOSED', 'OPEN'), " +
    "(2, 0, 'CLOSED', 'OPEN', 'OPEN', 'CLOSED'), " +
    "(3, 0, 'CLOSED', 'CLOSED', 'OPEN', 'OPEN'), " +
    "(99, 0, 'OPEN', 'CLOSED', 'CLOSED', 'CLOSED'), " +
    "(100, 0, 'OPEN', 'OPEN', 'OPEN', 'OPEN')"    
    , (res) => {
        console.log(res);
    }
)
.executeInTransaction();