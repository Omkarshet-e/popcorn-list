import { useEffect, useState } from "react";

export const useDebounce = (search, delay) => {
  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    const timeHandler = setTimeout(() => {
      setSearchValue(search);
    }, delay);

    return () => {
      clearTimeout(timeHandler);
    };
  }, [search, delay]);

  return searchValue;
};
