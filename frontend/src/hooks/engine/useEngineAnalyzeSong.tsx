import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useEngineAnalyzeSong = () => {
  return useMutation({
    mutationFn: async ({ song }: { song: File }) => {
      try {
        return await API_AUTH.analyzeSong({
          song,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating fusion");
      }
    },
  });
};
