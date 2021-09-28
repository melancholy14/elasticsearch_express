// import * as model from '../models';

// export async function getQuotes(req, res) {
//     const query = req.query;

//     if(!query.text) {
//         res.status(422).json({
//             success: false,
//             error: 'Missing required parameter: text',
//         });

//         return;
//     }

//     try {
//         const result = await model.getQuotes(query);
//         res.status(200).json({
//             success: true,
//             data: result,
//         });
//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             success: false,
//             error: 'Internal Error',
//         });
//     }
// }

// export async function addQuote(req, res) {
//     const body = req.body;

//     if (!body.quote || !body.author) {
//         res.status(422).json({
//             success: false,
//             error: 'Missing required parameter(s): quote or author',
//         });

//         return;
//     }

//     try {
//         const result = await model.insertNewQuote(body.quote, body.author);

//         res.status(200).json({
//             success: true,
//             data: {
//                 id: result.body._id,
//                 author: body.author,
//                 quote: body.quote,
//             },
//         });
//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             success: false,
//             error: 'Internal Error',
//         });
//     }
// }

import * as questions from './questions';
import * as answers from './answers';
import * as users from './users';

export {
    questions,
    answers,
    users,
}
