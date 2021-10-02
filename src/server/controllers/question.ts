import { Request, Response } from 'express';

import * as service from "../services/question";

export async function getQuestions(req: Request, res: Response) {
  const query = req.query;

  try {
    const data = await service.getQuestionList(query);

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

export async function getQuestion(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const data = await service.getQuestionById(id);

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

export async function addQuestion(req: Request, res: Response) {
  const { question, answer, options } = req.body || {};

  if (!question || !answer || !options) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter(s): question, answer, or options",
    });

    return;
  }

  try {
    const id = await service.insertQuestionById({
      question,
      answer,
      options,
    });

    res.status(200).json({
      success: true,
      data: {
        id,
        question,
        answer,
        options,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Internal Error",
    });
  }
}

export async function getQuestion4Taking(req: Request, res: Response) {
  try {
    const authorization = req.headers.authorization || '';

    if (!authorization) {
      res.status(401).json({
        success: false,
        error: "No required headers: Authorization",
      });

      return;
    }

    const userId = authorization.replace('Basic ', '');

    const data = await service.getRandomQuestionByUserId(userId);

    res.status(200).json({
      success: true,
      data,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Internal Error",
    });
  }
}