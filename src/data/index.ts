import * as elastic from '../elastic';

import users from './users.json';
import questions from './questions.json';
import answers from './answers.json';

const esQuestionAction = {
    index: {
        _index: elastic.question_index,
        _type: elastic.question_type,
    },
};

const esUserAction = {
    index: {
        _index: elastic.user_index,
        _type: elastic.user_type,
    },
};

const esAnswerAction = {
    index: {
        _index: elastic.answer_index,
        _type: elastic.answer_type,
    },
};

export async function populateUserDatabase() {
    const docs = [];

    for (const user of users) {
        docs.push(esUserAction);
        docs.push(user);
    }
    
    return elastic.esclient.bulk({ body: docs });
}

export async function populateQuestionDatabase() {
    const docs = [];

    for (const question of questions) {
        docs.push(esQuestionAction);
        docs.push(question);
    }

    return elastic.esclient.bulk({ body: docs });
}

export async function populateAnswerDatabase() {
    const docs = [];

    for (const answer of answers) {
        console.log('answer', answer);
        
        docs.push(esAnswerAction);
        docs.push(answer);
    }

    return elastic.esclient.bulk({ body: docs });
}

