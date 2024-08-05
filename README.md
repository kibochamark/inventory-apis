# Inventory App API Documentation

This document provides information on the API endpoints available for the Inventory App. The API is designed to handle various operations related to inventory management, including retrieving stock data, adding items, and updating inventory details.

You can find more details on [Post api doc](https://documenter.getpostman.com/view/36984250/2sA3rxptMN) postman documentation

## Base URL

All API endpoints are accessed through the base URL:

```
http://localhost:3000/apiv1/
```

## Authentication

The API uses [Bearer Token](https://jwt.io/) authentication. Include the token in the `Authorization` header for all endpoints:

```
Authorization: Bearer <your-token>
```

## Endpoints

### 1. Get Stock Overview

**Endpoint:** `GET /stock/overview`

**Description:** Retrieves a summary of stock levels including total stock value and low stock items.

**Response:**

```json
{
  "totalStockValue": 15000,
  "lowStockItems": [
    { "id": "item1", "name": "Item 1", "stock": 5 },
    { "id": "item2", "name": "Item 2", "stock": 2 }
  ]
}
```

### 2. Get Recently Added Items

**Endpoint:** `GET /items/recent`

**Description:** Retrieves a list of items added to the inventory recently.

**Response:**

```json
[
  { "id": "item1", "name": "New Item 1", "addedDate": "2024-08-01" },
  { "id": "item2", "name": "New Item 2", "addedDate": "2024-08-03" }
]
```

### 3. Get Low Stock Items

**Endpoint:** `GET /items/low-stock`

**Description:** Retrieves a list of items that are currently low in stock.

**Response:**

```json
[
  { "id": "item1", "name": "Item 1", "stock": 5 },
  { "id": "item2", "name": "Item 2", "stock": 2 }
]
```

### 4. Get Available Inventories

**Endpoint:** `GET /inventories`

**Description:** Retrieves a comprehensive list of all available inventory items.

**Response:**

```json
[
  { "id": "item1", "name": "Item 1", "category": "Electronics", "stock": 50 },
  { "id": "item2", "name": "Item 2", "category": "Furniture", "stock": 30 }
]
```

### 5. Get Category Inventory Count

**Endpoint:** `GET /categories/inventory-count`

**Description:** Retrieves the total inventory count grouped by category.

**Response:**

```json
[
  { "category": "Electronics", "count
### 6. Get Stock Levels Over Time

**Endpoint:** `GET /stock/levels`

**Description:** Retrieves stock levels over time for a specified period.

**Query Parameters:**

- `category` (optional): Filter results by category (e.g., "Electronics").
- `interval` (required): The time interval for data aggregation (e.g., "day", "week", "month").

**Example Request:**

```
GET /stock/levels?category=Electronics&interval=day
```

**Response:**

```json
{
  "stockLevelsOverTime": [
    {
      "label": "Electronics",
      "data": [
        { "period": "8/1/2024", "total_stock": "20" },
        { "period": "8/2/2024", "total_stock": "15" },
        { "period": "8/3/2024", "total_stock": "18" }
      ]
    }
  ]
}
```

### 7. Add New Item

**Endpoint:** `POST /items`

**Description:** Adds a new item to the inventory.

**Request Body:**

```json
{
  "name": "New Item",
  "category": "Electronics",
  "stock": 50
}
```

**Response:**

```json
{
  "id": "item1",
  "name": "New Item",
  "category": "Electronics",
  "stock": 50
}
```

### 8. Update Item Stock

**Endpoint:** `PATCH /items/:id`

**Description:** Updates the stock level of an existing item.

**Request Body:**

```json
{
  "stock": 45
}
```

**Response:**

```json
{
  "id": "item1",
  "name": "Existing Item",
  "category": "Electronics",
  "stock": 45
}
```

### 9. Delete Item

**Endpoint:** `DELETE /items/:id`

**Description:** Deletes an item from the inventory.

**Response:**

```json
{
  "message": "Item deleted successfully"
}
```

## Error Handling

Errors are returned with a status code and a message describing the issue:

**Example Error Response:**

```json
{
  "status": 404,
  "message": "Item not found"
}
```

## Rate Limiting

API requests are subject to rate limiting to ensure fair usage. The rate limits are set to prevent abuse and to ensure optimal performance.

