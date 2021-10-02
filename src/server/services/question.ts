import * as model from "../models/question";

export async function getQuestionList(params: any) {
  try {
    if (!params) {
      throw new Error("No parameters(s)");
    }

    const data = await model.getQuestions({
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
    
        const data = await model.getQuestion(id);
    
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

        const result = await model.insertNewQuestion(data);
    
        return result.body._id;
      } catch (error) {
        console.error(error);
    
        throw error;
      }
}