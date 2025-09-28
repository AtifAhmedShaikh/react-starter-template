import { useMutation } from "@tanstack/react-query";

export function useFetchMutation({
  apiFn,
  onSuccess,
  onError,
  ...mutationOptions
}) {
  const mutation = useMutation({
    mutationFn: apiFn,
    onSuccess: (data, variables, context) => {
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (onError) onError(error, variables, context);
    },
    ...mutationOptions,
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    data: mutation.data?.data || mutation.data,
    loading: mutation.isPending, // ✅ for mutations in React Query v5
    error: mutation.isError
      ? mutation.error?.response?.data?.message || mutation.error.message
      : "",
  };
}
