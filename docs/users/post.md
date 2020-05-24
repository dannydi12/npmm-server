# Get A Token For Auth on Sign Up

This endpoint is used to get a token to use in subsequent requests to the server.

**URL** : `/api/users`

**Method** : `POST`

**Auth required** : NO

**Body** :

```json
{
  "email": "mrbuddy@npmm.dev",
  "password": "P4ssword"
}
```

## Success Response

**Condition** : If the credentials are valid and the user does not exists.

**Code** : `201 CREATED`

**Content** :

```json
{
  "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MTY0YjQ5MS1lM2JhLTQ4NzEtOTBjZC1lODA2YWVjOTBjMDkiLCJpYXQiOjE1ODYwMzA5NzJ9.tjyoNcpocoxXypRIEp0zX4NG27FVh6mRu6j5BnAu0RE"
}
```

## Error Responses

**Condition** : Something went wrong.

**Code** : `500 Internal Server Error`

## Note

Make sure to place this in the `Authorization` header with a value of `Bearer [token]`.
