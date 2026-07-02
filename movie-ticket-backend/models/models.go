package models

import (
	"time"

	"gorm.io/gorm"
)

type UserFavoriteTheater struct {
	gorm.Model
	UserID    uint   `gorm:"uniqueIndex:idx_user_theater" json:"userId"`
	TheaterID string `gorm:"uniqueIndex:idx_user_theater" json:"theaterId"`
}

type User struct {
	gorm.Model
	Name     string   `json:"name"`
	Email    string   `gorm:"uniqueIndex" json:"email"`
	Password string   `json:"-"`
	Role     string   `json:"role" gorm:"default:'user'"`
	Tickets  []Ticket `json:"tickets,omitempty"`
}

type Movie struct {
	gorm.Model
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Genre       string   `json:"genre"`
	Status      string   `json:"status"` // "In Theaters", "Streaming", "Coming Soon"
	Rating      float64  `json:"rating"`
	Duration    string   `json:"duration"`
	ImageURL    string   `json:"imageUrl"`
	TrailerURL  string   `json:"trailerUrl"`
	Year        int      `json:"year"`
	Tickets     []Ticket `json:"tickets,omitempty"`
}

type Ticket struct {
	gorm.Model
	UserID  uint      `json:"userId"`
	MovieID uint      `json:"movieId"`
	Movie   *Movie    `json:"movie,omitempty"`
	TheaterID string  `json:"theaterId"`
	Price   float64   `json:"price"`
	ShowTime time.Time `json:"showTime"`
	SeatNumber string `json:"seatNumber"`
	Status  string    `json:"status" gorm:"default:'booked'"` // booked, cancelled
}
