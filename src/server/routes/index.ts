import express from 'express';
import * as controller from '../controllers';

const routes = express.Router();

routes.route('/').get(controller.getQuotes);
routes.route('/new').post(controller.addQuote);

module.exports = routes;