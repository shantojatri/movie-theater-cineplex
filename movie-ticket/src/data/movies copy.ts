export interface Showtime {
  time: string;
  price: number;
  available: boolean;
}

export interface Experience {
  type: string;
  details: string;
  showtimes: Showtime[];
}

export interface Theater {
  theaterId: string; // The new ID field
  name: string;
  address: string;
  distance: string;
  isFavorite: boolean;
  verified: boolean;
  experience: Experience[];
}

export interface Movie {
  id: string;
  title: string;
  description?: string;
  genre: string;
  status: "In Theaters" | "Streaming" | "Coming Soon";
  rating: number;
  duration: string;
  imageUrl: string;
  trailerUrl?: string;
  year: number;
  casts: string[];
  theaters?: string[]; // Added optional theaters array
}

export const featuredMovie: Movie = {
  id: "interstellar",
  title: "Interstellar",
  description:
    "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. A Christopher Nolan masterpiece returns to IMAX.",
  genre: "Sci-Fi, Adventure",
  status: "In Theaters",
  rating: 8.7,
  duration: "2h 49m",
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB9dbBtP21GonP7HHm4zwXLcSUdEoUIK5CpGjWYslguhMPFlx4zI0kjHm669bt4B3OcaEBH5IcJ-L35qdcopw8-LrqDg6bDFqp0aD1DEnvHxyTXlQqha0trxYVtZZjYhJX96U6HiCnnkBfYWpjILg21f099V2YhV3WO3fOpnz0TCYQDsfnFiAo7HL-4LNMZIBNS84i5-ULNklT6aG21AEP-1EvT7CbK27WCwGTcAQ1ljCnl3l1VxNvTEE-AWDy7_rulERXlcvBbTfra",
  trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
  year: 2014,
  casts: [
    "Matthew McConaughey",
    "Anne Hathaway",
    "Jessica Chastain",
    "Michael Caine",
    "Casey Affleck",
    "Matt Damon",
  ],
  theaters: ["century-san-francisco-centre", "landmark-opera-plaza"],
};

