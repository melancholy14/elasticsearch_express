import { esclient, index, question_type } from '../../elastic';

export async function getQuestions(req) {
    const query = {};

    const { body: { hits = {} } = {} } = await esclient.search({
        from: req.page || 0,
        size: req.limit || 100,
        index,
        type: question_type,
        body: query,
    });

    const results = hits.total.value;

    const values = hits.hits.map(hit => ({
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
                id: {
                    query: id,
                }
            }
        }
    };

    const { body: { hits = {} } = {} } = await esclient.search({
        index,
        type: question_type,
        body: query,
    });

    const results = hits.total.value;

    const values = hits.hits.map(hit => ({
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

export async function insertNewQuestion(data) {
    return esclient.index({
        index,
        type: question_type,
        body: data,
    });
}
