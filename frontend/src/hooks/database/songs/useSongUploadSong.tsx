import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useSongUploadSong = () => {
  return useMutation({
    mutationFn: async ({ song, songId }: { song: File; songId: string }) => {
      try {
        return await API_AUTH.uploadSong({
          song,
          songId,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error uploading song");
      }
    },
  });
};
