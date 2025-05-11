import express, { Router } from "express";
import { mainController } from "../controller/index";

const mainRouter = Router();

mainRouter.get("/hola", mainController);

export default mainRouter;
