import { STALE_TIME } from "@/constants";
import { useQuery } from "@tanstack/react-query";

// Specific hook for fetching complainants
export function useComplainantsData({
  queryName = "complainants",
  apiFn,
  keyword = "",
  page = 1,
  limit = 10,
  extraParams = {},
}) {
  const queryKey = [
    queryName,
    keyword,
    page,
    limit,
    JSON.stringify(extraParams),
  ];

  const { data, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn: () => apiFn({ keyword, page, limit, ...extraParams }),
    staleTime: STALE_TIME,
    cacheTime: 3000,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    complainants: Array.isArray(data?.data) ? data?.data : [],
    meta: data?.meta || {},
    loading: isLoading,
    error: isError ? error?.response?.data?.message : "",
  };
}
