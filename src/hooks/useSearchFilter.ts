import { useState } from "react";

export default function useSearchFilter<T>(
  filterFn: (item: string) => T[],
  emitFilterDispatcher: (filteredItems: T[]) => void
) {
  const [searchFilter, setSearchFilter] = useState<string>("");

  const handleSearch = (event: any) => {
    event?.preventDefault();
    const filteredItems = filterFn(searchFilter);
    emitFilterDispatcher(filteredItems);
  };

  return {searchFilter, setSearchFilter, handleSearch};
}
