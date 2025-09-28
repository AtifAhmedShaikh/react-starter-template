import { useQuery } from "@tanstack/react-query";

/**
 * Reusable hook for data fetching using React Query.
 * @param key React Query cache key (e.g., "charges", "users")
 * @param apiFn Your API function that accepts { keyword, page, limit }
 * @param options Optional config: { keyword, page, limit }
 */
export function useFetchQuery({
  key,
  apiFn,
  keyword = "",
  page = 1,
  limit = 10,
  onSuccess,
  onError,
  ...queryOptions
}) {
  const queryKey = [key, keyword, page, limit];

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => apiFn({ keyword, page, limit }),
    staleTime: 0,
    cacheTime: 0,
    keepPreviousData: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    onSuccess,
    onError,
    ...queryOptions,
  });

  return {
    data: data?.data || [],
    meta: data?.meta || {},
    loading: isLoading,
    error: isError ? error?.response?.data?.message : "",
  };
}
