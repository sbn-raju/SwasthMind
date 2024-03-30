import  express  from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index.routes.js";
// import path from "path";



dotenv.config({
    path:"./env",
});

const app = express();

//MiddleWares 
// app.use("views",path.join(__dirname,"src/views"));
// app.use("view" ,"view engine");

//Testing Route
app.listen(process.env.PORT||8080,()=>{
     console.log("App is listening");
});

// app.use("/")
app.use("/",indexRouter);
app.use("/login",loginRouter);