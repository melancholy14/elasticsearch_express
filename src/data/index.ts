import { Base64 } from "js-base64";

import * as elastic from "../elastic";

import users from "./users.json";
import questions from "./questions.json";
import answers from "./answers.json";

const esQuestionAction = {
  index: {
    _index: elastic.questionIndex,
    _type: elastic.questionType,
  },
};

const esUserAction = {
  index: {
    _index: elastic.userIndex,
    _type: elastic.userType,
  },
};

const esAnswerAction = {
  index: {
    _index: elastic.answerIndex,
    _type: elastic.answerType,
  },
};

export async function populateUserDatabase() {
  const docs = [];

  for (const user of users) {
    docs.push(esUserAction);

    const newUser = {
      ...user,
      password: Base64.encode(user.password),
    };

    docs.push(newUser);
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
    console.log("answer", answer);

    docs.push(esAnswerAction);
    docs.push(answer);
  }

  return elastic.esclient.bulk({ body: docs });
}
