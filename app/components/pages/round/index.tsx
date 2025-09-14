import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { enterRound, useRound } from "@/lib/hooks/useRound"
import { useEffect, useRef } from "react";
import { Navigate } from "react-router"

export function Round({ uid }: { uid: string }) {
    const { data: round , isLoading } = useRound({ uid });
    const hasEntered = useRef(false);

    useEffect(() => {
        if (!isLoading && round && !hasEntered.current) {
            hasEntered.current = true;
            enterRound(uid);
        }
    }, [round, isLoading, uid]);

    if(isLoading) {
        return 'Loading'
    }

    if(!round) {
        <Navigate to="/" replace />
    }

    return (
        <div className="flex justify-center ">
            <Card className="max-w-md px-5">
                <CardHeader>
                    <CardTitle className="mx-auto">
                        Раунд: <span className="underline">{round?.id }</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                        <img src="/goose.jpg" alt="" />
                    </div>
                    {/* {JSON.stringify(round)} */}
                </CardContent>
            </Card>
        </div>
    )
} 