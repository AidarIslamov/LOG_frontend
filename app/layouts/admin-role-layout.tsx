import { ProtectedRoute } from "@/routes/guards/protected-route";
import { AdminRoleRoute } from "@/routes/guards/admin-role-route";
import { Outlet } from "react-router";

export default function AdminRoleLayout() {
  return (
    <ProtectedRoute>
      <AdminRoleRoute>
        <Outlet />
      </AdminRoleRoute>
    </ProtectedRoute>
  );
}