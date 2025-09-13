import { useAuth } from "@/lib/providers/auth-provider";
import { Navigate } from "react-router";

interface PublicRouteProps {
  children: React.ReactNode;
  fallback?: string;
}

export function PublicRoute({ 
  children, 
  fallback = "/" 
}: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to={fallback} replace />;
  }

  return <>{children}</>;
}