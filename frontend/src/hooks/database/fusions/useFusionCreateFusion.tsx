import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { IFusionUser } from "../../../../../types/fusion.types";

export const useFusionCreateFusion = () => {
  return useMutation({
    mutationFn: async (fusionUser: IFusionUser) => {
      try {
        await API_AUTH.createFusion({
          fusionUser,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating fusion");
      }
    },
  });
};
