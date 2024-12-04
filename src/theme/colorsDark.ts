import { create } from "zustand";

export const colors = {
  transparent: "rgba(0, 0, 0, 0)",

  // Main palette
  primary: "#007AFF",
  secondary: "#500065",

  // Text and backgrounds
  text: "#E0E0E0",
  textLight: "#E0E0E0",
  background: "#121212",
  card: "#1E1E1E",
  cardDark: "#1E1E1E",
  border: "#333333",
  gray: "#888888",

  // Status messages
  danger: "#FF3B30",
  info: "#4DA8DA",
  warning: "#FFB74D",
  success: "#4CAF50",
} as const;

