import { Request, Response } from "express";

import * as service from "../services/user";

export async function getUsers(req: Request, res: Response) {
  const query = req.query;

  try {
    const data = await service.getUserList({
      query,
      page: req.query.page,
      limit: req.query.limit,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Internal Error",
    });
  }
}

export async function getUser(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const data = await service.getUserById(id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message || "Internal Error",
    });
  }
}

export async function login(req: Request, res: Response) {
  const authorization = req.headers.authorization || "";

  try {
    const userString = authorization.replace("Basic ", "");

    if (!userString) {
      res.status(422).json({
        success: false,
        error: "Missing parameter(s): email or password",
      });

      return;
    }

    const data = await service.getUserByEmail(userString);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message || "Internal Error",
    });
  }
}
