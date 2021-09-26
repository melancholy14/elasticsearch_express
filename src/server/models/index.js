const { esclient, index, type } = require('../../elastic');

async function getQuotes(req) {
    const query = {
        query: {
            match: {
                quote: {
                    query: req.text,
                    operator: 'and',
                    fuzziness: 'auto',
                },
            },
        }
    };

    const { body: { hits } = {} } = await esclient.search({
        from: req.page || 0,
        size: req.limit || 100,
        index,
        type,
        body: query,
    });

    const results = hits.total.value;

    const values = hits.hits.map((hit) => {
        return {
            id: hit._id,
            quote: hit._source.quote,
            author: hit._source.author,
            score: hit._score,
        };
    });

    return {
        results,
        values,
    };
}

async function addNewQuote(quote, author) {
    console.log('------ addNewQuote: quote', quote, 'author', author);

    return esclient.index({
        index,
        type,
        body: {
            quote,
            author,
        },
    });
}

module.exports = {
    getQuotes,
    addNewQuote,
};
