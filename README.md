# 🛍️ ShopNest

### Production E-Commerce Web Application

ShopNest is a modern, responsive e-commerce web application developed as the **Production Capstone Project** for the **RabTech Academy Full Stack Web Development Internship**.

The project brings together the major concepts covered during the internship, including semantic HTML, responsive CSS, JavaScript ES6+, REST API integration, authentication simulation, CRUD operations, persistent client-side state, Git/GitHub, and cloud deployment.

---

## 🚀 Live Demo

**Live Application:**  
Coming soon — Vercel deployment

**GitHub Repository:**  
https://github.com/KUNALAPRIL/rabtech-capstone-shopnest

---

# 📌 Project Overview

ShopNest provides a complete e-commerce-style shopping experience where users can:

- Browse products
- Search products
- Filter products by category
- Sort products
- Add products to a shopping cart
- Remove products from the cart
- Persist cart data
- Simulate user authentication
- Checkout products
- Generate orders
- View order history
- Create products
- Edit products
- Delete products
- Maintain application state using browser storage

The project is built with a modular JavaScript architecture so that different responsibilities are separated into individual modules.

---

# ✨ Key Features

## 🛍️ Product Catalog

ShopNest retrieves product information from a REST API and dynamically displays the products.

Features include:

- REST API integration
- Dynamic product rendering
- Product images
- Product descriptions
- Product pricing
- Category filtering
- Search functionality
- Price sorting
- Alphabetical sorting
- Loading skeleton
- API error handling
- Responsive product cards

---

## 🔎 Search & Filtering

Users can quickly find products using the search and filtering system.

### Search

Users can search products by their names.

### Categories

Products can be filtered according to their categories.

### Sorting

Available sorting options include:

- Default
- Price: Low to High
- Price: High to Low
- Name: A to Z

All filtering and sorting operations update the DOM dynamically without reloading the page.

---

# 🔐 Authentication Simulation

ShopNest includes a simulated authentication system.

Users can:

- Login
- Logout
- Maintain login state
- Access their account
- View their order history

Authentication state is stored using browser `localStorage`.

### Demo Login

```text
Email:
demo@gmail.com

Password:
123456