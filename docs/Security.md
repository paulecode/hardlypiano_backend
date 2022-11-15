# Hardly Piano — Security

## Introduction

Detailed documentation of security threats, measures taken, and additional concerns.

Modules covered: **SE_09 Cyber Security**

## Threat model

![placeholder-name](.//img/placeholder.jpg)

## Security measures

### Authentication

-   OWASP password strength requirements
-   Password hashing (maybe replace bcrypt with scrypt)
-   JWT token generation (and expiration)
-   Blacklisted JWTs
-   Brute force password protection

### Authorization

There is little authorization. There is one middleware that checks for "isFriend" to display more details about user.

-   isFriend middleware

### Front-End Application (Vue)

[If we do a front-end, this is what we would take into account]

-   httpOnly cookies for JWT
-   XSS attacks (automatically helpful)
-   CSRF tokens

### Mobile app (iOS Swift)

-   Generally good security
-   Apple Keyring for sensitive credentials

### Node.js server and API

-   CORS policy
-   sanitizing inputs
-   query pollution (will we ever use queries?)
-   auditing packages
-   Server too busy (anti-DOS)

### MongoDB security

-   two-factor authentication
-   whitelisted users
-   whitelisted IPs
-   [look up what Mongo does for security]

### AWS security

-   IAM roles and authentication
-   SSH Login
-   Vault (environment secrets)

## Concerns

-   HTTPS
-   Vault
