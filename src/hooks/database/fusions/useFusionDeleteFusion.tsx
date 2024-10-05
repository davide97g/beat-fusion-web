import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { IFusion } from "@/models/fusion.types";

export const useFusionDeleteFusion = () => {
  return useMutation({
    mutationFn: async (fusion: IFusion) => {
      try {
        await API_AUTH.deleteFusion({
          fusionId: fusion.id,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error deleting fusion");
      }
    },
  });
};
