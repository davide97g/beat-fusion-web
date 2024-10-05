import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { IFusion } from "@/models/fusion.types";

export const useFusionCreateFusion = () => {
  return useMutation({
    mutationFn: async (fusion: IFusion) => {
      try {
        await API_AUTH.createFusion({
          fusion,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating fusion");
      }
    },
  });
};
