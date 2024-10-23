import { API_AUTH } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useFusionFindFusions = (
  params?: Readonly<{ dates?: string[]; userId?: string; enabled?: boolean }>,
) => {
  const { dates, userId, enabled = true } = params ?? {};
  return useQuery({
    queryKey: ["fusions", dates?.join("-") ?? "-", userId],
    queryFn: async () => API_AUTH.getFusions({ dates, userId }),
    enabled,
  });
};
