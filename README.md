# elasticsearch_express

### Contexts
1. Goal
2. Tech Stack
3. Architecture
4. Data Model
5. Functions
6. How to install
7. How to run
8. To do
9. Reference

## Goal
This repo is aiming to show how to build the backend service using elasticsearch and express, which offers CRUD for a list of single questions.

## Tech Stack
1. [Docker](https://docs.docker.com/get-started/overview/): This software platform enables developers to deliver their applications quickly and consistently. For this time, it lets me build and deploy the nodejs application as well as Elasticsearch.
2. [ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html): ElasticSearch is one of the most popular search engines, written in Java. It has a reputation for offering real-time search, [multitenancy](https://en.wikipedia.org/wiki/Multitenancy) and et cetera. It behaves like a database for this project which provides CRUD of simple questions. 
3. [ExpressJS](https://expressjs.com/): This has been famous as a top nodejs web application framework for a long time.  It aims minimalism so that developers are able to be flexible to build whatever they want easily.
4. Google Cloud
5. [Typescript](https://www.typescriptlang.org/): It's a strongly typed programming language on javascript, developed by Microsoft. Therefore, developers can catch compile errors such as undefined errors by compiling source files. 
6. ESLint & Prettier
7. Github Actions

## Architecture

## Data Model

## Functions

## How to install

## How to run on locally
This step is assuming you already installed docker on your machine. If not, please check [this link](https://docs.docker.com/desktop/).
If you did or finished installing it, you can type the below command on the root location of this repo.
> elasticsearch_express % docker-compose up

## To do

## Reference
- To setup basic installation: https://towardsdatascience.com/full-text-search-with-node-js-and-elasticsearch-on-docker-edcea23612fd
- To add Typescript: https://blog.logrocket.com/typescript-with-node-js-and-express/