import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "./useDebounce";

const getMovie = async (query) => {
  if (!query) return;
  const resp = await axios.get(
    `https://www.omdbapi.com/?apikey=7da494ae&s=${query}&page=1`
  );
  console.log(resp.data);
  return resp.data;
};

export const useMoviesSearch = async (query) => {
  const debounced = useDebounce(query, 500);
  return useQuery({
    queryKey: ["movieSearch", debounced],
    queryFn: () => getMovie(query),
    refetchOnMount: false,
  });
};
