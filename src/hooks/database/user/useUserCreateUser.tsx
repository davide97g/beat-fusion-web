import { API_AUTH } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { IUser } from "@/models/user.types";

export const useUserCreateUser = () => {
  return useMutation({
    mutationFn: async (user: IUser) => {
      try {
        return await API_AUTH.createUser({ user });
      } catch (e) {
        console.error(e);
        throw new Error("Error creating user");
      }
    },
  });
};
