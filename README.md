# Hardly Piano

[project background, information, team members, backend structure]

[❗ Link to live server (use with Postman)](http://ec2-3-66-192-132.eu-central-1.compute.amazonaws.com:3000)

[❗ Link to Swift app repo](https://github.com/paulecode/HardlyPianoSwift)

---

## Project architecture

![placeholder-name](./docs/img/placeholder.jpg)

### Technologies used

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

To run the server locally, please run

`npm run dev`

#### Running tests

---

## Node + Express Backend

[Basic overview of project structure and REST API]

**SE_22 Web Backend Technologies**  
For a detailed look into the Node server and REST API, please visit the [Backend documentation](./docs/Backend.md).

---

## Database

![Database diagram](./docs/img/Database_Diagram.png)
[🖼 Database model diagram]

[Describe the use of MongoDB as database, mongoose as ODM and MongoDB Atlas as hosting]

**SE_06 NoSQL Databases**  
For a detailed look into the MongoDB database, please visit the [Database documentation](./docs/Database.md)

---

## Deployment

![CI/CD Diagram](./docs/img/CI_CD_Diagram.png)
[🖼 Deployment/pipeline diagram]

[Basic description of AWS hosting, deployment pipeline]

**SE_23 CI/CD**  
For a detailed look into the deployment pipeline, please visit the [CI/CD documentation](./docs/CI_CD.md)

---

## Automated testing

[For detailed explanation of unit and integration testing]

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

[❗ Upload video here](#missing)
