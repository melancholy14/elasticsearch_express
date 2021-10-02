import * as model from "../models/answer";

export async function getAnswersByUser(req, res) {
  const user_id = req.params.user_id;

  if (!user_id) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter: user_id",
    });

    return;
  }

  try {
    const data = await model.getAnswers({
      field: "user_id",
      value: user_id,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
}

export async function getAnswersByQuestion(req, res) {
  const question_id = req.params.question_id;

  if (!question_id) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter: question_id",
    });

    return;
  }

  try {
    const data = await model.getAnswers({
      field: "question_id",
      value: question_id,
    });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
}

export async function addAnswer(req, res) {
  const { question_id, user_id, answer } = req.body || {};

  if (!question_id || !user_id || !answer) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter(s): question_id, user_id, or answer",
    });
    return;
  }

  try {
    const result = await model.insertNewAnswer({
      question_id,
      user_id,
      answer,
    });

    res.status(200).json({
      success: true,
      data: {
        id: result.body._id,
        user_id,
        question_id,
        answer,
        correct: result.body.correct,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Internal Error",
    });
  }
}
