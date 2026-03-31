import { useQuery } from "@tanstack/react-query";
import { getCurrentUserRequest } from "./auth.api";
import { authKeys } from "./auth.keys";
import { getAccessToken } from "./token-storage";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: async () => {
      const response = await getCurrentUserRequest();
      return response.data.user;
    },
    enabled: Boolean(getAccessToken()),
    staleTime: 1000 * 60 * 5,
    retry: false,
    throwOnError: false,
    meta: {
      requiresAuth: true,
    },
  });
}
