import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000, //30 seconds
            retry: 1, //only 1 retry
            refetchOnWindowFocus: false, //don't refetch when window regains focus
        }
    }
});