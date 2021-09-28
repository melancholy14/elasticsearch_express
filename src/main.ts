import * as elastic from './elastic';
import * as data from './data';

import * as server from './server';

require('dotenv').config();

(async function main() {
    const isElasticReady = await elastic.checkConnection();

    if (isElasticReady) {
        const elasticIndex = await elastic.esclient.indices.exists({ index: elastic.index });

        if (!elasticIndex.body) {
            await elastic.createIndex(elastic.index);
            await elastic.setUserMapping();
            await elastic.setQuestionMapping();
            await elastic.setAnswerMapping();

            await data.populateDatabase();
        }

        server.start();
    }
})();