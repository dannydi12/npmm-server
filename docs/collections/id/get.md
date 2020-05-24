# Get Contents of a Specific Collection

When supplying an id paramater, you will receive the name of the collection and all the packs plus metadata regarding those packs.

**URL** : `/api/collections/:id`

**URL Parameters** :

- `id=[integer]` where `id` is the ID of the collection to fetch.
- `justNames=[true]` supplying justNames=true returns only the names of the packages omitting metadata.
  **Method** : `GET`

**Auth required** : yes

**Data**: `{}`

## Success Response

**Condition** : The provided ID matches the ID of a thought in the database.

**Code** : `200 OK`

**Content example**

```json
{
  "name": "Favorites",
  "packs": [
    {
      "package": {
        "name": "@npmmjs/npmm",
        "links": {
          "npm": "https://www.npmjs.com/package/%40npmmjs%2Fnpmm",
          "homepage": "https://github.com/maleckim/npmm-cli#readme",
          "repository": "https://github.com/maleckim/npmm-cli",
          "bugs": "https://github.com/maleckim/npmm-cli/issues"
        },
        "version": "1.0.1"
      },
      "score": {
        "final": 0.38275472575016023,
        "detail": {
          "quality": 0.47884045380046986,
          "popularity": 0.016483589361959913,
          "maintenance": 0.6666666666666666
        }
      },
      "id": 19
    }
  ]
}

justNames? = [
    {
        "id": 19,
        "collection": 15,
        "name": "@npmmjs/npmm",
        "version": null
    }
]


```

## Error Responses

**Condition** : If there is no thought to return.

**Code** : `404 NOT FOUND`

**Content** : `That thought doesn't exist`
