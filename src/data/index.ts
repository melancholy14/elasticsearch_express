import * as elastic from '../elastic';

import users from './users.json';
import questions from './questions.json';
import answers from './answers.json';

const esQuestionAction = {
    index: {
        _index: elastic.index,
        _type: elastic.question_type,
    },
};

const esUserAction = {
    index: {
        _index: elastic.index,
        _type: elastic.user_type,
    },
};

const esAnswerAction = {
    index: {
        _index: elastic.index,
        _type: elastic.answer_type,
    },
};

export async function populateDatabase() {
    const docs = [];

    for (const user of users) {
        docs.push(esUserAction);
        docs.push(user);
    }

    for (const question of questions) {
        docs.push(esQuestionAction);
        docs.push(question);
    }

    for (const answer of answers) {
        docs.push(esAnswerAction);
        docs.push(answer);
    }

    return elastic.esclient.bulk({ body: docs });
}
