# Hardly Piano — Security

## Introduction

Detailed documentation of security threats, measures taken, and additional concerns.

Modules covered: **SE_09 Cyber Security**

## Threat model

![placeholder-name](.//img/placeholder.jpg)

## Security measures

Below you will find a list of security measures that we have taken (or otherwise plan to take) for the different parts of our system.

---

### Authentication

#### OWASP Password Strength Requirements

We enforce the [OWASP password strength requirements](#missing) when users create or change their passwords.

#### Password hashing

[bcrypt](#missing) is used to hash users’ passwords on register and decrypt them on login.

Measure considered: replacing bcrypt with [scrypt](#missing link) for stronger password hashing.

#### JWT Auth Tokens

[JSON Web Tokens](#missing) are used to generate authentication tokens when a user logs in. They expire after 1 day, and can be refreshed using the /auth/refreshtoken endpoint.

JWTs are passed in the Auth-Token HTTP header. On the client side, they are currently stored in local Swift memory.

#### Planned: Blacklisted JWTs

If an authentication token is compromised, the token in question should be blacklisted, to prevent an attacker from making malicious requests as soon as possible.

#### Brute force password protection

The server monitors for rapid API calls from the same IP address and blacklists the IP after [MISSING].

---

### Authorization

Currently, we don’t have defined roles in our application, so the extent of Authorization measures is quite small.

#### `isAuthenticated` middleware

This middleware ensures that a valid JWT is provided when a request tries to read or write private user data.

#### `isFriend` middleware

This middleware ensures that two users are active friends when one user tries to read another user’s data.

As the application grows, user permissions will be more strictly managed using the [Access Control Module](#missing) and adhering to the principle of least privilege.

---

### Front-End Application (Vue)

While there is currently not front-end web application, we plan to build a Vue.js app in the following. For now, these are the measures that we plan to take:

#### `httpOnly` cookies for JWTs

To prevent easy access of JWT tokens in localStorage or document cookies, JWTs would be sent as httpOnly cookies that the browser manages. This prevents client-only JavaScript from accessing authorization tokens, but would not provide full protection.

#### XSS attacks

Vue.js (and other popular web frameworks) already have built-in measures for sanitizing inputs and escaping all special characters in HTML, which protect against XSS attacks.

#### CSRF tokens

To prevent Cross-Site Request Forgery attacks, the server would generate cryptographically secure CSRF tokens for every user session. This token would have to provided in the request by the Vue.js application to authorize potentially dangerous requests.

---

### Mobile app (iOS Swift)

-   Generally good security
-   Apple Keyring for sensitive credentials

---

### Node.js server

#### CORS policy

[CORS](#missing) is enabled in the Node application, in order to only allow requests from the Swift app and Vue.js web-app (which have different origins).

#### Planned: HSTS

We currently don't have an SSL certificate (more on that below). Once we configure HTTPS, we plan to enforce the [HTTPS Strict Transport Security](#missing) policy to protect against man-in-the-middle attacks.

#### Sanitizing inputs

[node sanitize](#missing) is used to sanitize user input in request queries and bodies. This prevents potentially malicious input from attempting NoSQL injections to the database.

#### Query pollution

Currently, none of our endpoints use query parameters as input. However, for future endpoints, the module [hpp](https://www.npmjs.com/package/hpp) will be used to prevent against HTTP parameter pollution attacks, and any server outages that might occur as a result.

#### Auditing packages

`npm audit` is run periodically to keep track of security vulnerabilities in our package dependencies. As a general rule, we try not to import too many npm packages, especially for trivial tasks.

#### Server too busy

The [toobusy-js](#missing) Node module is used to defend against DoS (Denial of Service) attacks. It monitors the event loop and response time. After a certain threshold, incoming requests receive a 503 Server Too Busy response.

#### Environment secrets

The environment secrets needed to run the server are hidden from the GitHub repository and are manually passed to collaborators and to deployment instances.

#### Planned: Vault

In the future, we would like to implement a service like [Vault](#missing) to securely store, access and deploy our environment secrets.

---

### MongoDB security

Our database is hosted on [MongoDB Atlas](#missing), which offers several security measures out of the box, such as network isolation and E2E encryption. Additionally, we are careful with our credentials and authentication.

#### Whitelisted users

We have a fixed list of username + password combinations that are authorized to connect to our database.

![image here](#missing)

#### Whitelisted IPs

We have a list of whitelisted IPs that are authorized to connect to our database. However, these measures were sometimes loosened to allow our deployment pipeline to function smoothly, as the IP address provided by AWS was not static.

![image here](#missing)

---

### AWS and cloud security

#### TFA and IAM roles

We enable Two-Factor Authentication for our AWS users, to prevent unauthorized access to our AWS instance. Additionally, all users are configured with IAM roles with a fixed list of permissions.

#### SSH

SSH is used to gain access to our AWS instance, the private keys of which are only stored on our local machines.

#### Planned: Fail2Ban

To prevent brute force attacks and malicious SSH login attempts, Fail2Ban will be configured on our EC2 instance. This will log authentication attempts and block IP addresses after `> maxretry` failed login attempts.

#### Planned: HTTPS

Currently, we still need to get an SSL certificate and configure HTTPS on our server. Until then, all requests use the HTTP protocol, which does not encrypt requests and responses.
