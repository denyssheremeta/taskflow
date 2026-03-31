import { useEffect } from "react";
import axios from "axios";
import { useCurrentUserQuery } from "./use-current-user-query";
import { getAccessToken, removeAccessToken } from "./token-storage";

export function useAuth() {
  const currentUserQuery = useCurrentUserQuery();
  const hasToken = Boolean(getAccessToken());

  useEffect(() => {
    if (axios.isAxiosError(currentUserQuery.error) && currentUserQuery.error.response?.status === 401) {
      removeAccessToken();
    }
  }, [currentUserQuery.error]);

  return {
    user: currentUserQuery.data ?? null,
    isLoading: hasToken && currentUserQuery.isPending,
    isAuthenticated: hasToken && Boolean(currentUserQuery.data),
    error:
      axios.isAxiosError(currentUserQuery.error) && currentUserQuery.error.response?.status === 401
        ? null
        : currentUserQuery.error,
  };
}
