# Update A Collection

Update the Collection Name

**URL** : `/thoughts/:id`

**URL Parameters** :

- `id=[integer]` where `id` is the ID of the Collection to edit.

**Method** : `PATCH`

**Auth required** : YES

**Required Headers** :

- `Authorization` : `Bearer [token from /token]`

**Permissions required** : User is validated

**Data constraints**

```json
{
  "name": "[The name the collection will be updated to]"
}
```

**Data example**

```json
{
  "name": "updated name"
}
```

## Success Response

**Condition** : If the collection exists and user is validated.

**Code** : `200 OK`

**Content** :

```json
{
  "id": 12898,
  "user_id": 12,
  "name": "updated name"
}
```

## Error Responses

**Condition** : If there was no name key in the request body.

**Code** : `400 BAD REQUEST`

**Content** : `Missing content in request body`

### Or

**Condition** : Request has an empty string.

**Code** : `400 BAD REQUEST`

**Content** : `Empty String in request body`

### Or

**Condition** : Authorized user is not owner of the thought.

**Code** : `401 UNAUTHORIZED`

**Content** : `Invalid token`

### Or

**Condition** : User didn't provide an authorization token

**Code** : `401 UNAUTHORIZED`

**Content** : `No token provided`
