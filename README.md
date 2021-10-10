# elasticsearch_express

### Contexts
1. Goal
2. Features & To do
3. Tech Stack
4. Architecture
5. Data Model
6. How to install
7. How to run on locally
8. Reference

## Goal
This repo is aiming to show how to build the backend service using elasticsearch and express, which offers CRUD for a list of single questions.

## Features & To do
- [x] User can log in: [PR#5](https://github.com/melancholy14/elasticsearch_express/pull/5)
- [x] User can take questions: [PR#6](https://github.com/melancholy14/elasticsearch_express/pull/6)
- [x] User can review the answer is correct after it's submitted: [PR#7](https://github.com/melancholy14/elasticsearch_express/pull/7)
- [ ] Authentication using JWT middleware
- [ ] User can sign up
- [ ] User can see all questions and answers that s/he resolved
- [ ] Admin can add/edit/delete a question

## Tech Stack
1. [Docker](https://docs.docker.com/get-started/overview/): This software platform enables developers to deliver their applications quickly and consistently. For this time, it lets me build and deploy the nodejs application as well as Elasticsearch.
2. [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html): ElasticSearch is one of the most popular search engines, written in Java. It has a reputation for offering real-time search, [multitenancy](https://en.wikipedia.org/wiki/Multitenancy) and et cetera. It behaves like a database for this project which provides CRUD of simple questions. 
3. [ExpressJS](https://expressjs.com/): This has been famous as a top nodejs web application framework for a long time.  It aims minimalism so that developers are able to be flexible to build whatever they want easily.
4. [AWS](https://aws.amazon.com/): One of the most famous cloud service providers. I can be supported to use this provider by my working place so I chose it.
5. [Typescript](https://www.typescriptlang.org/): It's a strongly typed programming language on javascript, developed by Microsoft. Therefore, developers can catch compile errors such as undefined errors by compiling source files. 
6. [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/): These two useful libraries assist developers to have consistent code styles/format.
7. Github Actions: TBD

## Architecture

### User Case
This application would be in charge of the server part in the below case:
![usercase](https://www.websequencediagrams.com/cgi-bin/cdraw?lz=dGl0bGUgVXNlciBjYXNlCgphY3RvcgAMBQpVc2VyLT5DbGllbnQ6IExvZ2luCgAIBi0-U2VydmVyAA8HIFJlcXVlc3QKbm90ZSByaWdodCBvZiAAHAhjaGVjayBpZiB0aGUgdQBlBm4gbG9nIGluCgBDBgBYDyBSZXNwb25zZQpsb29wIHRha2luZyAAXwVpb25zCiAgICAAehBRABcHAIEECSAgICAAexZmaW5kIGEARwkgZnJvbSBlbGFzdGljc2VhcmNoIHJhbWRvbmx5AGYFAIEUEABgCwCBIAcAgQUMVXNlcjogU2hvdwCBbAUAXQlkYXRhAIE1BQCCSg5TZWxlY3QgYW4gYW5zd2VyIGFuZCBzdWJtaQCBPQYAgmIQQQAgBgCBRCIAgmoNAEsGdGVkAF4IaXMgY29ycmVjdCBvciBub3QAcgZhdmUAgSQFIGluAIIEDgCBdBUAgQMJAIFpHmlmIGl0JwBhEACDQQVhbHQAhA0Gd2FudHMgdG8gdGFrZSBhbm90aGVyAINqCQCDbQUAgioSQ2xpY2sgTmV4AINoBmVsAIMEBwASGERvbgCDJgZlbmQKZW5kCgo&s=qsd)

### APIs

1. To log in
```
  POST /user/login
  Content-type: application/json
  Authorization: Basic tester@data-bank.ai:Password
  {}
```

2. To retrieve a question
```
  GET /question/take
  Authorization: Basic user_id
```

3. To submit answer
```
 POST /answer
 Content-type: application/json
 Authorization: Basic user_id
 {
   "question_id": "unique",
   "answer": "a"
 }
```

## Data Model
There are three data models.

1. Question: this has a question, an answer, and options.
```
  Question: {
    question: text,   // the context for the question
    answer: text,     // the answer of the question
    options: text[],  // the options of the question
  }
```

2. User: this has an email and a password.
```
  User: {
    email: text,    // the email of the user account
    password: text, // the password of the user account. This should be encrypted
  }
```

3. Answer: this has a question_id, a user_id, an answer, and a boolean value that represents if the answer is correct or not.
```
  Answer: {
    question_id: text,  // the id of the question that a user answered
    user_id: text,      // the id of the user who answer the question
    answer: text,       // the answer that the user made
    correct: boolean,   // if the answer is correct or not
  }
```

## How to install
This can be updatd if [`Terraform`](https://www.terraform.io/) or any other CI tools are used
1. Set up EC2 & Access to it using Terminal
2. Download Git, Docker & Docker-compose
    - Git: https://gamoo12.tistory.com/205
    - Docker: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html
    - Docker-compose: https://docs.docker.com/compose/install/

### Trouble-shouting
Q. ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?: https://stackoverflow.com/questions/34532696/docker-compose-cant-connect-to-docker-daemon

    A. Start docker service and give a permission

Q. WARNING: no logs are available with the 'none' log driver: https://stackoverflow.com/questions/45182256/warning-no-logs-are-available-with-the-none-log-driver

    A. Remove `driver:none`

Q. OpenJDK 64-Bit Server VM warning: Option UseConcMarkSweepGC was deprecated in version 9.0 and will likely be removed in a future release: https://github.com/elastic/elasticsearch/issues/43911

    A. JVM Memory should be adjusted depending on the memory of the EC2 instance

Q.exited with code 254: https://stackoverflow.com/questions/49656445/npm-i-running-command-failed-exit-code-254

    A. Check logs & make sure all paths of files copied are correct

## How to run on locally
This step is assuming you already installed docker on your machine. If not, please check [this link](https://docs.docker.com/desktop/).
If you did or finished installing it, you can type the below command on the root location of this repo.
> elasticsearch_express > docker-compose up

## Reference
- To setup basic installation: https://towardsdatascience.com/full-text-search-with-node-js-and-elasticsearch-on-docker-edcea23612fd
- To add Typescript: https://blog.logrocket.com/typescript-with-node-js-and-express/
- To add ESLint & Prettier: https://www.jeansnyman.com/node/express/node-express-with-typescript/
