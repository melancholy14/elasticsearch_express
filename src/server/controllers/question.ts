import * as model from "../models/question";

export async function getQuestions(req, res) {
  const query = req.query;

  try {
    const data = await model.getQuestions(query);
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

export async function getQuestion(req, res) {
  const id = req.params.id;

  try {
    const data = await model.getQuestion(id);
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

export async function addQuestion(req, res) {
  const { question, answer, options } = req.body || {};

  if (!question || !answer || !options) {
    res.status(422).json({
      success: false,
      error: "Missing required parameter(s): question, answer, or options",
    });

    return;
  }

  try {
    const result = await model.insertNewQuestion({ question, answer, options });

    res.status(200).json({
      success: true,
      data: {
        id: result.body._id,
        question,
        answer,
        options,
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
