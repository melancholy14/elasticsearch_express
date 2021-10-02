import {
  esclient,
  answerIndex as index,
  answerType as type,
} from "../../elastic";

export async function getAnswers(req) {
  const query = {
    query: {
      match: {
        [req.field]: {
          query: req.value,
        },
      },
    },
  };

  const { body: { hits = {} } = {} } = await esclient.search({
    from: req.page || 0,
    size: req.limit || 100,
    index,
    type,
    body: query,
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => ({
    id: hit._id,
    question_id: hit._source.question_id,
    answer: hit._source.answer,
    correct: hit._source.correct,
  }));

  return {
    results,
    values,
  };
}

export async function getAllQuestionIdAnsweredByUser(userId: string) {
  const query = {
    query: {
      match: {
        user_id: {
          query: userId,
          operator: "and",
          fuzziness: "auto",
        },
      },
    },
  };

  const { body: { hits = {} } = {} } = await esclient.search({
    index,
    type,
    body: query,
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => ({
    id: hit._id,
    question_id: hit._source.question_id,
  }));

  return {
    results,
    values,
  };
}

export async function insertNewAnswer(data) {
  return esclient.index({
    index,
    type,
    body: data,
  });
}
