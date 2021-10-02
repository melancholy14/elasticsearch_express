import express from "express";
import * as controller from "../controllers/user";

const routes = express.Router();

routes.route("/").get(controller.getUsers);
routes.route("/:id").get(controller.getUser);

routes.route("/login").post(controller.login);

export default routes;
