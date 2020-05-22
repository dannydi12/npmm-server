# Get All Posted Thoughts

Get a list of user created collections

**URL** : `/collections`

**Query Parameters** :

**Method** : `GET`

**Auth required** : YES

**Data**: `{id: (collections id), name: (name of collection)}`

## Success Response

**Condition** : If the user exists it should return atleast the Favorites collection

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
