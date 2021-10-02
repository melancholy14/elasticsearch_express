import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";

import * as routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

require("dotenv").config();

const app = express();

const port = process.env.NODE_PORT || 3000;

export function start() {
  return app
    .use(cors())
    .use(helmet())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use("/questions", routes.questions)
    .use("/answers", routes.answers)
    .use("/users", routes.users)
    .use(errorHandler)
    .use((_req, res) =>
      res.status(404).json({ success: false, error: "Route Not Found" })
    )
    .listen(port, () => {
      console.log(`Server ready on port ${port}`);
    });
}
