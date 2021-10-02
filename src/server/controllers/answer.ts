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

export async function submitAnswer(req: Request, res: Response) {
  const authorization = req.headers.authorization || '';

    if (!authorization) {
      res.status(401).json({
        success: false,
        error: "No required headers: Authorization",
      });

      return;
    }

    const user_id = authorization.replace('Basic ', '');

  const { question_id, answer } = req.body || {};

  if (!question_id || !answer) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter(s): question_id, or answer",
    });
    return;
  }

  try {
    const data = await service.submitAnswer({ question_id, user_id, answer });

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