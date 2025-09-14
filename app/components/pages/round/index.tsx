import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { useRound } from "@/lib/hooks/useRound"
import type { Round } from "@/lib/types";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router"

export function Round({ uid }: { uid: string }) {
    const { data, isLoading } = useRound({ uid });
    const {round, message} = data ?? {};

    if (isLoading) {
        return 'Loading..'
    }

    if (!round) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="flex justify-center ">
            <Card className="max-w-md px-5">
                <CardHeader>
                    <CardTitle className="mx-auto">
                        Раунд: <span className="underline">{round.id}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                        <img src="/goose.jpg" alt="" />
                    </div>
                    <div className="my-10">
                        {round.isActive ?
                            round.isInCoolDown ? <CooldownStatus round={round} /> : <ActiveStatus round={round} />
                            : <NotActiveStatus round={round} />
                        }
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


function CooldownStatus({ round }: { round: Round }) {
    return (
        <div className="flex flex-col justify-center">
            <span className="mx-auto">Cooldown</span>
            <span className="mx-auto">до начала раунда 00:15</span>
        </div>
    )
}

function NotActiveStatus({ round }: { round: Round }) {
    return (
        <div>
            <Separator className="w-full my-3" />
            <div className="flex flex-row justify-between">
                <span>Всего</span>
                <span>999999</span>
            </div>
            <div className="flex flex-row justify-between">
                <span>Победитель - Иван</span>
                <span>100500</span>
            </div>
            <div className="flex flex-row justify-between">
                <span>Мои очки </span>
                <span>321</span>
            </div>
        </div>
    )
}

function ActiveStatus({ round }: { round: Round }) {
    return (
        <div className="flex flex-col justify-center">
            <span className="mx-auto">Раунд активен!</span>
            <span className="mx-auto">До конца осталось: 00:23</span>
            <span className="mx-auto">Мои очки - 123</span>
        </div>
    )
}