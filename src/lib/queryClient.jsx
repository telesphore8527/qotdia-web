import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: (failureCount, error)=>{
        if(error.status == 404){
          return 0
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
    },
  },
});
