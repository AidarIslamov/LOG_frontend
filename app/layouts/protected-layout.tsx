import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/providers/auth-provider";
import { ProtectedRoute } from "@/routes/guards/protected-route";
import { Link, Outlet } from "react-router";

export default function ProtectedLayout() {
    const {logout} = useAuth()
    return (
        <ProtectedRoute>
            <div className="flex justify-center sticky top-0 z-10">
                <div className="max-w-screen-xl w-full">
                    <div className="bg-white/80 backdrop-blur-md border-b border-zinc-200/50 h-[60px] px-6 md:px-10 shadow-sm">
                        <div className="flex items-center justify-between h-full gap-4">
                            <Link to={'/'} className="text-xl font-bold">{import.meta.env.VITE_APP_NAME}</Link>

                            <Button variant='outline' onClick={logout}>Logout</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Card className="max-w-screen-2xl 2xl:max-w-screen-2xl md:max-w-screen-md mx-auto w-full border-1 mt-5 px-3 py-10 md:px-10">
                <Outlet />
            </Card>
        </ProtectedRoute>
    );
}