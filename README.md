# MERN Stack DevPortfolio Website

A modern, responsive, premium Developer Portfolio built using React, JavaScript, Bootstrap, Node.js, Express.js, and MongoDB. It features light/dark modes, smooth scrolling, filtering/searching of projects, and a fully featured, protected Admin Dashboard.

## Features

- **Responsive Design**: Optimised for mobile, tablet, and desktop layouts.
- **Dark & Light Mode**: Accessible toggle with choice persistence in localStorage.
- **Admin Dashboard**: Manage (Create, Read, Update, Delete) Projects and Skills, and view/delete Contact Messages.
- **JWT Authentication**: Password encryption via bcryptjs and session tokens stored in localStorage.
- **File Uploads**: Supports local file uploads for project preview images via Multer.
- **Email Alerts**: Automatic email notifications sent to your inbox on form submission via Nodemailer.
- **Prepopulated Seeding**: Seeder scripts to load high-quality mock data immediately.

---

## Folder Structure

```
portfolio/
├── client/           # React frontend using Vite and React-Bootstrap
└── server/           # Express backend using Mongoose ODM
```

---

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) installed locally.
- [MongoDB](https://www.mongodb.com/try/download/community) server running locally or a MongoDB Atlas URI link.

### 1. Project Initialization

In the root directory, install all required dependencies for the root, frontend, and backend with a single command:

```bash
npm run install-all
```

### 2. Configure Environment Variables

Create a file named `.env` in the root folder (or modify the preloaded `.env` file) with your database, authentication, and email configs:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=supersecretportfoliojwtkey12345!
JWT_EXPIRES_IN=7d

# Default Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminpassword123

# Email Configurations (Nodemailer setup)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CONTACT_RECEIVER_EMAIL=your-email@gmail.com
```

### 3. Seed Mock Data (Optional)

To start with preloaded projects and skills, run the seed script:

```bash
npm run seed
```

---

## Running the Application

To run both the server and client concurrently in development mode:

```bash
npm run dev
```

- **Frontend Application**: Running on [http://localhost:3000](http://localhost:3000)
- **Backend API Server**: Running on [http://localhost:5000](http://localhost:5000)

Log in to the Admin Dashboard by clicking the **Login** link in the navbar using the credentials:
- **Username**: `admin`
- **Password**: `adminpassword123` *(or your custom configured value in `.env`)*
