import { useState, useCookie } from "#app";
import peopleData from "@/assets/people.js"; // Import the user data

export const useAuth = () => {
  const user = useState("user", () => null);
  const authToken = useCookie("auth_token"); // Store auth token

  const fetchUser = async () => {
    try {
      const response = await $fetch('/api/user');
      user.value = response.user || null; // Set null if no user is returned
    } catch (error) {
      console.error('Failed to fetch user:', error);
      user.value = null; // Set null if an error occurs
    }
  };
  const login = async (email, password) => {
    try {
      const response = await $fetch("/api/login", {
        method: "POST",
        body: { email, password },
      });
      user.value = response.user;
      authToken.value = user.value.id; // Store token
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    await $fetch("/api/logout", { method: "POST" });
    user.value = null;
    authToken.value = null; // Clear token
  };

  const register = async (name, email, password) => {
    try {
      const response = await $fetch("/api/register", {
        method: "POST",
        body: { name, email, password },
      });
      user.value = response.user;
      authToken.value = user.value.id; // Store token
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const addFavorite = async (profileId) => {
    try {
      const response = await $fetch("/api/favorites", {
        method: "POST",
        body: { profileId },
      });
      user.value.favorites = response.favorites;
    } catch (error) {
      console.error("Failed to add favorite:", error);
    }
  };

  const removeFavorite = async (profileId) => {
    try {
      const response = await $fetch("/api/favorites", {
        method: "DELETE",
        body: { profileId },
      });
      user.value.favorites = response.favorites;
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };
  const getFriends = () => {
    if (!user.value) return [];

    // Friends are users who have the current user's ID in their favorites
    const friends = peopleData.filter(
      (person) => person.favorites && person.favorites.includes(user.value.id)
    );

    return friends;
  };

  return {
    user,
    fetchUser,
    login,
    logout,
    register,
    addFavorite,
    removeFavorite,
    getFriends,
  };
};
