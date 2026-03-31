import { useMutation } from "@tanstack/react-query";
import { loginRequest, registerRequest, type AuthPayload } from "./auth.api";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: AuthPayload) => registerRequest(payload),
  });
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: AuthPayload) => loginRequest(payload),
  });
}
