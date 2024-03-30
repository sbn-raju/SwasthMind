import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"sbnraju",
    database:"studentPerform"
});

export default pool;
