# Shopease -- MERN Stack E-Commerce Platform

## Overview

**Shopease** is a full-stack e-commerce web application built using the
**MERN stack (MongoDB, Express, React, Node.js)**. The platform allows
users to browse products, add items to their cart, and place orders. It
also includes an **admin dashboard** where administrators can manage
products and monitor orders.

This project demonstrates real-world full-stack development including
**REST APIs, authentication, product management, cart handling, and
order processing**.

------------------------------------------------------------------------

# Features

## User Features

-   User registration and login
-   Browse available products
-   View detailed product information
-   Add products to cart
-   Manage cart items
-   Checkout and place orders

## Admin Features

-   Admin login
-   Add new products
-   Edit existing products
-   Delete products
-   View customer orders
-   Dashboard overview

## System Features

-   RESTful API architecture
-   Secure authentication middleware
-   Image upload for products
-   Cart management system
-   Order management system

------------------------------------------------------------------------

# Tech Stack

## Frontend

-   React
-   TypeScript
-   Vite
-   React Router
-   Context API
-   CSS

## Backend

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Multer (file uploads)
-   JWT Authentication

------------------------------------------------------------------------

# Project Structure

    shopease/
    │
    ├── backend/
    │   ├── config/
    │   │   └── db.js
    │   │
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── cartController.js
    │   │   ├── orderController.js
    │   │   └── productController.js
    │   │
    │   ├── middleware/
    │   │   ├── authMiddleware.js
    │   │   └── uploadMiddleware.js
    │   │
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Product.js
    │   │   ├── Cart.js
    │   │   └── Order.js
    │   │
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── cartRoutes.js
    │   │   ├── orderRoutes.js
    │   │   ├── productRoutes.js
    │   │   └── uploadRoutes.js
    │   │
    │   ├── uploads/
    │   ├── server.js
    │   └── package.json
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── context/
    │   │   ├── layouts/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   └── styles/
    │   │
    │   └── package.json
    │
    └── README.md

------------------------------------------------------------------------

# Installation & Setup

## 1. Clone the Repository

``` bash
git clone https://github.com/yourusername/shopease.git
cd shopease
```

------------------------------------------------------------------------

# Backend Setup

Navigate to backend folder:

``` bash
cd backend
```

Install dependencies:

``` bash
npm install
```

Create a `.env` file in the backend folder:

    PORT=5000
    MONGO_URI=your_mongodb_connection
    JWT_SECRET=your_secret_key

Run backend server:

``` bash
npm start
```

or

``` bash
nodemon server.js
```

Backend will run on:

    http://localhost:5000

------------------------------------------------------------------------

# Frontend Setup

Navigate to frontend folder:

``` bash
cd frontend
```

Install dependencies:

``` bash
npm install
```

Run the development server:

``` bash
npm run dev
```

Frontend will run on:

    http://localhost:5173

------------------------------------------------------------------------

# API Endpoints

## Authentication

    POST /api/auth/register
    POST /api/auth/login

## Products

    GET /api/products
    GET /api/products/:id
    POST /api/products
    PUT /api/products/:id
    DELETE /api/products/:id

## Cart

    GET /api/cart
    POST /api/cart
    DELETE /api/cart/:id

## Orders

    POST /api/orders
    GET /api/orders

------------------------------------------------------------------------

# Learning Outcomes

This project demonstrates:

-   Full-stack application architecture
-   REST API development
-   React component architecture
-   State management using Context API
-   Secure authentication using middleware
-   File upload handling
-   Database modeling using MongoDB

------------------------------------------------------------------------

# Future Improvements

-   Payment gateway integration
-   Product search and filters
-   Product reviews and ratings
-   Wishlist feature
-   Email notifications
-   Deployment using Docker / Cloud

------------------------------------------------------------------------

# Author

**Pavankalyan V**

Computer Science Student \| Full Stack Developer\
Interested in Web Development, AI, and Cloud Technologies
