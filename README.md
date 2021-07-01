# Grupo-demaciagang-p2-backend

## Bookkers API 
[Heroku link](https://demacia-web-p2.herokuapp.com/).

## Bookkers API Documentation

Documentación basada en la [API de Twitter](https://documenter.getpostman.com/view/9956214/T1LMiT5U). 

Se puede encontrar [acá (Bookkers API)](https://documenter.getpostman.com/view/13524334/TzeWF7TR#70c4b41d-7485-4032-ae28-2318b9e0729e).


Tanto el invocador como los campeones son usuarios de la API y sus contraseñas respectivas se pueden ver en las tablas.

## Campeones
| Nombre | Email | Contraseña |
| --- | --- | --- |
| José Antonio Castro | jacastro18@uc.cl | 123456 |
| José Madriaza | jm.madriaza@uc.cl | 123456 |
| Bastian Hilcker | bhilcker@uc.cl | 123456 |

## Invocador
| Nombre | Email | Contraseña |
| --- | --- | --- |
| Humberto Ortúzar | hjortuzar@uc.cl | 123456 |

# Diseño Bookkers API

## Crear Usuario

```
POST /users
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
    "firstName": "Tony",
    "lastName": "Castro",
    "email": "tony@uc.cl",
    "password": "wenlo69420"
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
    "data": {
        "type": "users",
        "id": "5",
        "attributes": {
            "firstName": "Tony",
            "lastName": "Castro",
            "email": "tony@uc.cl"
        }
    }
}
```

### Errors

#### Error de servidor

```
Status code: 500
```

#### Error de Bad Request

```
Status code: 400
```


## Loguear Usuario

```
POST /auth
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
	"email": "jacastro18@uc.cl",
	"password": "123456"
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYyMzc5NzMzOX0.Pkwmp0LRHamhjWDGS9FINa4peC80aalcodgEPD9Vw84",
  "token_type": "Bearer"
}
```

### Errors

#### Error de servidor

```
Status code: 500
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

## Obtener datos de usuario logueado

```
GET /users/me
```

### Response

```
Status code: 200
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "users",
    "id": "1",
    "attributes": {
      "firstName": "José Antonio",
      "lastName": "Castro",
      "email": "jacastro18@uc.cl"
    }
  }
}
```

### Errors

#### Error de Unauthorized

```
Status code: 401
```

## Obtener datos de usuario

```
GET /users/:id
```

### Response

```
Status code: 200
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "users",
    "id": "1",
    "attributes": {
      "firstName": "José Antonio",
      "lastName": "Castro",
      "email": "jacastro18@uc.cl"
    }
  }
}
```

### Errors

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

#### Error de Servidor

```
Status code: 500
```

## Editar Usuario

```
PATCH /users/:id
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
	"firstName": "Tony",
	"lastName": "Castro",
	"email": "jtony@uc.cl",
	"password": "123456"
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "users",
    "id": "1",
    "attributes": {
      "firstName": "Tony",
      "lastName": "Castro",
      "email": "jtony@uc.cl"
    }
  }
}
```

### Errors

#### Error de servidor

```
Status code: 500
```

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```



## Obtener libros

```
GET /books
```

### Response

```
Status code: 200
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": [
    {
      "type": "books",
      "id": "1",
      "attributes": {
        "title": "Percy Jackson: The Lightning Thief",
        "isbn": "9786124497001",
        "author": "Rick Riordan",
        "genre": "Fantasy",
        "userId": 1,
        "description": "Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena, Percy must journey across the United States to catch a thief who has stolen the original weapon of mass destruction — Zeus’ master bolt. Along the way, he must face a host of mythological enemies determined to stop him. Most of all, he must come to terms with a father he has never known, and an Oracle that has warned him of betrayal by a friend."
      }
    },
    {
      "type": "books",
      "id": "2",
      "attributes": {
        "title": "Percy Jackson: The Sea of Monsters",
        "isbn": "9786124497002",
        "author": "Rick Riordan",
        "genre": "Fantasy",
        "userId": 1,
        "description": "When Thalia’s tree is mysteriously poisoned, the magical borders of Camp Half-Blood begin to fail. Now Percy and his friends have just days to find the only magic item powerful to save the camp before it is overrun by monsters. The catch: they must sail into the Sea of Monsters to find it. Along the way, Percy must stage a daring rescue operation to save his old friend Grover, and he learns a terrible secret about his own family, which makes him question whether being the son of Poseidon is an honor or a curse."
      }
    },
  ]
}
```

