## CRUD API for Product

This document provides a description of the CRUD (Create, Read, Update, Delete) API endpoints for managing products. The API allows clients to perform basic operations on products, including retrieving all products, retrieving a specific product by ID, creating a new product, searching for products based on specific criteria, updating an existing product, and deleting a product.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development

$ yarn run start:dev

```

## Test

```bash
# tests
$ yarn run test

```

### Base URL

The base URL for all API endpoints is: `http://localhost:3000/product`

### API Endpoints

#### 1. Get All Products

- **Endpoint:** `/product`
- **Method:** GET
- **Description:** Retrieves a list of all products.
- **Response:** Returns a JSON array containing all product objects.
- **Example:** `GET http://localhost:3000/product`

#### 2. Get Product by ID

- **Endpoint:** `/product/{id}`
- **Method:** GET
- **Description:** Retrieves a specific product by its unique ID.
- **Parameters:**
  - `{id}` (path parameter): The ID of the product to retrieve.
- **Response:** Returns a JSON object representing the product.
- **Example:** `GET http://localhost:3000/product/123`

#### 3. Create Product

- **Endpoint:** `/product`
- **Method:** POST
- **Description:** Creates a new product.
- **Request Body:** A JSON object representing the product to be created.
- **Response:** Returns a JSON object representing the newly created product.
- **Example:** `POST http://localhost:3000/product`
  - Request Body:
    ```json
    {
      "name": "Product Name",
      "description": "Product Description",
      "price": 1000,
      "variants": [
        {
          "name": "Variant 1",
          "sku": "xxxxxx",
          "additionalCost": "500",
          "stockCount": "5"
        },
        {
          "name": "Variant 2",
          "sku": "xxxxxx",
          "additionalCost": "250",
          "stockCount": "10"
        }
      ]
    }
    ```

#### 4. Search Products

- **Endpoint:** `/product?search=`
- **Method:** GET
- **Description:** Searches for products based on specific criteria.
- **Parameters:**
  - `query` (query parameter): The search query string.
- **Response:** Returns a JSON array containing the matching product objects.
- **Example:** `GET http://localhost:3000/product?search=`

#### 5. Update Product

- **Endpoint:** `/product/{id}`
- **Method:** PATCH
- **Description:** Updates an existing product with new information.
- **Parameters:**
  - `{id}` (path parameter): The ID of the product to update.
- **Request Body:** A JSON object representing the updated product.
- **Response:** Returns a JSON object representing the updated product.
- **Example:** `PATCH http://localhost:3000/product/123`
  - Request Body:
    ```json
    {
      "name": "Updated Product"
    }
    ```

#### 6. Delete Product

- **Endpoint:** `/product/{id}`
- **Method:** DELETE
- **Description:** Deletes a product by its ID.
- **Parameters:**
  - `{id}` (path parameter): The ID of the product to delete.
- **Response:** Returns a success message if the product is successfully deleted.
- **Example:** `DELETE http://localhost:3000/product/123`


## Sample .env

```bash
PORT=3000

SWAGGER=true

MONGO_URI=mongodb://localhost:27017/product-management
```