import express from "express";
import * as controller from "../controllers/users";

const routes = express.Router();

routes.route("/").get(controller.getUsers);
routes.route("/:id").get(controller.getUser);

export default routes;
