import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const MINUTE = 60 * 1000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cached data is served instantly and treated as fresh for 5 minutes;
      // after that it's still shown while a refetch runs in the background
      staleTime: 5 * MINUTE,
      // Unused data stays in the cache for 30 minutes before being dropped
      gcTime: 30 * MINUTE,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      // Client errors (4xx) won't succeed on retry, so only retry the rest
      retry: (failureCount, error) => {
        const status = isAxiosError(error) ? error.response?.status : undefined;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
    },
  },
});
