import { useQuery } from "@tanstack/react-query";
import baseService from "../services/base.service";

export const useOneBase = (id) => {
  return useQuery({
    queryKey: ["one-base", id],
    queryFn: async () => await baseService.getOne(id),
    enabled: !!id,
  });
};
