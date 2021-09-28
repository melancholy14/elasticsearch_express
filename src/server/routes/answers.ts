import express from 'express';
import * as controller from '../controllers/answers';

const routes = express.Router();

routes.route('/').post(controller.addAnswer);

routes.route('/user/:user_id').get(controller.getAnswersByUser);

routes.route('/question/:question_id').get(controller.getAnswersByQuestion);

export default routes;