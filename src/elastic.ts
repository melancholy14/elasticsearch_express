import { Client } from "@elastic/elasticsearch";

require("dotenv").config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
export const esclient = new Client({ node: elasticUrl });

export const questionIndex = "questions";
export const answerIndex = "answers";
export const userIndex = "users";

export const questionType = "question";
export const answerType = "answer";
export const userType = "user";

export async function createIndex(index: string) {
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
        type: "text",
      },
      answer: {
        type: "text",
      },
      options: {
        type: "text",
      },
    };

    await esclient.indices.putMapping({
      index: questionIndex,
      type: questionType,
      include_type_name: true,
      body: {
        properties: schema,
      },
    });

    console.log("Questions mapping created successfully");
  } catch (error) {
    console.error("An error occurred while setting the questions mapping:");
    console.error(error);
  }
}

export async function setUserMapping() {
  try {
    const schema = {
      email: {
        type: "text",
      },
      password: {
        type: "text",
      },
    };

    await esclient.indices.putMapping({
      index: userIndex,
      type: userType,
      include_type_name: true,
      body: {
        properties: schema,
      },
    });

    console.log("Users mapping created successfully");
  } catch (error) {
    console.error("An error occurred while setting the users mapping:");
    console.error(error);
  }
}

export async function setAnswerMapping() {
  try {
    const schema = {
      user_id: {
        type: "text",
      },
      question_id: {
        type: "text",
      },
      answer: {
        type: "text",
      },
      correct: {
        type: "boolean",
      },
    };

    await esclient.indices.putMapping({
      index: answerIndex,
      type: answerType,
      include_type_name: true,
      body: {
        properties: schema,
      },
    });

    console.log("Answers mapping created successfully");
  } catch (error) {
    console.error("An error occurred while setting the answers mapping:");
    console.error(error);
  }
}

export function checkConnection() {
  return new Promise((resolve, _reject) => {
    console.log("Checking connection to ElasticSearch...");

    const interval = setInterval(() => {
      esclient.cluster.health({}).then(() => {
        console.log("Successfully connected to ElasticSearch");

        clearInterval(interval);
      });
    }, 1000);

    resolve(true);
  });
}
