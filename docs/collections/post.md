# Post New A Thought

Post the thought of the authenticated user if they are owner.

**URL** : `/collections`

**Method** : `POST`

**Auth required** : YES

**Required Headers** :

- `Authorization` : `Bearer [token from /token]`

**Data constraints**

```json
{
  "name": "[name of new collection]"
}
```

**Data example**

```json
{
  "name": "react-minimal"
}
```

## Success Response

**Condition** : if the collection does not already exist and the req.body.name is not empty

**Code** : `201 CREATED`

**Content** :

```json
{
  "id": 12898,
  "name": "react-minimal"
}
```

## Error Responses

**Condition** : If there was no name key in the request body.

**Code** : `400 BAD REQUEST`

**Content** : `Missing required content`

### Or

**Condition** : Empty String in the request body

**Code** : `400 BAD REQUEST`

**Content** : `Empty String in the request body`

### Or

**Condition** : User didn't provide an authorization token

**Code** : `401 UNAUTHORIZED`

**Content** : `No token provided`
