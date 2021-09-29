import { Client } from '@elastic/elasticsearch';

require('dotenv').config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
export const esclient = new Client({ node: elasticUrl });

export const question_index = "questions";
export const answer_index = "answers";
export const user_index = "users";

export const question_type = "question";
export const answer_type = "answer";
export const user_type = "user";

export async function createIndex(index: string){
    try {
        await esclient.indices.create({ index });
        console.log(`Created Index ${index}`);
    } catch (error) {
        console.error(`An error occurred while creating the index ${index}:`);
        console.error(error);
    }
}

export async function setQuestionMapping() {
    try {
        const schema = {
            question: {
                type: 'text'
            },
            answer: {
                type: 'text'
            },
            options: {
                type: 'text'
            }
        };

        await esclient.indices.putMapping({
            index: question_index,
            type: question_type,
            include_type_name: true,
            body: {
                properties: schema,
            }
        });

        console.log('Questions mapping created successfully');
    } catch (error) {
        console.error('An error occurred while setting the questions mapping:');
        console.error(error);
    }
}

export async function setUserMapping() {
    try {
        const schema = {
            email: {
                type: 'text'
            },
            password: {
                type: 'text'
            }
        };

        await esclient.indices.putMapping({
            index: user_index,
            type: user_type,
            include_type_name: true,
            body: {
                properties: schema,
            }
        });

        console.log('Users mapping created successfully');
    } catch (error) {
        console.error('An error occurred while setting the users mapping:');
        console.error(error);
    }
}

export async function setAnswerMapping() {
    try {
        const schema = {
            user_id: {
                type: 'text'
            },
            question_id: {
                type: 'text'
            },
            answer: {
                type: 'text'
            },
            correct: {
                type: 'boolean'
            }
        };

        await esclient.indices.putMapping({
            index: answer_index,
            type: answer_type,
            include_type_name: true,
            body: {
                properties: schema,
            }
        });

        console.log('Answers mapping created successfully');
    } catch (error) {
        console.error('An error occurred while setting the answers mapping:');
        console.error(error);
    }
}

export function checkConnection(){
    return new Promise(async (resolve) => {
        console.log('Checking connection to ElasticSearch...');

        let isConnected = false;

        while (!isConnected) {
            try {
                await esclient.cluster.health({});
                console.log('Successfully connected to ElasticSearch');

                isConnected = true;
            } catch (_) {
                
            }
        }

        resolve(true);
    });
}
