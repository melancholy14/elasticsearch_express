import * as answerModel from "../models/answer";
import * as questionModel from "../models/question";

export async function getAnswerListByUser(user_id: string) {
  try {
    if (!user_id) {
      throw new Error("No parameters(s): user_id");
    }

    const data = await answerModel.getAnswers({
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

    const data = await answerModel.getAnswers({
      field: "question_id",
      value: question_id,
    });

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function submitAnswer(params) {
  try {
    const { question_id, user_id, answer } = params;

    // Get Question using question_id
    const questionData = await questionModel.getQuestion(question_id);

    const question = questionData.values[0];

    if (!question) {
      throw new Error("Question doesn't exist");
    }

    // Check submitted answer is correct or not
    const correct = answer === question.answer;

    const result = await answerModel.insertNewAnswer({
      question_id,
      user_id,
      answer,
      correct,
    });

    return {
      id: result.body._id,
      correct,
    };
  } catch (error) {
    console.error(error);

    throw error;
  }
}