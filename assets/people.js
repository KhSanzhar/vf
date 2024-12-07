// assets/people.js

export default [
  // ADVENTURE BLOG
  {
    id: 1,
    PersonName: "Mark Twen",
    Avatar: "avatar-male.png",
    PubDate: "Today, 12:00",
    Rating: 3.9,
    Commentary: "This is awesome adventure that I had! Thanks!",
    Topic: "ADVENTURE BLOG",
    email: "mark.twen@example.com",
    password: "mark1234",
    age: 35,
    isAdmin: true,
    createdAt: "2023-09-15T12:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "A Great Adventure",
        Date: "2023-09-15T11:00:00Z",
        Content: "Exploring new places is always fun.",
      },
      {
        Title: "Road Trip",
        Date: "2023-09-14T14:00:00Z",
        Content: "Visited some amazing spots along the way.",
      },
    ],
    favorites: [2, 3], // Added favorites
  },
  // NATURE BLOG
  {
    id: 2,
    PersonName: "Alice Johnson",
    Avatar: "avatar-female2.png",
    PubDate: "1 week ago, 16:45",
    Rating: 4.8,
    Commentary: "Beautiful scenery and peaceful environment.",
    Topic: "NATURE BLOG",
    email: "alice.johnson@example.com",
    password: "alice7890",
    age: 32,
    createdAt: "2023-09-08T16:45:00Z", // Added createdAt
    Posts: [
      {
        Title: "A Walk in the Forest",
        Date: "2023-09-13T00:00:00Z",
        Content: "It was so relaxing to walk among the trees.",
      },
      {
        Title: "Mountain Views",
        Date: "2023-09-08T00:00:00Z",
        Content: "Breathtaking views from the top.",
      },
    ],
    favorites: [1, 4], // Added favorites
  },
  // FASHION BLOG
  {
    id: 3,
    PersonName: "Sally Robinson",
    Avatar: "avatar-female2.png",
    PubDate: "Yesterday, 18:30",
    Rating: 4.6,
    Commentary: "Something new for me. Drive and emotions only.",
    Topic: "FASHION BLOG",
    email: "sally.robinson@example.com",
    password: "sally7890",
    age: 27,
    createdAt: "2023-09-14T18:30:00Z", // Added createdAt
    Posts: [
      {
        Title: "New Trends",
        Date: "2023-09-14T00:00:00Z",
        Content: "Exploring the latest fashion trends.",
      },
      {
        Title: "Style Tips",
        Date: "2023-09-13T00:00:00Z",
        Content: "Mix and match to find your personal style.",
      },
    ],
    favorites: [2, 5], // Added favorites
  },
  // ADVENTURE BLOG
  {
    id: 4,
    PersonName: "Katherine Johns",
    Avatar: "avatar-female.png",
    PubDate: "5 days ago, 12:15",
    Rating: 4.0,
    Commentary: "The place is very big. I lost the exit.",
    Topic: "ADVENTURE BLOG",
    email: "katherine.johns@example.com",
    password: "katherine5678",
    age: 28,
    createdAt: "2023-09-10T12:15:00Z", // Added createdAt
    Posts: [
      {
        Title: "Lost in the Woods",
        Date: "2023-09-12T00:00:00Z",
        Content: "A thrilling but scary experience.",
      },
    ],
    favorites: [1, 3], // Added favorites
  },
  // NATURE BLOG
  {
    id: 5,
    PersonName: "Bob Brown",
    Avatar: "avatar-male2.png",
    PubDate: "2 weeks ago, 10:30",
    Rating: 4.2,
    Commentary: "Great place to relax and unwind.",
    Topic: "NATURE BLOG",
    email: "bob.brown@example.com",
    password: "bob4567",
    age: 40,
    createdAt: "2023-09-01T10:30:00Z", // Added createdAt
    Posts: [
      {
        Title: "Beach Day",
        Date: "2023-09-12T00:00:00Z",
        Content: "Relaxed by the shore, enjoyed the sunset.",
      },
    ],
    favorites: [2, 4], // Added favorites
  },
  // ADVENTURE BLOG
  {
    id: 6,
    PersonName: "John Doe",
    Avatar: "avatar-male2.png",
    PubDate: "1 month ago, 14:00",
    Rating: 4.1,
    Commentary: "Had a great time exploring new places.",
    Topic: "ADVENTURE BLOG",
    email: "john.doe@example.com",
    password: "john1234",
    age: 31,
    createdAt: "2023-08-15T14:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Exploring Europe",
        Date: "2023-08-15T00:00:00Z",
        Content: "Visited several countries in Europe.",
      },
    ],
    favorites: [1, 5], // Added favorites
  },
  // NATURE BLOG
  {
    id: 7,
    PersonName: "Emily Clark",
    Avatar: "avatar-female2.png",
    PubDate: "3 weeks ago, 10:00",
    Rating: 4.5,
    Commentary: "Loved the cultural experiences.",
    Topic: "NATURE BLOG",
    email: "emily.clark@example.com",
    password: "emily5678",
    age: 26,
    createdAt: "2023-08-22T10:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Cultural Fest",
        Date: "2023-08-22T00:00:00Z",
        Content: "Participated in a local cultural festival.",
      },
    ],
    favorites: [2, 6], // Added favorites
  },
  // FASHION BLOG
  {
    id: 8,
    PersonName: "Michael Scott",
    Avatar: "avatar-male.png",
    PubDate: "2 months ago, 08:00",
    Rating: 4.7,
    Commentary: "Amazing experience with friends.",
    Topic: "FASHION BLOG",
    email: "michael.scott@example.com",
    password: "michael7890",
    age: 38,
    createdAt: "2023-07-15T08:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Friends Reunion",
        Date: "2023-07-15T00:00:00Z",
        Content: "Reunited with old friends.",
      },
    ],
    favorites: [3, 7], // Added favorites
  },
  // ADVENTURE BLOG
  {
    id: 9,
    PersonName: "Laura Wilson",
    Avatar: "avatar-female.png",
    PubDate: "1 week ago, 12:00",
    Rating: 4.3,
    Commentary: "Great insights on health and wellness.",
    Topic: "ADVENTURE BLOG",
    email: "laura.wilson@example.com",
    password: "laura1234",
    age: 29,
    createdAt: "2023-09-08T12:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Healthy Living",
        Date: "2023-09-08T00:00:00Z",
        Content: "Tips for a healthy lifestyle.",
      },
    ],
    favorites: [1, 8], // Added favorites
  },
  // NATURE BLOG
  {
    id: 10,
    PersonName: "David Miller",
    Avatar: "avatar-male.png",
    PubDate: "2 days ago, 15:00",
    Rating: 4.9,
    Commentary: "Fantastic tech reviews.",
    Topic: "NATURE BLOG",
    email: "david.miller@example.com",
    password: "david5678",
    age: 33,
    createdAt: "2023-09-13T15:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Latest Gadgets",
        Date: "2023-09-13T00:00:00Z",
        Content: "Reviewed the latest tech gadgets.",
      },
    ],
    favorites: [2, 9], // Added favorites
  },
  // FASHION BLOG
  {
    id: 11,
    PersonName: "Sophia Davis",
    Avatar: "avatar-female.png",
    PubDate: "3 days ago, 11:00",
    Rating: 4.4,
    Commentary: "Great recipes and cooking tips.",
    Topic: "FASHION BLOG",
    email: "sophia.davis@example.com",
    password: "sophia7890",
    age: 27,
    createdAt: "2023-09-12T11:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Delicious Recipes",
        Date: "2023-09-12T00:00:00Z",
        Content: "Shared some delicious recipes.",
      },
    ],
    favorites: [3, 10], // Added favorites
  },
  // ADVENTURE BLOG
  {
    id: 12,
    PersonName: "James Brown",
    Avatar: "avatar-male2.png",
    PubDate: "5 days ago, 09:00",
    Rating: 4.2,
    Commentary: "Interesting insights on finance.",
    Topic: "ADVENTURE BLOG",
    email: "james.brown@example.com",
    password: "james1234",
    age: 36,
    createdAt: "2023-09-10T09:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Investment Tips",
        Date: "2023-09-10T00:00:00Z",
        Content: "Shared some valuable investment tips.",
      },
    ],
    favorites: [1, 11], // Added favorites
  },
  // NATURE BLOG
  {
    id: 13,
    PersonName: "Karen Lee",
    Avatar: "avatar-female.png",
    PubDate: "8 months ago, 09:30",
    Rating: 4.6,
    Commentary: "Fantastic!",
    Topic: "NATURE BLOG",
    email: "karen.lee@example.com",
    password: "karen7890",
    age: 30,
    createdAt: "2023-01-15T09:30:00Z", // Added createdAt
    Posts: [
      {
        Title: "Yoga for Beginners",
        Date: "2023-01-15T00:00:00Z",
        Content: "Easy yoga poses to get started.",
      },
    ],
    favorites: [2, 12], // Added favorites
  },
  // FASHION BLOG
  {
    id: 14,
    PersonName: "Jane Smith",
    Avatar: "avatar-female.png",
    PubDate: "4 days ago, 11:00",
    Rating: 4.8,
    Commentary: "Absolutely loved it!",
    Topic: "FASHION BLOG",
    email: "jane.smith@example.com",
    password: "jane1234",
    age: 34,
    createdAt: "2023-09-11T11:00:00Z", // Added createdAt
    Posts: [
      {
        Title: "Running Tips",
        Date: "2023-09-14T00:00:00Z",
        Content: "Stay hydrated and pace yourself.",
      },
      {
        Title: "Game Night",
        Date: "2023-09-11T00:00:00Z",
        Content: "An exciting game with friends.",
      },
    ],
    favorites: [3, 13], // Added favorites
  },
  // ADVENTURE BLOG
  {
    id: 15,
    PersonName: "Stevie",
    Avatar: "avatar-male2.png",
    PubDate: "2 days ago, 09:05",
    Rating: 3.8,
    Commentary: "Something to be upgraded.",
    Topic: "ADVENTURE BLOG",
    email: "stevie@example.com",
    password: "stevie4567",
    age: 29,
    createdAt: "2023-09-13T09:05:00Z", // Added createdAt
    Posts: [
      {
        Title: "Future of Technology",
        Date: "2023-09-14T00:00:00Z",
        Content: "The next big thing is here.",
      },
    ],
    favorites: [1, 14], // Added favorites
  },
];
