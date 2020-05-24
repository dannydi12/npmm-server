# Get All Collections

Get a list of user created collections

**URL** : `/api/collections`

**Query Parameters** :

**Method** : `GET`

**Auth required** : YES

## Success Response

**Condition** : If the user exists it should return at least the Favorites collection

**Code** : `200 OK`

**Content example**

```json
[
  {
    "id": 1,
    "name": "example collection name"
  },
  {
    "id": 2,
    "name": "example collection name"
  }
]
```

## Error Responses

**Condition** : If there are no collections

**Code** : `404 NOT FOUND`

**Content** : `none`

## Notes
