import pkg from 'pg';
const { Pool } = pkg;
export const pool= new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:PSQL_PASS,
    database:process.env.PSQL_DATABASE
});


export default pool;