## Obtener libro por ID

```
GET /books/:id
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "books",
    "id": "1",
    "attributes": {
      "title": "Percy Jackson: The Lightning Thief",
      "isbn": "9786124497001",
      "author": "Rick Riordan",
      "genre": "Fantasy",
      "userId": 1,
      "description": "Twelve-year-old Percy Jackson is on the most dangerous quest of his life. With the help of a satyr and a daughter of Athena, Percy must journey across the United States to catch a thief who has stolen the original weapon of mass destruction — Zeus’ master bolt. Along the way, he must face a host of mythological enemies determined to stop him. Most of all, he must come to terms with a father he has never known, and an Oracle that has warned him of betrayal by a friend."
    }
  }
}
```

### Errors

#### Error Not Found

```
Status code: 404
```

#### Error Internal Server Error

```
Status code: 505
```


## Crear libro

```
POST /books
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
	"title": "Harry Potter",
	"isbn": "1234567891234",
	"author": "JK Roawling",
	"genre": "Fantasy",
    "description": "Good book"
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "books",
    "id": "13",
    "attributes": {
      "title": "Harry Potter",
      "isbn": "1234567891234",
      "author": "JK Roawling",
      "genre": "Fantasy",
      "userId": 1,
      "description": "Good book"
    }
  }
}
```

### Errors

#### Error de Bad Request

```
Status code: 400
```

#### Error de unauthorized

```
Status code: 401
```

#### Error de servidor

```
Status code: 500
```


## Editar un libro

```
PATCH /books/:id
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
	"title": "Harry Potter",
	"isbn": "1234567891234",
	"author": "JK Roawling",
	"genre": "Fantasy",
    "description": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old."
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "books",
    "id": "13",
    "attributes": {
      "title": "Harry Potter",
      "isbn": "1234567891234",
      "author": "JK Roawling",
      "genre": "Fantasy",
      "userId": 1,
      "description": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, he faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old."
    }
  }
}
```

### Errors

#### Error de Bad Request

```
Status code: 400
```

#### Error de unauthorized

```
Status code: 401
```

#### Error Not Found

```
Status code: 404
```

#### Error de servidor

```
Status code: 500
```


## Obtener todas las reviews de un libro

```
GET /books/:id/reviews
```

### Response

```
Status code: 200
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": [
    {
      "type": "reviews",
      "id": "2",
      "attributes": {
        "content": "Lame book, it's better the third one",
        "score": 1,
        "userId": 3,
        "bookId": 1
      }
    },
    {
      "type": "reviews",
      "id": "3",
      "attributes": {
        "content": "Nice!",
        "score": 5,
        "userId": 3,
        "bookId": 1
      }
    },
    {
      "type": "reviews",
      "id": "1",
      "attributes": {
        "content": "HOLAAA21212AAAAA",
        "score": 32,
        "userId": 2,
        "bookId": 1
      }
    }
  ]
}
```

### Errors

#### Error de Not Found

```
Status code: 404
```

#### Error de Servidor

```
Status code: 500
```

## Crear Review para un libro

```
POST /books/:id/reviews
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
	"content": "Esta genial!!",
	"score": "5"
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "reviews",
    "id": "7",
    "attributes": {
      "content": "Esta genial!!",
      "score": 5,
      "userId": 1,
      "bookId": 1
    }
  }
}
```

### Errors

#### Error de servidor

```
Status code: 500
```

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Unauthorized

```
Status code: 404
```

## Obtener una review de un libro

```
GET /books/:id/reviews/:id2
```

### Response

```
Status code: 200
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "reviews",
    "id": "7",
    "attributes": {
      "content": "Esta genial!!",
      "score": 5,
      "userId": 1,
      "bookId": 1
    }
  }
}
```

### Errors

#### Error de Not Found

```
Status code: 404
```

#### Error de Servidor

```
Status code: 500
```


## Editar Review de libro

