# ShopNest 🛍️

A modern, responsive e-commerce web application built as a production capstone project for the RabTech Academy Full Stack Web Development Internship.

ShopNest demonstrates frontend architecture, REST API integration, authentication simulation, dynamic CRUD operations, persistent client-side state, responsive UI design, and cloud deployment.

---

## 🚀 Live Demo

**Live Application:**  
Coming soon — Vercel deployment

**GitHub Repository:**  
Coming soon — GitHub repository

---

## 📌 Project Overview

ShopNest is a responsive e-commerce storefront that allows users to browse products, search and filter the catalog, manage a shopping cart, simulate authentication, create orders, and manage products through a client-side administration interface.

The project combines multiple concepts learned throughout the internship into one complete application.

---

## ✨ Features

### 🛍️ Product Catalog

- Fetches products from a REST API
- Dynamic product rendering
- Product categories
- Product search
- Price sorting
- Alphabetical sorting
- Loading skeleton
- API error handling
- Responsive product grid

### 🔐 Authentication Simulation

- Login interface
- Email validation
- Password validation
- Login state persistence
- Logout functionality
- User-specific order history
- Client-side authentication simulation using `localStorage`

### 🛒 Shopping Cart

- Add products to cart
- Remove products from cart
- Cart item count
- Automatic cart total
- Clear cart functionality
- Persistent cart state using `localStorage`

### 📦 Order Management

- Checkout simulation
- Automatic order creation
- Order ID generation
- Order date
- Order status
- Order total
- User-specific order history
- Persistent order data

### ⚙️ Product CRUD

The application includes client-side product management:

- Create products
- Read products
- Update products
- Delete products
- Persistent product storage

### 📱 Responsive Design

The interface is designed for:

- Mobile
- Tablet
- Laptop
- Desktop

Responsive breakpoints are implemented using CSS media queries.

### ♿ Accessibility

The application includes:

- Semantic HTML
- Accessible labels
- Keyboard focus states
- ARIA attributes where appropriate
- Responsive controls
- Descriptive image alt text

---

## 🧰 Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript ES6+

### API

- Fake Store API
- REST API
- Fetch API
- Async/Await

### Browser Storage

- LocalStorage

### Development

- Git
- GitHub
- Visual Studio Code

### Deployment

- Vercel

---

## 🏗️ Project Architecture

```text
                         ┌─────────────────────┐
                         │       Browser       │
                         │     ShopNest UI     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      app.js         │
                         │ Application Logic   │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌────────────┐        ┌────────────┐        ┌────────────┐
       │  api.js    │        │  auth.js   │        │  cart.js   │
       │ REST API   │        │   Login    │        │   Cart     │
       └─────┬──────┘        └─────┬──────┘        └─────┬──────┘
             │                     │                     │
             ▼                     ▼                     ▼
       Fake Store API        LocalStorage           LocalStorage
                                   
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌────────────┐        ┌────────────┐        ┌────────────┐
       │ products.js│        │ orders.js  │        │ LocalStorage│
       │ CRUD/Filter│        │   Orders   │        │ Persistence │
       └────────────┘        └────────────┘        └────────────┘