import axios from "axios";

type ErrorResponse = {
  message?: string;
  errors?: Array<{
    path?: string;
    message: string;
  }>;
};

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    const validationMessage = error.response?.data?.errors?.[0]?.message;

    return validationMessage ?? error.response?.data?.message ?? "Request failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Something went wrong";
}
