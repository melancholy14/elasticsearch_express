const model = require('../models');

async function getQuotes(req, res) {
    const query = req.query;

    if(!query.text) {
        res.status(422).json({
            success: false,
            error: 'Missing required parameter: text',
        });

        return;
    }

    try {
        const result = model.getQuotes(query);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: 'Internal Error',
        });
    }
}

async function addQuote(req, res) {
    const body = req.body;

    if (!body.quote || !body.author) {
        res.status(422).json({
            success: false,
            error: 'Missing required parameter(s): quote or author',
        });

        return;
    }

    try {
        const result = model.addNewQuote(body.quote, body.author);

        console.log('------ addNewQuote: result', result, 'result.body', result.body);

        res.status(200).json({
            success: true,
            data: {
                id: result.body._id,
                author: body.author,
                quote: body.quote,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: 'Internal Error',
        });
    }
}

module.exports = {
    getQuotes,
    addQuote,
}
