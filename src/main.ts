import * as elastic from "./elastic";
import * as data from "./data";

import * as server from "./server";

require("dotenv").config();

(async function main() {
  const isElasticReady = await elastic.checkConnection();

  if (isElasticReady) {
    const elasticUserIndex = await elastic.esclient.indices.exists({
      index: elastic.userIndex,
    });

    if (!elasticUserIndex.body) {
      await elastic.createIndex(elastic.userIndex);
      await elastic.setUserMapping();

      await data.populateUserDatabase();
    }

    const elasticQuestionIndex = await elastic.esclient.indices.exists({
      index: elastic.questionIndex,
    });

    if (!elasticQuestionIndex.body) {
      await elastic.createIndex(elastic.questionIndex);
      await elastic.setQuestionMapping();

      await data.populateQuestionDatabase();
    }

    const elasticAnswerIndex = await elastic.esclient.indices.exists({
      index: elastic.answerIndex,
    });

    if (!elasticAnswerIndex.body) {
      await elastic.createIndex(elastic.answerIndex);
      await elastic.setAnswerMapping();

      await data.populateAnswerDatabase();
    }

    server.start();
  }
})();
