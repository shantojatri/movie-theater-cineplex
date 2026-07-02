package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/shantojatri/movie-ticket-backend/config"
	"github.com/shantojatri/movie-ticket-backend/http/handlers"
	"github.com/shantojatri/movie-ticket-backend/http/middleware"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	config.ConnectDatabase()

	r := gin.Default()

	// CORS middleware could go here
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", handlers.Register)
			auth.POST("/login", handlers.Login)
		}

		// Public routes
		public := api.Group("/")
		{
			public.GET("/movies", handlers.GetMovies)
			public.GET("/movies/:id", handlers.GetMovieByID)
			public.GET("/theaters", handlers.GetTheaters)
			public.GET("/seats/booked", handlers.GetBookedSeats)
		}

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.POST("/movies", handlers.CreateMovie) // Admin usually

			protected.GET("/tickets", handlers.GetTickets)
			protected.POST("/tickets/book", handlers.BookTicket)
			protected.POST("/tickets/:id/scan", handlers.ScanTicket)

			protected.POST("/theaters/:id/favorite", handlers.ToggleFavoriteTheater)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on port %s", port)
	r.Run(":" + port)
}
