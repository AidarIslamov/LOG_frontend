import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Round } from "../types";

export function roundsQueryOptions() {
    return queryOptions({
        queryKey: ['rounds'],
        queryFn: async () => {
            const { data }: { data: Round[] } = await api.get(`/round`);
            return data;
        },
        refetchOnWindowFocus: true,
        refetchInterval: 1500
    })
}

export function useRounds() {
    return useQuery({
        ...roundsQueryOptions(),
    });
}