export const movies: Movie[] = [
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. He must choose between the love of his life and the fate of the universe.",
    genre: "Sci-Fi",
    status: "In Theaters",
    rating: 9.0,
    duration: "2h 46m",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEvzndLMLEvqqPMQKZOxk9tgpNcF3UHIN_jKtawbTJBoVyUNNybu5q5I3fYhb4RHWO3RLKvdE_QfaKZnI1iZ90sNEkkqrSapZyk2AGJXVMirgAUzYG2uSk-A1YCeugcPka9LK-p2fChRNhWcyUVGFnZjZQ7Y8qyb8jgrIM_TSBlE8FCgBsRL0w1ETfgJSpivY3Zz11v2w2MHdv-EJUjQGc-yWjJbOzf4zV8QNchLPL3i4bhSGmHyVIhGxIKfwoIyXlzYI8lSohD_Dc",
    year: 2024,
    casts: [
      "Timothée Chalamet",
      "Zendaya",
      "Rebecca Ferguson",
      "Josh Brolin",
      "Austin Butler",
      "Florence Pugh",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["century-san-francisco-centre", "landmark-opera-plaza"],
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    description:
      "The lives of J. Robert Oppenheimer and the scientists who worked on the Los Alamos Laboratory during the Manhattan Project.",
    genre: "Drama",
    status: "In Theaters",
    rating: 8.8,
    duration: "3h 0m",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGWBtAzWfn0mdpfbUOKw90tbKyZrbZengUxeHgJGp8Pshi5eTvekq3X_A2JdH1B3QM6jESeYAm-J3nGpmZp2zPT7DZ3neVk0F-EsaJNpSM2GkbPgRuA9njcUmcVsTRUOfG4ckp1NE0Ej_tlxSLc3Acx8sJBIpWK30NKgQZevGyONApVpGru4KtWulq5HtHHUOqQw_vDK1RD0trazvDNejDWx_a-LHixP9WQv3tOYCpV-q2w4s7eMcjo00FSv9KoLUA44VEGeb4Z-Wi",
    year: 2023,
    casts: [
      "Cillian Murphy",
      "Emily Blunt",
      "Matt Damon",
      "Robert Downey Jr.",
      "Florence Pugh",
      "Josh Hartnett",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["amc-metreon-16", "presidio-theatre", "balboa-theatre"],
  },
  {
    id: "the-batman",
    title: "The Batman",
    description:
      "Batman ventures into Gotham's underworld when a sadistic killer leaves behind a trail of cryptic clues. As the evidence mounts, he must forge new alliances and unmask the culprit behind the city's corruption.",
    genre: "Action",
    status: "Streaming",
    rating: 8.5,
    duration: "2h 56m",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuED2P0Mr1UIgcKo2JQuXyXBaNAeeAUoPgLMl0ODN0W7dcdTi00xwTATP3f5bqjMZu_1_VJ5yXgH5_pvS2sZyuvVxa-J-8DIRzngUjwE8aqC7GbGM-Rp2xLQm0C_0VeJsQBISLQL0Sf_eC8t2ffbjsgITtWdX8CC77-nJz3UD_yZXaa_qrzA_Yp3HBQ-sOOe0zO5EZgmAovmD1bsJRb0gIzuGaV35cLMGih0HmZUh2gyV2cMaIb1nvSA7cYoZemuFc9--n18DPHpd3",
    year: 2022,
    casts: [
      "Robert Pattinson",
      "Zoë Kravitz",
      "Paul Dano",
      "Jeffrey Wright",
      "Colin Farrell",
      "Andy Serkis",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["amc-metreon-16", "regal-stonestown", "amc-kabuki-8"],
  },
  {
    id: "inception",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    genre: "Sci-Fi",
    status: "Streaming",
    rating: 8.8,
    duration: "2h 28m",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCg2KuCdN_Iw_2LWqBhJELxQJJ0cNNpgDJB_eyZ7W30AfR-puYn2UwxDKQq1b7PmWhnR6OvinaHGS431YXWItA3Xp1zBA3pxpvze58unUn1UBott7EIqwFwYdr9n_HPKIubWhRJBlapodYc-JCwlq5QTVr_M2Vx6sJis_olngfSRlORPOQ8LmLjzLDdKRLMM8LdC3mvEcmCnhgg0-C5vUeBZLc9CpZcm1H4pUG5xBbBhFBfhkTaOqqiZ1jdZFrL2tzE3PhAWdAlB1Or",
    year: 2010,
    casts: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page",
      "Tom Hardy",
      "Ken Watanabe",
      "Cillian Murphy",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: [
      "alamo-drafthouse-mission",
      "century-san-francisco-centre",
      "balboa-theatre",
    ],
  },
  {
    id: "gravity",
    title: "Gravity",
    description:
      "Two astronauts work together to survive after an accident leaves them stranded in space with dwindling oxygen and no way home.",
    genre: "Thriller",
    status: "In Theaters",
    rating: 7.7,
    duration: "1h 31m",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB_gLJiG9hAK7pKeDhaJq_MlOm5eX7aLHaFRddy06xTNz-OuVvoHqP1p9r56lOFmbYTllvMYtCZCI1X6e9oSxT2CRSuSXWvB5BeW6-mYy5n7q-dXjrGjqEX8DBpF0_yUkbXeuJ99Yx2sVI-e1gkp6YOrPtuogc8H8CgHRYanLfVHzuIylPG0rqa0qklYLg1zndetyBJdOck7LV-naYPzzxHeSQwG79b-lTD_aZDqLUK6r2YsU8gJ-Hc94EziqZEEZBbKx4bIkOF7wqH",
    year: 2013,
    casts: [
      "Sandra Bullock",
      "George Clooney",
      "Ed Harris",
      "Orto Ignatiussen",
      "Amy Warren",
      "Basher Savage",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["presidio-theatre", "landmark-opera-plaza", "roxie-theater"],
  },
  {
    id: "the-martian",
    title: "The Martian",
    description:
      "An astronaut is presumed dead and left behind on Mars. He must rely on his ingenuity to survive and signal Earth for rescue.",
    genre: "Adventure",
    status: "Streaming",
    rating: 8.0,
    duration: "2h 24m",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSGbOXHQd6rLvlNJNNXxSvB6Cwe7W2KYYp_uMwYmXAlPnMMSqvg4WG-c2FlfdgfhhYCn_S9i_Z_xvSB56eJCGzv6rBCspWKutrWfDNrQk6onKcZEE2Mef7BzZmOCA6hMEUyUnOZxhmG0Uk-P4Pv5UAvimwh9-qkpruX0o1tkraMJtH0gsFlMZhCNmpQsnwRa2jdWaRvFfESzACn5yloAyb_sU3KaLKqaTqomSz2TIZQ8y1M6Dy0oImOAYFbYgiOvNa_BuaC-yE_tUY",
    year: 2015,
    casts: [
      "Matt Damon",
      "Jessica Chastain",
      "Kristen Wiig",
      "Jeff Daniels",
      "Sean Bean",
      "Kate Mara",
    ],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["vogue-theatre", "balboa-theatre"],
  },
  {
    id: "joker-folie-a-deux",
    title: "Joker: Folie à Deux",
    description:
      "Failed comedian Arthur Fleck meets the love of his life, Harley Quinn, while incarcerated at Arkham State Hospital.",
    genre: "Crime",
    status: "Coming Soon",
    rating: 0,
    duration: "2h 18m",
    imageUrl:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500", // Dark dramatic theme
    year: 2024,
    casts: ["Joaquin Phoenix", "Lady Gaga", "Zazie Beetz"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: [],
  },
  {
    id: "gladiator-2",
    title: "Gladiator II",
    description:
      "Years after witnessing the death of Maximus, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors.",
    genre: "Action",
    status: "Coming Soon",
    rating: 0,
    duration: "2h 30m",
    imageUrl:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=500", // Roman/Armor theme
    year: 2024,
    casts: ["Paul Mescal", "Pedro Pascal", "Denzel Washington"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: [],
  },
  {
    id: "wicked",
    title: "Wicked",
    description:
      "The story of how a green-skinned woman framed by the Wizard of Oz becomes the Wicked Witch of the West.",
    genre: "Fantasy",
    status: "Coming Soon",
    rating: 0,
    duration: "2h 40m",
    imageUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500", // Magical green/forest theme
    year: 2024,
    casts: ["Cynthia Erivo", "Ariana Grande", "Michelle Yeoh"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: [],
  },
  {
    id: "nosferatu",
    title: "Nosferatu",
    description:
      "A gothic tale of obsession between a haunted young woman and the terrifying vampire infatuated with her.",
    genre: "Horror",
    status: "Coming Soon",
    rating: 0,
    duration: "2h 15m",
    imageUrl: "https://picsum.photos/id/1029/600/900",
    year: 2024,
    casts: ["Bill Skarsgård", "Nicholas Hoult", "Lily-Rose Depp"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: [],
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    description:
      "Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool.",
    genre: "Action",
    status: "In Theaters",
    rating: 8.2,
    duration: "2h 7m",
    imageUrl:
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=500", // Superheroes theme
    year: 2024,
    casts: ["Ryan Reynolds", "Hugh Jackman", "Emma Corrin"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: [
      "amc-metreon-16",
      "regal-stonestown",
      "century-san-francisco-centre",
    ],
  },
  {
    id: "furiosa",
    title: "Furiosa: A Mad Max Saga",
    description:
      "The origin story of renegade warrior Furiosa before her encounter with Mad Max.",
    genre: "Sci-Fi",
    status: "Streaming",
    rating: 7.6,
    duration: "2h 28m",
    imageUrl:
      "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=500", // Desert/Apocalypse theme
    year: 2024,
    casts: ["Anya Taylor-Joy", "Chris Hemsworth", "Tom Burke"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["alamo-drafthouse-mission", "roxie-theater"],
  },
  {
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    description:
      "A Chinese-American immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes.",
    genre: "Sci-Fi",
    status: "Streaming",
    rating: 8.8,
    duration: "2h 19m",
    imageUrl:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800",
    year: 2022,
    casts: ["Michelle Yeoh", "Ke Huy Quan", "Jamie Lee Curtis"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["roxie-theater", "landmark-opera-plaza"],
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    description:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    genre: "Action",
    status: "Streaming",
    rating: 8.3,
    duration: "2h 10m",
    imageUrl:
      "https://images.unsplash.com/photo-1517976384346-3136801d605d?q=80&w=800", // Aviation theme
    year: 2022,
    casts: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["amc-metreon-16", "regal-stonestown"],
  },
  {
    id: "spider-man-verse",
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    genre: "Action",
    status: "Streaming",
    rating: 8.6,
    duration: "2h 20m",
    imageUrl:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=500", // Spider/Modern theme
    year: 2023,
    casts: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["amc-kabuki-8", "vogue-theatre"],
  },
  {
    id: "poor-things",
    title: "Poor Things",
    description:
      "The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by a brilliant scientist.",
    genre: "Sci-Fi",
    status: "Streaming",
    rating: 8.0,
    duration: "2h 21m",
    imageUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500", // Artistic cinematic theme
    year: 2023,
    casts: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["landmark-opera-plaza", "presidio-theatre"],
  },
  {
    id: "alien-romulus",
    title: "Alien: Romulus",
    description:
      "While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.",
    genre: "Sci-Fi",
    status: "In Theaters",
    rating: 7.5,
    duration: "1h 59m",
    imageUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500", // Space/Sci-fi theme
    year: 2024,
    casts: ["Cailee Spaeny", "David Jonsson", "Archie Renaux"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["amc-metreon-16", "amc-kabuki-8", "alamo-drafthouse-mission"],
  },
  {
    id: "the-whale",
    title: "The Whale",
    description:
      "A reclusive, morbidly obese English teacher attempts to reconnect with his estranged teenage daughter.",
    genre: "Drama",
    status: "Streaming",
    rating: 7.7,
    duration: "1h 57m",
    imageUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=500", // Moody portrait theme
    year: 2022,
    casts: ["Brendan Fraser", "Sadie Sink", "Ty Simpkins"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["vogue-theatre"],
  },
  {
    id: "past-lives",
    title: "Past Lives",
    description:
      "Two deeply connected childhood friends are wrest apart after one's family emigrates from South Korea.",
    genre: "Drama",
    status: "Streaming",
    rating: 7.9,
    duration: "1h 45m",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500", // Romantic portrait theme
    year: 2023,
    casts: ["Greta Lee", "Teo Yoo", "John Magaro"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: ["landmark-opera-plaza", "roxie-theater"],
  },
  {
    id: "twisters",
    title: "Twisters",
    description:
      "A retired tornado wrangler and a social-media superstar come together to try and predict, and possibly tame, the immense power of tornadoes.",
    genre: "Action",
    status: "In Theaters",
    rating: 7.1,
    duration: "2h 2m",
    imageUrl:
      "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=500", // Storm/Tornado theme
    year: 2024,
    casts: ["Daisy Edgar-Jones", "Glen Powell", "Anthony Ramos"],
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    theaters: [
      "regal-stonestown",
      "century-san-francisco-centre",
      "balboa-theatre",
    ],
  },
];

export const theaters: Theater[] = [
  {
    theaterId: "amc-metreon-16",
    name: "AMC Metreon 16",
    address: "135 4th St, San Francisco, CA 94103",
    distance: "0.8 miles",
    isFavorite: false,
    verified: true,
    experience: [
      {
        type: "IMAX 70MM",
        details: "Laser projection + Reserved Seating",
        showtimes: [
          { time: "11:30 AM", price: 22.5, available: true },
          { time: "03:15 PM", price: 22.5, available: true },
          { time: "07:00 PM", price: 24.0, available: true },
          { time: "10:45 PM", price: 0, available: false },
        ],
      },
      {
        type: "STANDARD",
        details: "Digital + Recliner Seats",
        showtimes: [
          { time: "12:45 PM", price: 16.5, available: true },
          { time: "04:30 PM", price: 16.5, available: true },
          { time: "08:15 PM", price: 18.0, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "regal-stonestown",
    name: "Regal Stonestown Galleria",
    address: "3251 20th Ave, San Francisco, CA 94132",
    distance: "4.2 miles",
    isFavorite: false,
    verified: false,
    experience: [
      {
        type: "STANDARD",
        details: "Digital 4K + Recliner Seats",
        showtimes: [
          { time: "01:00 PM", price: 15.0, available: true },
          { time: "05:15 PM", price: 15.0, available: true },
          { time: "09:30 PM", price: 17.5, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "amc-kabuki-8",
    name: "AMC Kabuki 8",
    address: "1881 Post St, San Francisco, CA 94115",
    distance: "1.5 miles",
    isFavorite: false,
    verified: false,
    experience: [
      {
        type: "STANDARD",
        details: "Luxury Loungers + Dine-in",
        showtimes: [
          { time: "02:00 PM", price: 18.5, available: true },
          { time: "06:30 PM", price: 20.0, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "alamo-drafthouse-mission",
    name: "Alamo Drafthouse New Mission",
    address: "2550 Mission St, San Francisco, CA 94110",
    distance: "2.1 miles",
    isFavorite: false,
    verified: false,
    experience: [
      {
        type: "STANDARD",
        details: "4K Laser + Full Service Dining",
        showtimes: [
          { time: "04:00 PM", price: 19.0, available: true },
          { time: "07:30 PM", price: 19.0, available: true },
          { time: "10:15 PM", price: 19.0, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "century-san-francisco-centre",
    name: "Century San Francisco Centre 9",
    address: "865 Market St, San Francisco, CA 94103",
    distance: "0.5 miles",
    isFavorite: false,
    verified: true,
    experience: [
      {
        type: "XD",
        details: "Cinemark XD + Luxury Loungers",
        showtimes: [
          { time: "12:00 PM", price: 21.0, available: true },
          { time: "05:00 PM", price: 21.0, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "presidio-theatre",
    name: "Presidio Theatre",
    address: "2340 Chestnut St, San Francisco, CA 94123",
    distance: "3.2 miles",
    isFavorite: false,
    verified: false,
    experience: [
      {
        type: "STANDARD",
        details: "Historic Atmosphere",
        showtimes: [
          { time: "01:15 PM", price: 14.5, available: true },
          { time: "04:45 PM", price: 14.5, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "landmark-opera-plaza",
    name: "Landmark Opera Plaza",
    address: "601 Van Ness Ave, San Francisco, CA 94102",
    distance: "1.2 miles",
    isFavorite: false,
    verified: false,
    experience: [
      {
        type: "STANDARD",
        details: "Art House Choice",
        showtimes: [
          { time: "03:00 PM", price: 16.0, available: true },
          { time: "08:00 PM", price: 16.0, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "roxie-theater",
    name: "The Roxie Theater",
    address: "3117 16th St, San Francisco, CA 94103",
    distance: "1.9 miles",
    isFavorite: false,
    verified: true,
    experience: [
      {
        type: "STANDARD",
        details: "Indie Screening Room",
        showtimes: [
          { time: "05:30 PM", price: 13.0, available: true },
          { time: "09:00 PM", price: 13.0, available: true },
        ],
      },
    ],
  },
  {
    theaterId: "vogue-theatre",
    name: "Vogue Theatre",
    address: "3290 Sacramento St, San Francisco, CA 94115",
    distance: "2.8 miles",
    isFavorite: false,
    verified: false,
    experience: [
      {
        type: "STANDARD",
        details: "Classic Single Screen",
        showtimes: [{ time: "07:15 PM", price: 15.0, available: true }],
      },
    ],
  },
  {
    theaterId: "balboa-theatre",
    name: "Balboa Theatre",
    address: "3630 Balboa St, San Francisco, CA 94121",
    distance: "5.5 miles",
    isFavorite: false,
    verified: false,
    experience: [
      {
        type: "STANDARD",
        details: "Neighborhood Favorite",
        showtimes: [
          { time: "02:30 PM", price: 14.0, available: true },
          { time: "07:45 PM", price: 14.0, available: true },
        ],
      },
    ],
  },
];
