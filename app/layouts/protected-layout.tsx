import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/providers/auth-provider";
import { ProtectedRoute } from "@/routes/guards/protected-route";
import { Link, Outlet, Router, useMatch } from "react-router";

export default function ProtectedLayout() {
    const {logout, user} = useAuth();
    const roundMatch = useMatch('/round/:uid');
    return (
        <ProtectedRoute>
            <div className="flex justify-center sticky top-0 z-10">
                <div className="max-w-screen-xl w-full">
                    <div className="bg-white/80 backdrop-blur-md border-b border-zinc-200/50 h-[60px] px-6 md:px-10 shadow-sm">
                        <div className="flex items-center justify-between h-full gap-4">
                            <div className="flex flex-row">
                                <Link to={'/'} className="text-xl font-bold">
                                    <img src="/guse_s.jpg" width='30px' height='30px' />
                                </Link>
                                {roundMatch &&  
                                        <Link to='/' className="mx-5 underline" >Rounds</Link>
                                }
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger><Button variant='outline'>{user?.name}</Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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