[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/eVluYqZE)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12858966&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

API Documentation
https://documenter.getpostman.com/view/15364461/2s9YXpTxun

# News Portal API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `POST /google-sign-in`
- `GET /admin/products`
- `POST /admin/products`
- `DELETE /admin/products/:id`
- `PUT /admin/products/:id`
- `GET /products/:id`
- `GET /products/`
- `POST /payment/midtrans/token`
- `POST /order`

&nbsp;

## 1. POST /login

Request:

- body:

```json
{
  "email": "admin@mail.com",
  "password": "mypassword123"
}
```

_Response (200 - OK)_

```json
{
  "token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input email"
}
OR
{
  "message": "Please input password"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "User Not Authorized"
}
```

&nbsp;

## 2. POST /register

Request:

- body:

```json
{
  "email": "user@mail.com",
  "password": "mypassword123",
  "role": "Admin"
}
```

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (201 - Created)_

```json
{
  "token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input email"
}
OR
{
  "message": "Please input password"
}
OR
{
  "message": "email must be unique"
}
OR
{
  "message": "Please input email format"
}
```

## 3. POST /google-sign-in

Request:

_Response (201 - Created)_

```json
{
  "googleToken": "string"
}
```

&nbsp;

## 4. GET /admin/products

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imageUrl": "string",
    "updatedAt": "date",
    "createdAt": "date"
  },
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imageUrl": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
]
```

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "User must login"
}
OR
{
  "message": "Invalid Token"
}
```

## 5. POST /admin/products

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

- body:

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imageUrl": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imageUrl": "string",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "User must login"
}
OR
{
  "message": "Invalid Token"
}
```

_Response (404 - Page Not Found)_

```json
{
  "message": "Error Not Found"
}
```

&nbsp;

## 6. DELETE /admin/products/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imageUrl": "string",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input product name"
}
OR
{
  "message": "Please input product description"
}
OR
{
  "message": "Please input product price"
}
OR
{
  "message": "Please input product stock"
}
OR
{
  "message": "Please input product image"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "User must login"
}
OR
{
  "message": "Invalid Token"
}
```

_Response (404 - Page Not Found)_

```json
{
  "message": "Error Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 7. PUT /admin/products/:id

Request:

- body:

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imageUrl": "string"
}
```

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "description": "string",
  "price": "integer",
  "stock": "integer",
  "imageUrl": "string",
  "updatedAt": "date",
  "createdAt": "date"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input product name"
}
OR
{
  "message": "Please input product description"
}
OR
{
  "message": "Please input product price"
}
OR
{
  "message": "Please input product stock"
}
OR
{
  "message": "Please input product image"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "User must login"
}
OR
{
  "message": "Invalid Token"
}
```

_Response (404 - Page Not Found)_

```json
{
  "message": "Error Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 8. GET /products/:id

_Response (200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "imgUrl": "string",
  "categoryId": "integer",
  "authorId": "integer",
  "updatedAt": "date",
  "createdAt": "date"
}
```

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "User must login"
}
OR
{
  "message": "Invalid Token"
}
```

_Response (404 - Page Not Found)_

```json
{
  "message": "Error Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 9. GET /products

Request:

_Response (200 - OK)_

```json
[
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imageUrl": "string",
    "updatedAt": "date",
    "createdAt": "date"
  },
  {
    "id": "integer",
    "name": "string",
    "description": "string",
    "price": "integer",
    "stock": "integer",
    "imageUrl": "string",
    "updatedAt": "date",
    "createdAt": "date"
  }
]
```

&nbsp;

## 10. POST /payment/midtrans/token

Request:

- body:

```json
{
  "productId": "integer",
  "quantity": "integer",
  "grossAmount": "integer",
  "status": "string"
}
```

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (201 - Created)_

```json
{
  "transaction_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input productId"
}
OR
{
  "message": "Please input quantity"
}
OR
{
  "message": "Please input grossAmount"
}
OR
{
  "message": "Please input status"
}

```

_Response (401 - Unathorized)_

```json
{
  "message": "User must login"
}
OR
{
  "message": "Invalid Token"
}
```

&nbsp;

## 11. POST /order

Request:

- body:

```json
{
  "productId": "integer",
  "quantity": "integer",
  "grossAmount": "integer",
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "UserId": "integer",
  "productId": "integer",
  "quantity": "integer",
  "grossAmount": "integer",
  "status": "string"
}
```

- headers:

```json
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "User must login"
}
OR
{
  "message": "Invalid Token"
}
```

&nbsp;
