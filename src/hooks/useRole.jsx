import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { AuthContext } from "@/Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } =use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled:!loading && !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `${import.meta.env.VITE_API_URL}/user/role/${user.email}`
      );
      return data?.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
