import { useRound } from "@/lib/hooks/useRound"

export function Round({ uid }: { uid: string }) {
    const { data: round } = useRound({ uid })
    return (
        JSON.stringify(round)
    )
} 