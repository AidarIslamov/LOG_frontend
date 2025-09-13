import { PublicRoute } from "@/routes/guards/public-route";
import { Outlet } from "react-router";

export default function PublicLayout() {
    return (
        <PublicRoute>
            <Outlet />
        </PublicRoute>
    );
}