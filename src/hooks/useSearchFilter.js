import { useState, useMemo } from "react";

export const useSearchFilter = (data = [], searchFields = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm || !data?.length) return data;

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = field.split(".").reduce((obj, key) => obj?.[key], item);
        return value
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, searchFields]);

  const setSearch = (term) => {
    setSearchTerm(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return {
    searchTerm,
    setSearchTerm: setSearch,
    filteredData,
    clearSearch,
  };
};
