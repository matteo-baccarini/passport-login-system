# Passport Login System

A Node.js authentication web application built with Express and Passport.js, featuring user registration, login, and session management with bcrypt password hashing.

## Features

- User registration with name, email, and password
- Secure password hashing using bcrypt
- Session-based authentication via Passport.js (local strategy)
- Flash messages for login errors
- Route protection (authenticated and unauthenticated guards)
- Logout functionality using method-override for DELETE requests
- EJS templating engine for server-side rendered views

## Tech Stack

- **Runtime:** Node.js (>= 18)
- **Framework:** Express 5
- **Authentication:** Passport.js + passport-local
- **Templating:** EJS
- **Password Hashing:** bcrypt
- **Session Management:** express-session
- **Dev Tools:** nodemon, dotenv

## Project Structure

```
passport-login-system/
├── server.js             # Main application entry point
├── passport-config.js    # Passport local strategy configuration
├── views/
│   ├── index.ejs         # Home page (authenticated users only)
│   ├── login.ejs         # Login page
│   └── register.ejs      # Registration page
├── .env                  # Environment variables (not committed)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/matteo-baccarini/passport-login-system.git
   cd passport-login-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   SESSION_SECRET=your_secret_key_here
   ```

4. Start the development server:
   ```bash
   npm run devStart
   ```

The app will be running at `http://localhost:3000`.

## Routes

| Method | Route       | Description                              | Access              |
|--------|-------------|------------------------------------------|---------------------|
| GET    | `/`         | Home page — displays logged-in username  | Authenticated only  |
| GET    | `/login`    | Login form                               | Unauthenticated only|
| POST   | `/login`    | Handles login form submission            | Unauthenticated only|
| GET    | `/register` | Registration form                        | Unauthenticated only|
| POST   | `/register` | Handles registration form submission     | Unauthenticated only|
| DELETE | `/logout`   | Logs the user out and redirects to login | Any                 |

## Notes

- User data is stored **in-memory** (the `users` array in `server.js`). All users are lost when the server restarts. For a production app, replace this with a database.
- The `.env` file is required for the `SESSION_SECRET` variable. Without it, sessions will not work.
- The logout route uses a `DELETE` method via the `method-override` middleware, submitted as a POST form with `?_method=DELETE`.
