import * as elastic from '../elastic';
import quotes from './quotes.json';

const esAction = {
    index: {
        _index: elastic.index,
        _type: elastic.type,
    },
};

export async function populateDatabase() {
    const docs = [];
    for (const quote of quotes) {
        docs.push(esAction);
        docs.push(quote);
    }

    return elastic.esclient.bulk({ body: docs });
}
