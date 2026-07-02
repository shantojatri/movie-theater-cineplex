# Movie Ticket Booking Application

A comprehensive movie ticket booking system featuring a modern, responsive frontend and a robust, high-performance backend API.

## 🚀 Project Overview

This project is divided into two main components:

1. **Frontend (`movie-ticket`)**: A dynamic, interactive user interface built with Vue 3, Vite, and TailwindCSS. It allows users to browse movies, select theaters, book seats, and generate digital tickets with QR codes.
2. **Backend (`movie-ticket-backend`)**: A RESTful API built with Go, the Gin framework, and PostgreSQL (via GORM). It handles user authentication, movie/theater data management, seat availability, and secure ticket booking.
3. **Design**: [Google Stitch](https://stitch.withgoogle.com/projects/14499164830273399860)

## 🛠️ Technology Stack

### Frontend

- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Routing**: Vue Router
- **PDF Generation & QR Codes**: `html2canvas`, `html2pdf.js`, `jspdf`, `qrcode`

### Backend

- **Language**: [Go (Golang)](https://go.dev/) (v1.25+)
- **Web Framework**: [Gin](https://gin-gonic.com/)
- **ORM & Database**: [GORM](https://gorm.io/) with PostgreSQL driver
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: `godotenv`

## 📋 Prerequisites

To run this project locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Go](https://go.dev/dl/) (v1.22+ recommended)
- [PostgreSQL](https://www.postgresql.org/) (Ensure your local database is running and accessible)

## 💻 Running the Application

### 1. Starting the Backend

The backend serves as the core API and needs to run on port `8080`.

1. Navigate to the backend directory:
   ```bash
   cd movie-ticket-backend
   ```
2. Install Go dependencies:
   ```bash
   go mod tidy
   ```
3. Set up your environment variables (ensure your `.env` file contains your database configuration).
4. Run the Go server:
   ```bash
   go run cmd/api/main.go
   ```
   _The backend should now be running at `http://localhost:8080`._

### 2. Starting the Frontend

The frontend provides the user interface and connects to the backend API.

1. Open a new terminal window/tab from the root directory.
2. Navigate to the frontend directory:
   ```bash
   cd movie-ticket
   ```
3. Install Node.js dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   _The frontend should now be running at the local address provided by Vite (e.g., `http://localhost:5173`)._

## 📖 Guidelines & Best Practices

- **Environment Variables**: Ensure both frontend and backend configurations are correctly set up before starting the servers. The backend needs the PostgreSQL database connection string, and the frontend expects the backend to be running on `localhost:8080`.
- **Database Migrations**: The backend utilizes GORM auto-migrations. Upon starting the backend successfully, the required tables (Users, Movies, Theaters, Tickets, etc.) will be automatically synchronized with your PostgreSQL database.
- **Development Workflow**:
  - When making changes to the **Go backend**, you must restart the server manually to see changes (or use a tool like [Air](https://github.com/cosmtrek/air) for live reloading).
  - The **Vue frontend** utilizes Vite's Hot Module Replacement (HMR) and will reflect UI changes instantly upon saving.
