import express from "express";
import * as controller from "../controllers/answer";

const routes = express.Router();

routes.route("/submit").post(controller.submitAnswer);

routes.route("/my").get(controller.getAnswersByUser);

routes.route("/question/:question_id").get(controller.getAnswersByQuestionId);

export default routes;
