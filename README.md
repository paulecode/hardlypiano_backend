# Hardly Piano

Hardly Piano is an app designed to help musicians keep track of their practice sessions and repertoire. It currently comprises of an iOS app built with SwiftUI, a server built with Node+Express, and a MongoDB database hosted on MongoDB Atlas.

[Link to live server (use with Postman)](http://ec2-3-66-192-132.eu-central-1.compute.amazonaws.com:3000)

[Link to Swift app repo](https://github.com/paulecode/HardlyPianoSwift)

---

## Project architecture

![architecture](./docs/img/Architecture.png)

---

## Getting stared

#### Downloading the server

Create a folder for this project

`mkdir hardlypiano`

CD into it

`cd hardlypiano`

Git Clone

`git clone https://github.com/paulecode/hardlypiano_backend.git .`

Install dependancies

`npm install`

Before starting the servers, you need to provide some environment secrets.

Please create a .env file by running

`touch .env`

Your .env file needs to have the following properties to run:

-   MONGODB_URI
-   TOKEN_SECRET

Feel free to supply your own MongoDB URL if you have one. The Token Secret is just a random string used for hashing. Otherwise, we prepared a test database, you will just need to copy and paste it.

```
MONGODB_URI="mongodb+srv://codeuni:unfortunatelycleartext@cluster0.z5lpzob.mongodb.net/?retryWrites=true&w=majority"
TOKEN_SECRET="64e49888ea55824fe86c1030daf7bfe1ccafba546522ab237ea5480305ec93a26d1c494042e72ff5c4c0f2942762438fd4ec305081782baeda9f0ce160d0ecc6"
```

#### Run scripts

##### Running a development server

```bash
# starts a server, connects to staging database and watches for file changes
npm run dev
```

##### Running a production server

```bash
# starts a production server and connects to the production database
npm run prod
```

##### Running tests

```bash
# test all files ending in '.test.js', using Jest
npm run test

# test specific files or directories
npm run test -- [filename | directory]
```

---

## Node + Express Backend

The backend comprises of a very common Node.js + Express.js + MongoDB tech stack, which serves data to an iOS app (with a Vue.js front-end planned for the future).

The architecture is currently **monolithic**. The amount of features, the expected traffic, and the current development team is quite small, so there is currently no need for significant scaling or maintainability measures like SOA or microservice architecture.

**SE_22 Web Backend Technologies**  
For a detailed look into the Node server and REST API, please visit the [Backend documentation](./docs/Backend.md).

---

## Database

![Database diagram](./docs/img/Database_Diagram.png)

**SE_06 NoSQL Databases**  
For a detailed look into the MongoDB database, please visit the [Database documentation](./docs/Database.md)

---

## Deployment

![CI/CD Diagram](./docs/img/CI_CD_Diagram.png)

**SE_23 CI/CD**  
For a detailed look into the deployment pipeline, please visit the [CI/CD documentation](./docs/CI_CD.md)

---

## Cyber Security

Here is the threat model for our application:

![Threat Model Diagram](./docs/img/Threat_Model_Diagram.png)

We have taken a list of security measurements in the different aspects of our app, such as password encryption, input sanitation, user authorization, and more.

**SE_09 Cyber Security**  
For a detailed look into security threats, security measures and considerations, please visit the [Security documentation](./docs/Security.md).

---

## Demo video

Here is a screen recording of the iOS app interacting with the backend:

[](https://drive.google.com/file/d/1CaWtVOr2xA-zr8CedFyF_i18Pukh14Jb/view?usp=sharing)
