import * as model from "../models/answer";

export async function getAnswerListByUser(user_id: string) {
  try {
    if (!user_id) {
      throw new Error("No parameters(s): user_id");
    }

    const data = await model.getAnswers({
      field: "user_id",
      value: user_id,
    });

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getAnswerListByQuestion(question_id: string) {
  try {
    if (!question_id) {
      throw new Error("No parameters(s): user_id");
    }

    const data = await model.getAnswers({
      field: "question_id",
      value: question_id,
    });

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function addAnswer(params: {
    question_id: string;
    user_id: string;
    answer: string;
}) {
  try {
    if (!params) {
      throw new Error("No parameters(s): params");
    }

    const { question_id, user_id, answer } = params;

    const result = await model.insertNewAnswer({
      question_id,
      user_id,
      answer,
    });

    return result.body._id;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
