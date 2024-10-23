import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useFusionDeleteFusion = () => {
  return useMutation({
    mutationFn: async (fusionId: string) => {
      try {
        await API_AUTH.deleteFusion({
          fusionId,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error deleting fusion");
      }
    },
  });
};
