"use client";
import { useState, useEffect } from "react";
import api from "@/lib/axios";

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      try {
        const response = await api.get("/users/me");
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error");
      }
    };

    getMe();
  }, []);

  return user;
}
