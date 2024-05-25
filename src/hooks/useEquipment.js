import { useQuery } from "@tanstack/react-query"
import equipmentService from "../services/equipment.service"

export const useEquipment = () => {
    return useQuery({
        queryKey: ["equipment"],
        queryFn: equipmentService.getAll,
    })
}