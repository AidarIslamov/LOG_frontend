import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Round, RoundFormData } from "../types";

function roundQueryOptions({ uid }: { uid: string, refetch?: boolean }) {
    return queryOptions({
        queryKey: ['round', uid],
        queryFn: async () => {
            const { data }: { data: {round?: Round, message?: string} } = await api.get(`/round/${uid}`); 
            return data;
        },
        refetchOnWindowFocus: true
    })
}

export function useRound({ uid }: { uid: string }) {
    return useQuery({
        ...roundQueryOptions({ uid }),
    });
}

export async function createRound(data: RoundFormData) {
    return await api.post('/round', data)
}

export async function sendRoundVote(uid: string): Promise<{success: boolean, score?: number, status?: string, error?: string}> {
    const {data} =  await api.post(`/round/${uid}/vote`);
    return data;
}