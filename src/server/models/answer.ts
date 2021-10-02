import {
  esclient,
  answerIndex as index,
  answerType as type,
} from "../../elastic";

export async function getAnswers(params: {
  field: string;
  value: string;
}) {
  const query = {
    query: {
      match: {
        [params.field]: {
          query: params.value,
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
    answer: hit._source.answer,
    correct: hit._source.correct,
  }));

  return {
    results,
    values,
  };
}

export async function insertNewAnswer(data: any) {
  return esclient.index({
    index,
    type,
    body: data,
  });
}
