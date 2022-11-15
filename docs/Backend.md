# Hardly Piano — Backend

## Introduction

Detailed documentation of integration and deployment pipeline.

Modules covered: **SE_22 Web Backend Technologies**

## Team overview

❗ Responsibilities/ownership of different parts. Have to refer to specific commits.

---

## Project structure

![placeholder-name](./img/placeholder.jpg)

The server is broken down into multiple layers, each responsible for one aspect of the business logic. The four main layers are **routes, controllers, services** and **models.** This separation helps us write _and test_ different parts of the logic separately. Often, each layer is instantiated with their dependencies (e.g Models are passed into Services), which allows us to easily mock these dependencies and test each layer in isolation.

### Routes

The routes files define the different routes and endpoints of our application. Each file exports an instance of an Express router, as well as a `path` property. These are automatically imported by the custom `importRoutes` function in the `appUtils.js` file upon server start.

Each endpoint is defined with a particular method of an appropriate controller which will handle the request and send a response. Some routes import additional middleware, such as `isAuthenticated`, that are only supposed to be used in some endpoints.

### Controllers

The controllers, in other words "route handlers", handle the logic of processing HTTP requests, calls services to perform business logic, then sends an appropriate response.

The controllers are responsible for the _flow_ and order of business logic (by calling services), but as a rule they perform as little business logic themselves as possible. They are also responsible for catching thrown Errors from Services and sending the errors in the HTTP response.

### Services

The services are responsible for performing the business logic, often read/writing from a database. These methods utilize Models (or other Services) to communicate with the database. Services do not interact with the `request` or `response` objects in any way.

### Models

The models define the _document schemas_ and return mongoose `Model` objects, which are able to read from and write to the MongoDB database, via methods like `.find()` and `.save()`.

Models use the document schemas to validate documents before saving/updating them, such as enforcing `required` fields or a `unique` constraint on usernames, but, as a general rule, custom validation is handle explicitly on the service level.

### Middleware

Alongside package-provided middleware such as `express.json()`, a view basic middleware functions are defined to parse requests or properly format responses. For instance, the `isAuthenticated` middleware checks the responses for JWT tokens, extracts a userID (if found), and passes it to the next handler.

---

## Getting started

### Running a development server

### Running a memory server

### Running tests

---

## Testing

[description of layers of testing and mocks, code examples]

---

## REST API

![placeholder-name](./img/placeholder.jpg)
[🖼 Diagram of how a request flows from user to server and back]

[Overview of endpoints, such as `users`, `auth`, `pieces`]

Visit the [API Documentation](#postman) for full details of each endpoint, and example requests/responses. The API documentation is created and hosted on Postman.

---
