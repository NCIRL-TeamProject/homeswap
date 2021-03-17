#### public access
Get: http://localhost:8080/api/test/all

#### SignUp
Post: http://localhost:8080/api/auth/signup
In postman: add below raw json body
{
	"firstName": "a firstName",
	"lastName": a lastName",
    "email": "an email",
    "password" : "a password"
}

#### SignIn
Post: http://localhost:8080/api/auth/signin
In postman: add below raw json body
{
	"email": "an email",
	"password": "a password"
}

This will return accessToken.

#### Private content
Get: http://localhost:8080/api/test/user
Headers:
x-access-token: accessToken (from signin)