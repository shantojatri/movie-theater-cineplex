package config

import (
	"log"
	"os"

	"github.com/shantojatri/movie-ticket-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=movie_ticket port=5432 sslmode=disable TimeZone=UTC"
	}

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database!", err)
	}

	err = database.AutoMigrate(&models.User{}, &models.Movie{}, &models.Ticket{}, &models.UserFavoriteTheater{})
	if err != nil {
		log.Fatal("Failed to migrate database!", err)
	}

	DB = database
	log.Println("Database connection established")
}
