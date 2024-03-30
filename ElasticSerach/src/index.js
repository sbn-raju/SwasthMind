import express from 'express';
import pool from './db/index.db.js';
import indexRoute from './routes/index.routes.js'



// const {Pool} = pkg;
let app = express();



pool.connect(async(err, client) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err);
      return;
    }
    console.log('Connected to PostgreSQL');
    try {
      const result = await client.query('SELECT * FROM student_performance');
    }catch(err){
       console.log(err);
    }
});

let port = 8080;
app.listen(port,()=>{
    console.log("App is listening at port :",port);
});

app.get("/",indexRoute);

  