import {
  esclient,
  questionIndex as index,
  questionType as type,
} from "../../elastic";

export async function allQuestions() {
  const { body: { hits = {} } = {} } = await esclient.search({
    index,
    type,
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => ({
    id: hit._id,
    question: hit._source.question,
    options: hit._source.options,
    answer: hit._source.answer,
  }));

  return {
    results,
    values,
  };
}

export async function getExcludedQuestions(question_ids: string[]) {
  const query = {
    query: {
      bool: {
        must_not: [
          {
            ids: {
              values: question_ids,
            },
          },
        ],
      },
    }
  };

  const { body: { hits = {} } = {} } = await esclient.search({
    index,
    type,
    body: query,
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => ({
    id: hit._id,
    question: hit._source.question,
    options: hit._source.options,
    answer: hit._source.answer,
  }));

  return {
    results,
    values,
  };
}

export async function getQuestions(params: any) {
  const { body: { hits = {} } = {} } = await esclient.search({
    from: params.page || 0,
    size: params.limit || 100,
    index,
    type,
    body: params.query || {},
  });

  const results = hits.total.value;

  const values = hits.hits.map((hit) => ({
    id: hit._id,
    question: hit._source.question,
    options: hit._source.options,
    answer: hit._source.answer,
  }));

  return {
    results,
    values,
  };
}

export async function getQuestion(id: string) {
  const query = {
    query: {
      match: {
        _id: {
          query: id,
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
    question: hit._source.question,
    options: hit._source.options,
    answer: hit._source.answer,
  }));

  return {
    results,
    values,
  };
}

export async function insertNewQuestion(data: {
  question: string;
  answer: string;
  options: string[];
}) {
  return esclient.index({
    index,
    type,
    body: data,
  });
}
