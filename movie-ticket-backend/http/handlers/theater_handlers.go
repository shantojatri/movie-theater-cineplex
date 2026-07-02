package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shantojatri/movie-ticket-backend/config"
	"github.com/shantojatri/movie-ticket-backend/models"
	"github.com/shantojatri/movie-ticket-backend/utils"
)


type Showtime struct {
	Time      string  `json:"time"`
	Price     float64 `json:"price"`
	Available bool    `json:"available"`
}

type Experience struct {
	Type      string     `json:"type"`
	Details   string     `json:"details"`
	Showtimes []Showtime `json:"showtimes"`
}

type Theater struct {
	TheaterID  string       `json:"theaterId"`
	Name       string       `json:"name"`
	Address    string       `json:"address"`
	Distance   string       `json:"distance"`
	IsFavorite bool         `json:"isFavorite"`
	Verified   bool         `json:"verified"`
	Experience []Experience `json:"experience"`
}

var TheatersData = []Theater{
	{
		TheaterID:  "amc-metreon-16",
		Name:       "AMC Metreon 16",
		Address:    "135 4th St, San Francisco, CA 94103",
		Distance:   "0.8 miles",
		IsFavorite: false,
		Verified:   true,
		Experience: []Experience{
			{
				Type:    "IMAX 70MM",
				Details: "Laser projection + Reserved Seating",
				Showtimes: []Showtime{
					{Time: "11:30 AM", Price: 22.5, Available: true},
					{Time: "03:15 PM", Price: 22.5, Available: true},
					{Time: "07:00 PM", Price: 24.0, Available: true},
					{Time: "10:45 PM", Price: 0, Available: false},
				},
			},
			{
				Type:    "STANDARD",
				Details: "Digital + Recliner Seats",
				Showtimes: []Showtime{
					{Time: "12:45 PM", Price: 16.5, Available: true},
					{Time: "04:30 PM", Price: 16.5, Available: true},
					{Time: "08:15 PM", Price: 18.0, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "regal-stonestown",
		Name:       "Regal Stonestown Galleria",
		Address:    "3251 20th Ave, San Francisco, CA 94132",
		Distance:   "4.2 miles",
		IsFavorite: false,
		Verified:   false,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "Digital 4K + Recliner Seats",
				Showtimes: []Showtime{
					{Time: "01:00 PM", Price: 15.0, Available: true},
					{Time: "05:15 PM", Price: 15.0, Available: true},
					{Time: "09:30 PM", Price: 17.5, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "amc-kabuki-8",
		Name:       "AMC Kabuki 8",
		Address:    "1881 Post St, San Francisco, CA 94115",
		Distance:   "1.5 miles",
		IsFavorite: false,
		Verified:   false,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "Luxury Loungers + Dine-in",
				Showtimes: []Showtime{
					{Time: "02:00 PM", Price: 18.5, Available: true},
					{Time: "06:30 PM", Price: 20.0, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "alamo-drafthouse-mission",
		Name:       "Alamo Drafthouse New Mission",
		Address:    "2550 Mission St, San Francisco, CA 94110",
		Distance:   "2.1 miles",
		IsFavorite: false,
		Verified:   false,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "4K Laser + Full Service Dining",
				Showtimes: []Showtime{
					{Time: "04:00 PM", Price: 19.0, Available: true},
					{Time: "07:30 PM", Price: 19.0, Available: true},
					{Time: "10:15 PM", Price: 19.0, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "century-san-francisco-centre",
		Name:       "Century San Francisco Centre 9",
		Address:    "865 Market St, San Francisco, CA 94103",
		Distance:   "0.5 miles",
		IsFavorite: false,
		Verified:   true,
		Experience: []Experience{
			{
				Type:    "XD",
				Details: "Cinemark XD + Luxury Loungers",
				Showtimes: []Showtime{
					{Time: "12:00 PM", Price: 21.0, Available: true},
					{Time: "05:00 PM", Price: 21.0, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "presidio-theatre",
		Name:       "Presidio Theatre",
		Address:    "2340 Chestnut St, San Francisco, CA 94123",
		Distance:   "3.2 miles",
		IsFavorite: false,
		Verified:   false,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "Historic Atmosphere",
				Showtimes: []Showtime{
					{Time: "01:15 PM", Price: 14.5, Available: true},
					{Time: "04:45 PM", Price: 14.5, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "landmark-opera-plaza",
		Name:       "Landmark Opera Plaza",
		Address:    "601 Van Ness Ave, San Francisco, CA 94102",
		Distance:   "1.2 miles",
		IsFavorite: false,
		Verified:   false,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "Art House Choice",
				Showtimes: []Showtime{
					{Time: "03:00 PM", Price: 16.0, Available: true},
					{Time: "08:00 PM", Price: 16.0, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "roxie-theater",
		Name:       "The Roxie Theater",
		Address:    "3117 16th St, San Francisco, CA 94103",
		Distance:   "1.9 miles",
		IsFavorite: false,
		Verified:   true,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "Indie Screening Room",
				Showtimes: []Showtime{
					{Time: "05:30 PM", Price: 13.0, Available: true},
					{Time: "09:00 PM", Price: 13.0, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "vogue-theatre",
		Name:       "Vogue Theatre",
		Address:    "3290 Sacramento St, San Francisco, CA 94115",
		Distance:   "2.8 miles",
		IsFavorite: false,
		Verified:   false,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "Classic Single Screen",
				Showtimes: []Showtime{
					{Time: "07:15 PM", Price: 15.0, Available: true},
				},
			},
		},
	},
	{
		TheaterID:  "balboa-theatre",
		Name:       "Balboa Theatre",
		Address:    "3630 Balboa St, San Francisco, CA 94121",
		Distance:   "5.5 miles",
		IsFavorite: false,
		Verified:   false,
		Experience: []Experience{
			{
				Type:    "STANDARD",
				Details: "Neighborhood Favorite",
				Showtimes: []Showtime{
					{Time: "02:30 PM", Price: 14.0, Available: true},
					{Time: "07:45 PM", Price: 14.0, Available: true},
				},
			},
		},
	},
}

func GetTheaters(c *gin.Context) {
	// Make a deep copy of TheatersData so we can mutate isFavorite per request
	theaters := make([]Theater, len(TheatersData))
	copy(theaters, TheatersData)
	for i, t := range TheatersData {
		exp := make([]Experience, len(t.Experience))
		copy(exp, t.Experience)
		theaters[i].Experience = exp
	}

	// Optionally annotate isFavorite for authenticated users
	authHeader := c.GetHeader("Authorization")
	if authHeader != "" {
		parts := strings.Split(authHeader, " ")
		if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
			if claims, err := utils.ValidateToken(parts[1]); err == nil {
				var favorites []models.UserFavoriteTheater
				config.DB.Where("user_id = ?", claims.UserID).Find(&favorites)
				favSet := make(map[string]bool, len(favorites))
				for _, f := range favorites {
					favSet[f.TheaterID] = true
				}
				for i := range theaters {
					theaters[i].IsFavorite = favSet[theaters[i].TheaterID]
				}
			}
		}
	}

	c.JSON(http.StatusOK, theaters)
}

// ToggleFavoriteTheater toggles a theater favorite for the authenticated user.
// POST /api/theaters/:id/favorite
func ToggleFavoriteTheater(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	theaterID := c.Param("id")

	var fav models.UserFavoriteTheater
	result := config.DB.Where("user_id = ? AND theater_id = ?", userID, theaterID).First(&fav)

	if result.Error != nil {
		// Not favorited yet — add it
		newFav := models.UserFavoriteTheater{UserID: userID.(uint), TheaterID: theaterID}
		if err := config.DB.Create(&newFav).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add favorite"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"isFavorite": true, "theaterId": theaterID})
		return
	}

	// Already favorited — remove it
	if err := config.DB.Delete(&fav).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove favorite"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"isFavorite": false, "theaterId": theaterID})
}


func GetBookedSeats(c *gin.Context) {
	movieID := c.Query("movieId")
	theaterID := c.Query("theaterId")
	showTimeStr := c.Query("showTime")

	fmt.Printf("GetBookedSeats -> MovieID: %s, TheaterID: %s, showTime: %s\n", movieID, theaterID, showTimeStr)

	if movieID == "" || theaterID == "" || showTimeStr == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "movieId, theaterId, and showTime are required"})
		return
	}

	showTime, err := time.Parse(time.RFC3339, showTimeStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid showTime format. Please use ISO 8601 / RFC3339"})
		return
	}

	var tickets []models.Ticket
	if result := config.DB.Where("movie_id = ? AND theater_id = ? AND show_time = ? AND status = ?", movieID, theaterID, showTime, "booked").Find(&tickets); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch booked seats"})
		return
	}

	var seatNumbers []string
	for _, ticket := range tickets {
		seats := strings.Split(ticket.SeatNumber, ",")
		for _, s := range seats {
			seatNumbers = append(seatNumbers, strings.TrimSpace(s))
		}
	}

	c.JSON(http.StatusOK, gin.H{"bookedSeats": seatNumbers})
}
