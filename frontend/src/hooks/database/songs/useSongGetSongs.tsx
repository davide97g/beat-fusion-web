import { API_AUTH } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useSongGetSongs = () => {
  return useQuery({
    queryKey: ["songs"],
    queryFn: async () => {
      try {
        return await API_AUTH.getSongs();
      } catch (e) {
        console.error(e);
        throw new Error("Error get songs");
      }
    },
  });
};