```
PATCH /books/:id/reviews/:id2
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
	"content": "Esta piola",
	"score": "3"
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "reviews",
    "id": "7",
    "attributes": {
      "content": "Esta piola",
      "score": "3",
      "userId": 1,
      "bookId": 1
    }
  }
}
```

### Errors

#### Error de servidor

```
Status code: 500
```

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

## Obtener todas las reviews de un usuario

```
GET /users/:id/reviews
```

### Response

```
Status code: 200
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": [
    {
      "type": "reviews",
      "id": "2",
      "attributes": {
        "content": "Lame book, it's better the third one",
        "score": 1,
        "userId": 3,
        "bookId": 1
      }
    },
    {
      "type": "reviews",
      "id": "3",
      "attributes": {
        "content": "Nice!",
        "score": 5,
        "userId": 3,
        "bookId": 1
      }
    }
  ]
}
```

### Errors

#### Error de Not Found

```
Status code: 404
```

#### Error de Servidor

```
Status code: 500
```

#### Error de Unauthorized

```
Status code: 401
```

## Obtener todas las reviews con like de un usuario

```
GET /users/:id/liked_reviews
```

### Response

```
Status code: 200
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
    "data": [
        {
            "type": "reviews",
            "id": "4",
            "attributes": {
                "content": "There is a pretty girl in that book",
                "score": 5,
                "userId": 3,
                "bookId": 3
            }
        }
    ]
}
```

### Errors

#### Error de Not Found

```
Status code: 404
```

#### Error de Servidor

```
Status code: 500
```

#### Error de Unauthorized

```
Status code: 401
```

## Agregar like a reseña de libro

```
POST /books/:book_id/reviews/:review_id/likes
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "reviews",
    "attributes": {
      "userId": 1,
      "reviewId": 1
    }
  }
}
```

### Errors

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

#### Error de servidor

```
Status code: 500
```

## Eliminar un like a reseña de libro

```
DELETE /books/:book_id/reviews/:review_id/likes
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
}
```

### Response

```
Status code: 204
```

### Errors

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

#### Error de servidor

```
Status code: 500
```

## Eliminar una reseña de libro

```
DELETE /books/:book_id/reviews/:review_id
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
}
```

### Response

```
Status code: 204
```

### Errors

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

#### Error de servidor

```
Status code: 500
```

## Crear reporte

```
POST /books/:book_id/reviews/:review_id/reports
```

### Request

#### Request Headers
```
Content-Type: application/json
```

#### Request Body
```json
{
    "content": "It's ofensive"
}
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": {
    "type": "reviews",
    "id": "1",
    "attributes": {
      "userId": 1,
      "reviewId": 1
    }
  }
}
```

### Errors

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

#### Error de servidor

```
Status code: 500
```

## Obtener reportes de una reseña (solo admin)

```
GET /books/:book_id/reviews/:review_id/reports
```

### Request

#### Request Headers
```
Content-Type: application/json
```

### Response

```
Status code: 201
```

#### Response Headers
```
Content-Type: application/json
```

#### Response Body
```json
{
  "data": [
    {
      "type": "books",
      "id": "1",
      "attributes": {
        "content": "It's ofensive",
        "userId": 1,
        "reviewId": 1
        ""
      }
    },
    {
      "type": "books",
      "id": "1",
      "attributes": {
        "content": "It was helpfull",
        "userId": 4,
        "reviewId": 3
        ""
      }
    }
  ]
}
```

### Errors

#### Error de Bad Request

```
Status code: 400
```

#### Error de Unauthorized

```
Status code: 401
```

#### Error de Not Found

```
Status code: 404
```

#### Error de servidor

```
Status code: 500
```


## Borrar a un libro

```
GET /admin/books/:id
```

### Response

```
Status code: 204
```

### Errors

#### Error de Not Found

```
Status code: 404
```

#### Error de Servidor

```
Status code: 500
```

#### Error de Unauthorized

```
Status code: 401
```

## Borrar a un usuario

```
GET /admin/users/:id
```

### Response

```
Status code: 204
```

### Errors

#### Error de Not Found

```
Status code: 404
```

#### Error de Servidor

```
Status code: 500
```

#### Error de Unauthorized

```
Status code: 401
```
