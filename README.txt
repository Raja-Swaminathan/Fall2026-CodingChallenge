IMAGE SAVING/SHARING APP
Change++ Coding Challenge 2026


NAME AND EMAIL (fill these in before submitting)
Full Name: Raja Gopalan Swaminathan
Vanderbilt Email: raja.g.swaminathan@vanderbilt.edu


WHAT THIS IS
This is the Pinterest style app built for the Fall 2026 Developer Change++ challenge. It 
is an app in which a user can make boards (collections) with images and and view other people's boards as well.


TECH STACK
Frontend: React (Vite) + JavaScript, React Router for page navigation
Backend:  Node.js + Express (JavaScript), RESTful API
Database: MongoDB (hosted on MongoDB Atlas), via Mongoose
Images:   Pixabay API (called from the backend, so the API key is
          never exposed to the browser)

PROJECT STRUCTURE
image-app/
  backend/      <- Express API server (runs on port 5000)
    src/
      server.js         entry point
      db/                MongoDB connection
      models/            Mongoose schemas (Collection, Image)
      controllers/       route logic
      routes/            URL -> controller wiring
  frontend/     <- React app (runs on port 5173)
    src/
      api/               functions that call the backend
      components/        reusable UI pieces
      pages/             one component per route/page


HOW TO RUN THIS PROJECT
Prerequisites: Node.js installed (v18 or newer), a MongoDB Atlas
account with a cluster set up, and a Pixabay API key.

1. BACKEND SETUP
   cd backend
   npm install
   Copy .env.example to a new file named .env, and fill in:
     MONGODB_URI      - your MongoDB Atlas connection string
     PIXABAY_API_KEY  - your Pixabay API key
     PORT             - leave as 5000
   npm start
   You should see "Connected to MongoDB Atlas" and
   "Backend server running at http://localhost:5000"

2. FRONTEND SETUP (in a separate terminal, leave the backend running)
   cd frontend
   npm install
   npm run dev
   Open the printed URL (http://localhost:5173) in your browser.

Both servers must be running at the same time for the app to work.


API ENDPOINTS (backend)
GET    /api/collections                       list all collections
POST   /api/collections                        create a collection
GET    /api/collections/:id                    get one collection
DELETE /api/collections/:id                     delete a collection
GET    /api/collections/shared/:token           get a collection by its share link
GET    /api/collections/:id/images              list images in a collection
POST   /api/collections/:id/images              save an image to a collection
PUT    /api/images/:id                          edit an image's note
DELETE /api/images/:id                          remove an image
GET    /api/search?q=QUERY                      search Pixabay for images

REFLECTION

This challenge taught me mainly how to use MongoDB Atlas, the cloud storing database functionality that I
am not familiar with using at all. While building the app I dealt with many errors involving the .env and
not being able to fetch the API key as well as some typo issues with the database cluster username and password. Another thing 
I learnt while making this project was the importance of clearing background tasks when testing an application. As old 
server commands were ran in the background and led to many errors when I was testing the app with new code.


