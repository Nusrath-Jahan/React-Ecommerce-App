# 🛒 E‑Commerce Application

A modern, responsive e‑commerce web application built with **React**, **Material UI**, and **Redux**, featuring authentication, product browsing, shopping cart, and checkout flow. This project demonstrates a full frontend shopping experience integrated with a public product API and Firebase authentication.

---

## 📌 Overview

This application provides a complete online shopping interface where users can:

* Browse products by category
* Search for products
* View product details
* Add / remove items from cart
* Manage quantities
* Authenticate using email & password
* Proceed to checkout

The app is fully responsive and optimized for both desktop and mobile devices.

---

## ✨ Main Features

### 🛍 Product Browsing

* Fetches products dynamically from a public API
* Category‑based filtering
* Search bar with live filtering

### 🛒 Shopping Cart

* Add products to cart
* Increase / decrease quantity
* Remove items
* Sticky checkout summary
* Cart badge with item count

### 🔐 Authentication

* User signup & login using Firebase Authentication
* Protected routes for checkout

### 💳 Checkout

* Integrated Stripe payment flow (test environment)
* Order summary before payment

### 📱 Responsive Design

* Optimized layouts for desktop, tablet, and mobile
* Mobile drawer menu
* Floating cart button on small screens

---

## 🧰 Technologies Used

### Frontend

* **React** – UI framework
* **React Router DOM** – Routing
* **Redux Toolkit** – Global state management
* **Material UI (MUI)** – UI components & styling

### Backend / Services

* **Firebase Authentication** – User auth
* **Stripe** – Payment processing (test mode)
* **FakeStore API** – Product data source

### Tooling & Deployment

* **Axios** – API requests
* **Netlify** – Hosting & deployment
* **Create React App** – Project setup

---

## ⚙️ Project Setup (Local Development)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> ⚠️ These values come from your Firebase project settings.

---

### 4️⃣ Run the App Locally

```bash
npm start
```

App will be available at:

```
http://localhost:3000
```

---

## 🚀 Using the Application

### 🔎 Browsing Products

* Navigate to **Home** or **Shop**
* Filter by categories using chips or sidebar
* Use the search bar to find products

---

### 🛒 Adding Items to Cart

1. Click **Add** on a product card
2. Cart icon updates with item count
3. Go to **Cart** page from navbar

In Cart:

* Adjust quantity with + / - buttons
* Remove items
* View total price

---

### 🔐 Authentication

* Go to **Signup** to create an account
* Login using registered email & password
* Logged‑in users can proceed to checkout

---

### 💳 Checkout Process

1. From Cart, click **Checkout**
2. Review order summary
3. Complete payment via Stripe (test card)

> 💡 Use Stripe test cards for development

---

## 🔌 APIs & Data Sources

### Product API

**FakeStore API**

```
https://fakestoreapi.com/products
```

Used for:

* Product list
* Categories
* Product details

---

### Authentication

**Firebase Authentication**

* Email & password login
* Session persistence

---

### Payments

**Stripe API (Test Mode)**

* Secure checkout simulation
* Payment intent flow

---

## 🧪 Troubleshooting

### Build Fails on Netlify

If you see:

```
Treating warnings as errors because CI=true
```

Fix by:

* Removing unused imports
* Or add in Netlify environment variables:

```
CI = false
```

---

### Cart Not Opening

Ensure in `App.js`:

```jsx
<Route path="/cart" element={<Cart />} />
```

Navbar must link to `/cart`, not `/card`.

---

### Images Not Showing

* Check API response
* Ensure `objectFit: "contain"`
* Verify HTTPS image URLs

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

Please:

* Follow consistent coding style
* Test before submitting
* Add clear commit messages

---

## 📄 License

This project is open‑source and available under the **MIT License**.

---

## 🙌 Acknowledgements

* FakeStore API for product data
* Firebase for authentication
* Stripe for payment simulation
* Material UI for UI components

---

## 📬 Contact

For questions or suggestions:

* GitHub Issues
* Email: [nusrathjahan0204@gmail.com](mailto:nusrathjahan0204@gmail.com)

---

✨ Happy Coding & Shopping! ✨
