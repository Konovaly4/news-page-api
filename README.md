# news-page-api
Backend part of Newspage project

# Место (backend at local "express" server)
Yandex Praktikum Newspage project (diploma work) by Max Konovalov

v0.0.1 - First edition

## About
This is backend part of Newspage diploma progect at Yandex Praktikum. This version includes MongoDB and Mongoose to contain collections of users and articles. Server provided by Yandex Cloud service.

Project is avaliable at domain http://api.news-page.gq public IP: 130.193.44.48

Frontend part is not avaliable.

Notion: Project is also avaliable at domain http://news-page.gq. It's temporary situation becaue of frontend part is not ready
now, and server not tuned to use frontend domain. It will be disabled in future development.

## Prerequisites

- Node JS ("Express")
- MondoDB (Mongoose)
- Yandex Cloud
- Nginx

## How to start

To test this server you will need to install [Postman] (https://www.postman.com/) or any request/response app.

Testing is avaliable by sending requests at domain address http://api.news-page.gq or by following:

1. Clone this repository
```
$> git clone https://github.com/Konovaly4/news-page-api.github.io.git
```
2. Install MongoDB with Compass (required additional installation on MacOC).
```
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mdb-edition
```
3. Run database
```
$> mongod
```
4. Run project with dev script in another terminal window
```
$> npm run dev
```

## Server test options

Use Postman (or any request/response app) request fiels to create request and read response data below.
Functions:

1. Create new user
* Request status: POST
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
```
* URL: [http://api.news-page.gq/signup]
* URL params: none
* Data params: user.json, typed in request body, like this:
```
{
  "name": "username",
  "email": "email adress with email format",
  "password": "password with free format"
}
```
* Response: user data with .json format
* Errors: error with actual status and message

2. User's logging in
* Request status: POST
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
```
* URL: [http://api.news-page.gq/signin]
* URL params: none
* Data params: user.json, typed in request body, like this:
```
{
  "email": "email adress with email format",
  "password": "password with free format" (password must be actual to user in database)
}
```
* Response: none
* Errors: error with actual status and messages

Note: All functions below avaliable after logging in and receiving the token.

3. Get user info
* Request status: GET
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
"Authorization": "Bearer (token)"
```
* URL: [http://api.news-page.gq/users/me]
* URL params: none
* Data params: none
* Response: user data .json format
* Errors: error with actual status and message

4. Changing user name (to change email only another registration avaliable)
* Request status: PATCH
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
"Authorization": "Bearer (token)"
```
* URL: [http://api.news-page.gq/users/me]
* URL params: none
* Data params: user.json, typed in request body, like this:
```
{
  "name": "username"
}
```
* Response: updated user data with .json format
* Errors: error with actual status and message

5. Logging out
* Request status: POST
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
"Authorization": "Bearer (token)"
```
* URL: [http://api.news-page.gq/users/me/signout]
* URL params: none
* Data params: none
```
* Response: none
* Errors: error with actual status and message

6. Creating new article
* Request status: POST
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
"Authorization": "Bearer (token)"
```
* URL: [http://api.news-page.gq/articles]
* URL params: none
* Data params: card.json, typed in request body, like this:
```
{
	"keyword": "String",
	"title": "String",
	"text": "String",
	"date": "Date in ISO 8601 format (YYYY-MM-DD)",
	"source": "String",
	"link": "String in link format",
	"image": "String in link format"
}
```
* Response: article data with .json format
* Errors: error with actual status and message

7. Get articles (avaliable only for current user)
* Request status: GET
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
"Authorization": "Bearer (token)"
```
* URL: [http://api.news-page.gq/articles]
* URL params: none
* Data params: none
* Response: articles collection with .json format
* Errors: error with actual status and message

8. Deleting article (avaliable only for current user and articles, saved by him) 
* Request status: DELETE
* Request headers: 
```
"Accept": "application/json"
"Content-Type": "application/json"
```
* URL: [http://api.news-page.gq/articles/:id]
* URL params: /id must be a string with hash format
* Data params: none 
* Response: deleted article data with .json format
* Errors: error with actual status and message
