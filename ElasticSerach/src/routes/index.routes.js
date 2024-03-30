import express from 'express';
const routerIndex = express.Router();
import indexController from "../controllers/index.controller.js";

const indexRoute = routerIndex.get("/",indexController);

export default indexRoute;
