import * as questionModel from "../models/question";
import * as answerModel from "../models/answer";

export async function getQuestionList(params: any) {
  try {
    if (!params) {
      throw new Error("No parameters(s)");
    }

    const data = await questionModel.getQuestions({
      query: params.query || {},
      page: params.page || 0,
      limit: params.limit || 100,
    });

    return data;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export async function getQuestionById(id: string) {
    try {
        if (!id) {
          throw new Error("No parameters(s): id");
        }
    
        const data = await questionModel.getQuestion(id);
    
        return data;
      } catch (error) {
        console.error(error);
    
        throw error;
      }
}

export async function insertQuestionById(data: {
    question: string;
    answer: string;
    options: string[];
}) {
    try {
        if (!data) {
          throw new Error("No parameters(s): data");
        }

        const result = await questionModel.insertNewQuestion(data);
    
        return result.body._id;
      } catch (error) {
        console.error(error);
    
        throw error;
      }
}

export async function getRandomQuestionByUserId(userId: string) {
  try {
    if (!userId) {
      throw new Error("Missing parameter: user_id");
    }

    // Get all questions answered by this user
    const answeredQuestions = await answerModel.getAllQuestionIdAnsweredByUser(userId);

    const answeredQuestionIds = [...new Set(answeredQuestions.values.map(ele => ele.question_id))];

    // Get all questions
    const questionData = await questionModel.allQuestions();
    const allQuestions = questionData.values;

    // Filter questions if it's answered
    const unAnswered = allQuestions.filter((question) => answeredQuestionIds.findIndex(question.id) < 0);

    if (unAnswered.length <= 0) {
      throw new Error("All questions have been answered by this user");
    }

    // Get the index randomly
    const randomIndex = Math.floor(Math.random() * unAnswered.length);

    const selectedQuestion = unAnswered[randomIndex];

    delete selectedQuestion.answer;

    return selectedQuestion;
  } catch (error) {
    console.error(error);

    throw error;
  }
}