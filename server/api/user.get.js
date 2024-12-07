// server/api/user.get.js

import peopleData from "@/assets/people.js";

export default async (req, res) => {
  try {
    const authToken = req.cookies.auth_token;
    const user = peopleData.find((person) => person.id === parseInt(authToken));

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Failed to fetch user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
