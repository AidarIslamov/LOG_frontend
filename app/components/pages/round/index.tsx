import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { sendRoundVote, useRound } from "@/lib/hooks/useRound"
import type { Round, User } from "@/lib/types";
import React, { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import {differenceInSeconds} from 'date-fns';
import { useAuth } from "@/lib/providers/auth-provider";
import { cn } from "@/lib/utils";

export function Round({ uid }: { uid: string }) {
    const {user: currentUser} = useAuth()
    const { data, isLoading, refetch, isFetching  } = useRound({ uid});
    const {round, message} = data ?? {};  
    const { start, run, end } = useRoundTimer(round);
    const isClickable = useMemo(() => {
        return run <= 0 && end > 0;
    }, [run, end])


    const [currentUserScore, setCurrentUserScore] = useState(0);

    useEffect(() => {
        const roundDataValue = round?.roundPlayers.find((roundPlayer) => roundPlayer.user_id === currentUser?.id)?.score || 0;
        setCurrentUserScore((prev) => (Math.max(roundDataValue, prev)))
    }, [round, isFetching])


    useEffect(() => {
        if (!round || round.isFinished) return;

        let timers: NodeJS.Timeout[] = [];

        const now = new Date;
        const beforeStartSec = -differenceInSeconds(now, round.startAt);
        const beforeRunSec = -differenceInSeconds(now, round.startAt) + round.cooldown;
        const beforeEnd = -differenceInSeconds(now, round.endAt);

        const scheduleRefetch = (seconds: number, type: string) => {
            if (seconds > 0) {
                console.log(`Next ${type} in: ${seconds}s`);
                const timer = setTimeout(() => {
                    refetch();
                }, seconds * 1000);
                timers.push(timer);
            }
        };

        scheduleRefetch(beforeStartSec, 'start');
        scheduleRefetch(beforeRunSec, 'run');
        scheduleRefetch(beforeEnd + 2, 'end');

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };

    }, [round]);

    if (isLoading) {
        return 'Loading..'
    }

    if (!round) {
        return <Navigate to="/" replace />
    }

    function currentState(): React.ReactNode {
        const content = [];
        if(start > 0) {
            content.push({text: 'Еще не началось'})
            content.push({text: `до старта раунда: ${formatTime(start)}`})
        } else if (run > 0) {
            content.push({text: 'Cooldown'})
            content.push({text: `до начала раунда ${formatTime(run)}`})
        } else if (end > 0) {
            content.push({text: 'Раунд активен!'})
            content.push({text: `До конца осталось: ${formatTime(end)}`})
            content.push({text: `Мои очки - ${currentUserScore}`})
        } else {
            return (
                <div>
                    <Separator className="w-full my-3" />
                    <div className="flex flex-row justify-between">
                        <span>Всего</span>
                        <span>{round!.totals?.totalScore ?? 0}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Победитель - {round!.totals?.winner?.user?.name ?? ''}</span>
                        <span>{round!.totals?.winner?.user?.score ?? ''}</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Мои очки </span>
                        <span>{currentUserScore}</span>
                    </div>
                </div>
            )
        } 


        return (
            <div className="flex flex-col justify-center">
                {content.map((item, idx) => <span key={idx} className="mx-auto">{item.text}</span>)}
            </div>
        )
    }

    async function handleClick() {
        if(isClickable) {
            const {success, score, status} = await sendRoundVote(uid);
            if(success) {
                setCurrentUserScore((prev) => (Math.max(score || 0, prev)))
            }

            if(status === 'prevented') {
                console.log('Tap prevented - Nikita mode activated');
            }
        }
        
    }



    return (
        <div className="flex justify-center ">
            <Card className="max-w-md px-5">
                <CardHeader>
                    <CardTitle className={"mx-auto"}>
                        Раунд: <span className={cn("underline", isClickable ? 'text-green-500' : '')}>{round.id}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={cn("flex justify-center ", isClickable ? 'cursor-pointer shadow-lg' : 'cursor-not-allowed')} onClick={handleClick}>
                        <img src="/goose.jpg" alt="Goose" className={cn(!isClickable ? 'contrast-50' : '')}/>
                    </div>
                    <div className="my-10">
                        {currentState()}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


function useRoundTimer(round: Round | undefined) {
    const [timeLeft, setTimeLeft] = useState<{start: number, run: number, end: number}>({
        start: 0,
        run: 0,
        end: 0
    });

    useEffect(() => {
        if (!round || round.isFinished) return;

        const updateTimers = () => {
            const now = new Date();
            const startInSec = Math.max(0, differenceInSeconds(round.startAt, now));
            const runInSec = Math.max(0, differenceInSeconds(round.startAt, now) + round.cooldown);
            const endInSec = Math.max(0, differenceInSeconds(round.endAt, now));

            setTimeLeft({ start: startInSec, run: runInSec, end: endInSec });
        };

        updateTimers();

        const interval = setInterval(updateTimers, 1000);

        return () => clearInterval(interval);
    }, [round]);

    return timeLeft;
}

function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}


