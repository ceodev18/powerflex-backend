# PowerFlex Backend Challenge

## Description
RESTful api that services requests for sprocket factory data and sprockets

## Prerequisites
- Node.js
- Yarn
- Docker

## Installation
1. Clone the repository.
2. Install dependencies using `yarn install`.
3. Execute `cp .env.example .env` and uncomment the db setup needed (docker or local)
4. Database is deployed but docker-compose but also i'm attaching credentials for external cloud database for testing purpose.


## Usage
- To run the application locally, use `yarn start:dev`.
- To execute test , use `yarn test`.
- To run seeds , use `yarn seed`.
- For production deployment, use Docker. See instructions below.

## Docker Deployment
To deploy the application using Docker Compose, follow these steps:
- execute `docker-compose up -d --build`

## About the project
I choose this relationship

![Alt text](Diagram.jpeg)

UI for testing endpoints can be found at http://localhost:3000/api/v1/doc

![Alt text](swagger.png)





