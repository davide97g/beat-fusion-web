import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useFusionFindFusionById = ({ id }: Readonly<{ id?: string }>) => {
  return useQuery({
    queryKey: ["fusions", id],
    queryFn: async () => API.getFusion({ fusionId: id! }),
    enabled: !!id,
  });
};
