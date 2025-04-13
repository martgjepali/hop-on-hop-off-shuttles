"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/admin/sign-in");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return null; // Or a spinner
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default AuthGuard;
