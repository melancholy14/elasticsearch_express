import { Client } from '@elastic/elasticsearch';

require('dotenv').config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
export const esclient = new Client({ node: elasticUrl });

export const index = "quotes";
export const type = "quotes";

export async function createIndex(index: string){
    try {
        await esclient.indices.create({ index });
        console.log(`Created Index ${index}`);
    } catch (error) {
        console.error(`An error occurred while creating the index ${index}:`);
        console.error(error);
    }
}

export async function setQuotesMapping() {
    try {
        const schema = {
            quote: {
                type: 'text'
            },
            author: {
                type: 'text'
            }
        };

        await esclient.indices.putMapping({
            index,
            type,
            include_type_name: true,
            body: {
                properties: schema,
            }
        });

        console.log('Quotes mapping created successfully');
    } catch (error) {
        console.error('An error occurred while setting the quotes mapping:');
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
