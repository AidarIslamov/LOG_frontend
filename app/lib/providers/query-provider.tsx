'use client';

import { HydrationBoundary, QueryClient, QueryClientProvider, dehydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';
import { queryClient } from '@lib/queryClient';

type DehydratedState = ReturnType<typeof dehydrate>;

export function QueryProvider({
    children,
    dehydratedState
}: {
    children: ReactNode;
    dehydratedState?: DehydratedState;
}) {
    

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
                {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </HydrationBoundary>
        </QueryClientProvider>
    );
} 