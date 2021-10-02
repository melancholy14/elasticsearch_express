import { Request, Response } from "express";

import * as service from "../services/answer";

export async function getAnswersByUser(req: Request, res: Response) {
  const user_id = req.params.user_id;

  if (!user_id) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter: user_id",
    });

    return;
  }

  try {
    const data = await service.getAnswerListByUser(user_id);

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

export async function getAnswersByQuestion(req: Request, res: Response) {
  const question_id = req.params.question_id;

  if (!question_id) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter: question_id",
    });

    return;
  }

  try {
    const data = await service.getAnswerListByQuestion(question_id);

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

export async function addAnswer(req: Request, res: Response) {
  const { question_id, user_id, answer } = req.body || {};

  if (!question_id || !user_id || !answer) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter(s): question_id, user_id, or answer",
    });
    return;
  }

  try {
    const id = await service.addAnswer({ question_id, user_id, answer });

    res.status(200).json({
      success: true,
      data: id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Internal Error",
    });
  }
}
