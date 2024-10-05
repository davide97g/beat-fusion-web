import { API_AUTH } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useFusionFindFusions = ({
  dates,
  userId,
  enabled = true,
}: Readonly<{ dates?: string[]; userId?: string; enabled?: boolean }>) => {
  return useQuery({
    queryKey: ["fusions", dates?.join("-") ?? "-", userId],
    queryFn: async () => API_AUTH.getFusions({ dates, userId }),
    enabled,
  });
};
