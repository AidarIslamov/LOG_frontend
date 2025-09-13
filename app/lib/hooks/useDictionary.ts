import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Dictionary } from "../types";

function dictionaryQueryOptions() {
    return queryOptions({
        queryKey: ['dictionary'],
        queryFn: async () => {
            const { data }: { data: Dictionary } = await api.get(`/dictionary`);
            return data;
        }
    })
}

export function useDictionary() {
    return useQuery({
        ...dictionaryQueryOptions(),
    });
}