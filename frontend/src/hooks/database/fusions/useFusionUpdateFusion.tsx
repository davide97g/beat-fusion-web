import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { IFusionUser } from "../../../../../types/fusion.types";

export const useFusionUpdateFusion = () => {
  return useMutation({
    mutationFn: async ({ fusion }: { fusion: IFusionUser }) => {
      try {
        await API_AUTH.updateFusion({
          fusion,
        });
      } catch (e) {
        console.error(e);
        throw new Error("Error updating fusion");
      }
    },
  });
};
