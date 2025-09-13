import { useAuth } from "@/lib/providers/auth-provider";
import type React from "react";
import { Navigate } from "react-router";

export function AdminRoleRoute({ children, requiredRoles }: { children: React.ReactNode, requiredRoles?: string[] }) {
const { user } = useAuth();

if (!(user?.role === 'admin')) {
    return <Navigate to="/" replace />;
}

  return <>{children}</>;
}