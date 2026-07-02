package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shantojatri/movie-ticket-backend/config"
	"github.com/shantojatri/movie-ticket-backend/models"
)

func GetMovies(c *gin.Context) {
	var movies []models.Movie
	if result := config.DB.Find(&movies); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch movies"})
		return
	}

	c.JSON(http.StatusOK, movies)
}

func GetMovieByID(c *gin.Context) {
	id := c.Param("id")
	var movie models.Movie
	
	if result := config.DB.First(&movie, id); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
		return
	}

	c.JSON(http.StatusOK, movie)
}

func CreateMovie(c *gin.Context) {
	// Usually restricted to Admin roll (via middleware)
	var movie models.Movie
	if err := c.ShouldBindJSON(&movie); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if result := config.DB.Create(&movie); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create movie"})
		return
	}

	c.JSON(http.StatusCreated, movie)
}

func GetTickets(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var tickets []models.Ticket
	if result := config.DB.Preload("Movie").Where("user_id = ?", userID).Order("id desc").Find(&tickets); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch tickets"})
		return
	}

	// Dynamic expiration check
	now := time.Now()
	for i, ticket := range tickets {
		if ticket.Status == "booked" && now.After(ticket.ShowTime) {
			ticket.Status = "expired"
			config.DB.Save(&ticket)
			tickets[i] = ticket
		}
	}

	c.JSON(http.StatusOK, tickets)
}

func ScanTicket(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	ticketID := c.Param("id")

	var ticket models.Ticket
	if result := config.DB.Where("id = ? AND user_id = ?", ticketID, userID).First(&ticket); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Ticket not found or unauthorized"})
		return
	}

	if ticket.Status == "expired" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot scan an expired ticket"})
		return
	}

	if ticket.Status == "watched" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Ticket has already been scanned"})
		return
	}

	ticket.Status = "watched"
	if result := config.DB.Save(&ticket); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update ticket status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Ticket successfully scanned", "ticket": ticket})
}

func BookTicket(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	var input models.Ticket
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	input.UserID = userID.(uint)
	input.Status = "booked"

	if input.TheaterID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "TheaterID is required"})
		return
	}

	if result := config.DB.Create(&input); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to book ticket"})
		return
	}

	// Fetch the newly created ticket with associated movie details
	config.DB.Preload("Movie").First(&input, input.ID)

	c.JSON(http.StatusCreated, input)
}
