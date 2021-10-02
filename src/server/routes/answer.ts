import express from "express";
import * as controller from "../controllers/answer";

const routes = express.Router();

routes.route("/submit").post(controller.submitAnswer);

routes.route("/user/:user_id").get(controller.getAnswersByUser);

routes.route("/question/:question_id").get(controller.getAnswersByQuestion);

export default routes;
