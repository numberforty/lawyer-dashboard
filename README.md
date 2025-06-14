# Lawyer Dashboard

A simple MERN stack demonstration for managing legal cases.

## Requirements
- Node.js >=20
- MongoDB instance (Docker compose is provided)

## Setup
1. Create a `.env` file inside the `api` folder using `.env.example` as a template:
   ```ini
   MONGO_URI=mongodb://localhost:27017/lawyer
   JWT_SECRET=changeme
   ```
2. Install dependencies:
   ```bash
   npm install --prefix api
   npm install --prefix web
   ```
3. Start MongoDB (using Docker):
   ```bash
   docker-compose up -d
   ```
4. Seed a demo account and start the API server:
   ```bash
   npm run seed --prefix api
   npm run dev --prefix api
   ```
   The seeded credentials are:
   - **Email:** `demo@example.com`
   - **Password:** `password123`
5. Start the React client:
   ```bash
   npm run dev --prefix web
   ```
   Visit `http://localhost:5173` in your browser.

## Project Structure
- `api/` – Express + MongoDB backend
- `web/` – React frontend built with Vite and Tailwind CSS
