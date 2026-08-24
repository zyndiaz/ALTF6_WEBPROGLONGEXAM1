# ALTF6_WEBPROGLONGEXAM1

## Bulldogs Exchange

Bulldogs Exchange is a full-stack web application for browsing and ordering National University merchandise. It was developed for the CTADWEBL Long Exam 1 requirement on frontend-backend integration. The application connects a React client to an Express REST API and stores application data in MongoDB Atlas.

The project demonstrates how a modern web application manages customer and administrator access through JWT authentication and role-based access control. It replaces the original static product content with data requested from the backend API.

## System discussion

Customers can create an account, sign in, browse products, search products by name, filter products by category, view product reviews, add products to a cart, place an order, and view ongoing orders. Customers can also create reviews, edit their profile information, change their password, and log out securely.

Administrators have a separate protected dashboard. An administrator can create, view, and edit products; confirm customer orders; mark orders as ready for claiming; view and edit reviews; and manage user accounts by setting them active or inactive. A customer cannot access the administrator dashboard because access is checked by both the frontend protected routes and the backend authorization middleware.

The frontend sends requests to the backend using a shared API service. After successful login or registration, the backend returns a JSON Web Token. The client stores the token for the active session and attaches it to protected requests through the Authorization header. The backend verifies the token before allowing access to profile, order, review, product-management, and user-management actions.

The backend uses MongoDB Atlas to store users, products, orders, and reviews. Input validation is applied to important fields such as email addresses, passwords, product prices, stock quantities, review ratings, and order quantities. The application returns readable messages for authentication failures, authorization failures, validation errors, unavailable records, and server errors.

## Technologies used

- React and Vite for the frontend user interface
- React Router for page navigation and protected routes
- Tailwind CSS for styling
- Express for the REST API
- MongoDB Atlas and Mongoose for database storage
- JSON Web Tokens for authentication
- bcryptjs for password hashing

## Project structure

```text
src/                 React frontend source files
backend/src/         Express API, models, routes, and middleware
backend/.env         Backend environment variables and MongoDB connection
.env                 Frontend API URL configuration
```

## Running the project

Create `backend/.env` from `backend/.env.example` and provide the MongoDB Atlas connection string, JWT secret, and administrator details. Create a client `.env` file with the API URL.

```env
VITE_API_URL=http://localhost:5000/api
```

Start the backend in one terminal:

```powershell
cd backend
npm install
npm run dev
```

Start the frontend in a second terminal:

```powershell
npm install
npm run dev
```

Open `http://localhost:5177` in a browser. Environment files are excluded from Git because they contain local configuration and confidential credentials.
