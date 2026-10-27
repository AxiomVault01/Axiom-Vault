import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, MyProfile, MyProfileUpdate, updateMe } from "../services/profile";

const meKey = ["me"] as const;

// Other screens (profile header, dropdown) read the cached user from localStorage
const syncStoredUser = (profile: Partial<MyProfile>) => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem("user", JSON.stringify({ ...user, ...profile }));
  } catch {
    // Ignore a corrupt cache; the next login rewrites it
  }
};

export const useMe = () =>
  useQuery({
    queryKey: meKey,
    queryFn: getMe,
  });

export const useUpdateMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: MyProfileUpdate) => updateMe(payload),
    onSuccess: (data, payload) => {
      const updated = { ...queryClient.getQueryData<MyProfile>(meKey), ...payload, ...data };
      queryClient.setQueryData(meKey, updated);
      syncStoredUser(updated);
    },
  });
};
