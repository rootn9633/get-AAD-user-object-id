# Get User Object ID

A user's object ID is used in many cases such as in Azure role-based access control (Azure RBAC). This project demonstraits the use of Microsoft Graph REST API to get a users's object ID from their user id in Azure AD.

## Usage

`npm install`: install dependancy
`npm start`: start server

## Design

The server first [gets access on behalf of a user](https://docs.microsoft.com/en-us/graph/auth-v2-user), which let's it obtain the access token. With this token, it can call the [Get a user](https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http) API. This call is demonstrated both in on the backend code and on the frontend within the webpage.
