# Spiral Sounds - Online Vinyl Store

![Spiral Sounds Preview](./public/images/preview.png)

A modern web application for browsing and purchasing vinyl records. Built with Node.js, Express, and SQLite.

## Features

- **Product Browsing** - Browse a curated collection of vinyl records
- **Search Functionality** - Search by title, artist, or genre
- **Genre Filtering** - Filter records by music genre
- **Stock Management** - Track available inventory for each record
- **User Authentication** - Register and log in with username/password
- **Shopping Cart** - Add vinyl records to your cart and manage quantities
- **Session Management** - Secure sessions with HTTP-only cookies
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: bcryptjs for password hashing, express-session for session management
- **Validation**: validator.js for email and input validation
- **Development**: Nodemon (auto-reload)

## Project Structure

```
├── server.js                  # Express server entry point
├── package.json              # Project dependencies
├── .env                      # Environment variables
├── database.db               # SQLite database (auto-generated)
│
├── /controllers
│   ├── productsControllers.js # Product API logic
│   ├── authController.js      # User registration & login logic
│   ├── cartController.js      # Shopping cart logic
│   └── meController.js        # User profile logic
├── /routes
│   ├── products.js           # Product endpoints
│   ├── auth.js               # Auth endpoints
│   ├── cart.js               # Cart endpoints
│   └── me.js                 # User profile endpoints
├── /middleware
│   └── requireAuth.js        # Authentication middleware
├── /db
│   └── db.js                 # Database connection utility
│
├── data.js                   # Seed data for vinyl records
├── seedTable.js              # Database population script
│
├── /sql
│   ├── createTable.js        # Create products table
│   ├── createUserTable.js    # Create users table
│   └── createCartTable.js    # Create cart_items table
│
└── /public
    ├── index.html            # Main client page
    ├── index.css             # Styling
    ├── /js
    │   ├── index.js          # Main page logic
    │   ├── productService.js # Product API calls
    │   ├── productUI.js      # Product display logic
    │   ├── cartService.js    # Cart API calls
    │   ├── cart.js           # Cart UI logic
    │   ├── authUI.js         # Auth form UI
    │   ├── login.js          # Login logic
    │   ├── signup.js         # Signup logic
    │   ├── logout.js         # Logout logic
    │   └── menu.js           # Navigation menu logic
    ├── /images               # Album artwork
    ├── login.html            # Login page
    └── signup.html           # Signup page
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Namdo2465/Vinyl_Store.git
   cd Vinyl_Store
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root:
   ```
   SPIRAL_SESSION_SECRET=your_secret_key_here
   ```

4. **Set up the database** (one-time setup)
   ```bash
   node sql/createTable.js
   node sql/createUserTable.js
   node sql/createCartTable.js
   node seedTable.js
   ```

## Usage

### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start on `http://localhost:8000`

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:8000`

## API Endpoints

### Authentication

**Register User**
```
POST /api/auth/register
```
Creates a new user account.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "password123"
}
```

**Login**
```
POST /api/auth/login
```
Logs in a user and creates a session.

**Body:**
```json
{
  "username": "johndoe",
  "password": "password123"
}
```

**Logout**
```
POST /api/auth/logout
```
Destroys the user session.

### Products

**Get All Products**
```
GET /api/products
```
Returns all products or filtered results based on query parameters.

**Query Parameters:**
- `search` - Search by title, artist, or genre (case-insensitive)
- `genre` - Filter by exact genre match

**Examples:**
```
GET /api/products?search=rock
GET /api/products?genre=indie
GET /api/products?search=silver&genre=indie
```

**Get All Genres**
```
GET /api/products/genres
```
Returns an array of all available music genres in the database.

### Shopping Cart

**Add to Cart** (Requires authentication)
```
POST /api/cart/add
```

**Body:**
```json
{
  "productId": 5
}
```

**Get Cart Count** (Requires authentication)
```
GET /api/cart/cart-count
```
Returns total number of items in the user's cart.

**Get Cart Items** (Requires authentication)
```
GET /api/cart
```
Returns all items in the user's cart with product details.

**Delete Cart Item** (Requires authentication)
```
DELETE /api/cart/:itemId
```
Removes a specific item from the cart.

**Clear Cart** (Requires authentication)
```
DELETE /api/cart/all
```
Removes all items from the user's cart.

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  price REAL NOT NULL,
  image TEXT NOT NULL,
  year INTEGER,
  genre TEXT,
  stock INTEGER
)
```

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
)
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with auto-reload |
| `node sql/createTable.js` | Create the products database table |
| `node sql/createUserTable.js` | Create the users database table |
| `node sql/createCartTable.js` | Create the cart_items database table |
| `node seedTable.js` | Populate database with seed data |

## Dependencies

- **express** - Web framework for Node.js
- **sqlite3** - SQLite database driver
- **sqlite** - Promise-based SQLite wrapper
- **express-session** - Session management middleware
- **bcryptjs** - Password hashing library
- **validator** - Data validation library
- **dotenv** - Environment variable management
- **nodemon** (dev) - Auto-reload development tool

## Future Enhancements

- Add order history and tracking
- Integrate payment processing (Stripe, PayPal)
- Add product reviews and ratings
- Implement wishlist functionality
- Add email notifications
- Create admin dashboard for inventory management

## License

ISC

## Author

Nam Do
