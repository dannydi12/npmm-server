# Post New A Package

Post a New Package to a Collection

**URL** : `/packages`

**Method** : `POST`

**Auth required** : YES

**Required Headers** :

- `Authorization` : `Bearer [token from /token]`

**Data constraints**

```json
{
  "collection": "[id of the collection to post the package to]",
  "name": "[name of new package]",
  "version": "[version will be returned if available]"
}
```

**Data example**

```json
{
  "collection": 3,
  "name": "some-package",
  "version": "2.0.0"
}
```

## Success Response

**Condition** : if the package doesnt exist, and the collection

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
