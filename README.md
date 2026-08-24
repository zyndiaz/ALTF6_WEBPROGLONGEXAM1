# ALTF6_WEBPROGLONGEXAM1

Bulldogs Exchange is a full-stack long-exam project with a React/Vite frontend and an Express/MongoDB backend.

## Run locally

1. Configure `backend/.env` from `backend/.env.example` with your MongoDB Atlas URI and JWT secret.
2. Configure the client `.env` with `VITE_API_URL=http://localhost:5000/api`.
3. Start the backend:

   ```powershell
   cd backend
   npm install
   npm run dev
   ```

4. In a second terminal, start the client:

   ```powershell
   npm install
   npm run dev
   ```

The client opens at `http://localhost:5177`.

Never commit `.env` files or MongoDB credentials.
