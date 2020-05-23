# Delete a Users Package

Delete a users package from a collection

**URL** : `/collections/:id`

**URL Parameters** :

- `id=[integer]` where `id` is the ID of the collection to delete.

**Method** : `DELETE`

**Auth required** : YES

**Required Headers** :

- `Authorization` : `Bearer [token from /token]`

**Permissions required** : User is validated

**Data** : `{}`

## Success Response

**Condition** : If the collection exists and the user is validated.

**Code** : `204 NO CONTENT`

**Content** : `{}`

## Error Responses

**Condition** : Authorized user is not owner of the thought.

**Code** : `401 UNAUTHORIZED`

**Content** : `Invalid token`

### Or

**Condition** : User didn't provide an authorization token

**Code** : `401 UNAUTHORIZED`

**Content** : `No token provided`
