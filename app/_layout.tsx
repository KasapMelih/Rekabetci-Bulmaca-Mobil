import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export default function Root() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
