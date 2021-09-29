import * as elastic from './elastic';
import * as data from './data';

import * as server from './server';

require('dotenv').config();

(async function main() {
    const isElasticReady = await elastic.checkConnection();

    if (isElasticReady) {

        const elasticUserIndex = await elastic.esclient.indices.exists({ index: elastic.user_index });

        if (!elasticUserIndex.body) {
            await elastic.createIndex(elastic.user_index);
            await elastic.setUserMapping();

            await data.populateUserDatabase();
        }

        const elasticQuestionIndex = await elastic.esclient.indices.exists({ index: elastic.question_index });

        if (!elasticQuestionIndex.body) {
            await elastic.createIndex(elastic.question_index);
            await elastic.setQuestionMapping();

            await data.populateQuestionDatabase();
        }

        const elasticAnswerIndex = await elastic.esclient.indices.exists({ index: elastic.answer_index });

        if (!elasticAnswerIndex.body) {
            await elastic.createIndex(elastic.answer_index);
            await elastic.setAnswerMapping();

            await data.populateAnswerDatabase();
        }

        server.start();
    }
})();