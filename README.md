# Database CRUD operations

Welcome to the the project! This web application provides features for user registration, authentication,create, update,delete, fetching data by productID,read all data in the warehouse collection

## Demo

Visit the deployed application:  [CRUD operations](https://crudoperations-k5nc.onrender.com)

## Features

### User Registration and Authentication

The application supports user registration and authentication to provide a personalized experience. Users can sign up with a valid email address and password, and once registered, they can log in securely to access their account.


## Deployment

The webapp is deployed on Render.com. You can access the live application at [https://crudoperations-k5nc.onrender.com](https://crudoperations-k5nc.onrender.com).


## CRUD Operations

### Create (POST)

- **Endpoint:** `/api/warehouse/items`
- **Description:** Create a new warehouse item.


### Read (GET)
#### Retrieve Details of a Specific Item
- **Endpoint:** `/api/warehouse/items/{itemId}`
- **Description:** Retrieve detailed information about a specific warehouse item based on its unique identifier..
 
#### Retrieve List of All Items
- **Endpoint:** `/api/warehouse/items`
-**Description:** Retrieve a list of all warehouse items, including their details.


### Update (PUT/PATCH)
- **Endpoint:** `/api/warehouse/items/{itemId}`
- **Description:** Update the details of an existing warehouse item based on its unique identifier.
  
### Delete (DELETE)
- **Endpoint:** `/api/warehouse/items/{itemId}`
- **Description:** Delete a specific warehouse item based on its unique identifier.

  
## Technologies Used

- React: A JavaScript library for building user interfaces.
- Node.js for backend, express.js for connecting with MongoDB
- DataBase : MongoDB

