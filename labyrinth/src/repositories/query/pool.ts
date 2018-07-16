import { Pool } from 'pg';
export default new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test_labyrinth',
    password: 'postgres',
    port: 5432,
}); 