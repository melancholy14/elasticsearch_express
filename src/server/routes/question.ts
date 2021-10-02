import express from "express";
import * as controller from "../controllers/question";

const routes = express.Router();

routes.route("/").get(controller.getQuestions);
routes.route("/:id").get(controller.getQuestion);

routes.route("/").post(controller.addQuestion);

export default routes;
