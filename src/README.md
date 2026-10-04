# 🛒 Ecommerce Store - React

A modern and responsive **Ecommerce Store UI** built with React and Vite.

This project demonstrates a complete frontend ecommerce experience including product browsing, search and filtering, shopping cart management, checkout, authentication, and an admin dashboard for managing products and orders.

---

## 🚀 Features

### 🛍️ Customer Features

* Browse available products
* Product details page
* Search products by name
* Filter products by price range
* Add products to cart
* Increase and decrease product quantities
* Remove products from cart
* Automatic cart total calculation
* Cart persistence using Local Storage
* Checkout form
* Cash on Delivery payment option
* Order confirmation page
* Responsive design

### 🔐 Authentication

* User registration
* User login
* Logout functionality
* User profile page
* Authentication state persistence
* Customer and Admin roles

### 👨‍💼 Admin Dashboard

* Admin-only access
* Dashboard statistics
* Total products count
* Total orders count
* Customer count
* Product management
* Add new products
* Edit existing products
* Delete products
* Product data persistence
* Order management
* View customer order information
* Update order status

### 📦 Order Management

Supported order statuses:

* Pending
* Processing
* Shipped
* Delivered
* Cancelled

Order information includes:

* Customer information
* Delivery information
* Payment method
* Ordered products
* Product quantities
* Order total
* Order status

---

## 🛠️ Technologies Used

* **React**
* **Vite**
* **React Router**
* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**
* **Local Storage**
* **npm**

---

## 📁 Project Structure

```text
src/
│
├── admin/
│   ├── AdminDashboard.jsx
│   ├── ManageProducts.jsx
│   └── ManageOrders.jsx
│
├── auth/
│   ├── AuthContext.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Profile.jsx
│
├── components/
│   ├── Navbar.jsx
│   └── ProductCard.jsx
│
├── pages/
│   ├── Products.jsx
│   ├── ProductDetails.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── OrderSuccess.jsx
│
├── products.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hamzehalmomani03/ecommerce-ui.git
```

### 2. Navigate to the project folder

```bash
cd ecommerce-ui
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔑 Demo Admin Account

The project includes a simple demo role system.

Use the following account to access the Admin Dashboard:

```text
Email: admin@test.com
Password: 123456
```

After logging in, the Admin Dashboard is available at:

```text
/admin
```

---

## 💾 Data Persistence

This project uses the browser's **Local Storage** to persist application data.

The following data can be stored locally:

```text
cart
registeredUser
user
adminProducts
orders
```

This allows cart items, users, products, and orders to remain available after refreshing the page.

> Note: This project is a frontend application. Local Storage is used for demonstration purposes and is not intended to replace a production database or authentication system.

---

## 🛒 Main Routes

| Route             | Description        |
| ----------------- | ------------------ |
| `/`               | Products page      |
| `/products`       | Products page      |
| `/products/:id`   | Product details    |
| `/cart`           | Shopping cart      |
| `/checkout`       | Checkout           |
| `/order-success`  | Order confirmation |
| `/login`          | Login              |
| `/register`       | Registration       |
| `/profile`        | User profile       |
| `/admin`          | Admin dashboard    |
| `/admin/products` | Product management |
| `/admin/orders`   | Order management   |

---

## 📱 Responsive Design

The application is designed to work across different screen sizes, including:

* Desktop
* Tablet
* Mobile

Responsive layouts are implemented using CSS media queries.

---

## 🎯 Project Goals

The main goals of this project are to demonstrate practical React development skills, including:

* Component-based architecture
* React state management
* React Hooks
* React Router
* Form handling
* Conditional rendering
* Data filtering
* Local Storage
* CRUD operations
* Role-based UI access
* Responsive UI development

---

## 🔮 Future Improvements

Possible future improvements include:

* Connect the application to a real backend API
* Add PostgreSQL or another database
* Implement JWT authentication
* Add real user accounts
* Add product categories
* Add product stock management
* Add order search and filtering
* Add online payment integration
* Add image upload functionality
* Add loading and error states
* Deploy the application to a production environment

---

## 👨‍💻 Author

**Hamzeh Ahmad Redwan Almomani**

Software Engineering Student
Zarqa University, Jordan

GitHub:
https://github.com/hamzehalmomani03

---

## 📄 License

This project was created for educational and portfolio purposes.
