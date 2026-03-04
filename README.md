<img width="1906" height="871" alt="image" src="https://github.com/user-attachments/assets/a4579206-d4bc-4c02-91ab-3162a212e747" />

# MERN Stack eCommerce Website

A full-stack eCommerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This project includes user shopping features, secure payment integration, and a complete admin dashboard.


## Tech Stack

### Frontend
- React JS
- Context API / State Management
- Axios
- Tailwind CSS (if used)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Payment Gateways
- Stripe
- Cash on Delivery


## User Features

- Browse products
- Filter and sort products
- Select product variants (e.g., size)
- Add to cart
- Place orders
- Secure online payments (Stripe)
- Cash on Delivery option
- Order confirmation system


## Admin Dashboard Features

- Add new products
- Upload product images
- Delete products
- View all products
- Manage orders


## Database

All data including:
- Users
- Products
- Orders

are stored securely in MongoDB.


## Installation & Setup

### 1️ Clone the repository

```bash
git clone https://github.com/hafsa2022/Ecommerce_App.git
```

### 2 Install dependencies
#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
npm install
npm run server
```

### 3️ Environment Variables
Create a .env file in backend folder:

```bash
PORT=port
MONGODB_URI=your_mongodb_connection
STRIPE_SECRET_KEY=your_stripe_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
CLOUDINARY_API_KEY=your_cloudinary_api_key
JWT_SECRET=your_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_paaword
