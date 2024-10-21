import { useMutation } from "@tanstack/react-query";
import { ISongAnalysis } from "../../../../../types/song.types";
import { API_AUTH } from "@/services/api";

export const useSongCreateSongAnalysis = () => {
  return useMutation({
    mutationFn: async ({ songAnalysis }: { songAnalysis: ISongAnalysis }) => {
      try {
        await API_AUTH.createSongAnalysis({
          songAnalysis,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error create song analysis");
      }
    },
  });
};
