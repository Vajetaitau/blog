import { QueryResult, Pool } from "pg";
import pool from "./pool"

class QueryBuilder {
    private _queryArray: Array<Query>;
    private _pool: Pool;

    constructor() {
        this._queryArray = [];
        this._pool = pool;
    }

    public async executeInAsyncTransaction() {
        const client = await this._pool.connect();
        let responseArray = new Array<QueryResult>();

        try {
            await client.query("BEGIN");

            for (const queryObj of this._queryArray) {
                const response = await client.query(queryObj.query, queryObj.values);
                queryObj.successCallback(response);
                responseArray.push(response);
            }

            await client.query("COMMIT");
        } catch(e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }

        return responseArray;
    }

    public addQuery(query: string, successCallback: (queryResult: QueryResult) => void, values?: any[]): QueryBuilder {
        this._queryArray.push(new Query(query, successCallback, values))
        return this;
    }

    public query(queryString: string, values?: any[]): Promise<QueryResult> {
        return pool.query(queryString, values);
    }

    public executeInTransaction() {
        this._pool.connect((err, client, done) => {
            const shouldAbort = (err: Error) => {
                if (err) {
                    console.error('Error in transaction', err.stack);
                    client.query('ROLLBACK', (err) => {
                        if (err) {
                            console.error('Error rolling back client', err.stack)
                        }
                        // release the client back to the pool
                        done()
                    })
                }
                return !!err
            };

            client.query('BEGIN', (err) => {
                if (shouldAbort(err)) {
                    return;
                }

                this._queryArray.forEach((queryObj) => {
                    client.query(queryObj.query, queryObj.values, (err, res) => {
                        if (shouldAbort(err)) {
                            return;
                        }
                        queryObj.successCallback(res);
                    });
                });

                client.query("COMMIT", (err) => {
                    if (err) {
                        console.error("Error committing transaction", err.stack)
                    }
                    done();
                });
            });
        });
    }
}

class Query {
    private _query: string;
    private _values: any[];
    private _successCallback: (queryResult: QueryResult) => void

    constructor(query: string, successCallback: (queryResult: QueryResult) => void, values?: any[]) {
        this._query = query;
        this._values = values;
        this._successCallback = successCallback;
    }

    public get query() {
        return this._query;
    }

    public get values() {
        return this._values;
    }

    public get successCallback() {
        return this._successCallback;
    }
}

export default QueryBuilder