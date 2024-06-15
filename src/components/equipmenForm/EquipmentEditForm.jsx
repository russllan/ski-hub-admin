
// EquipmentEditForm.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import equipmentService from "../../services/equipment.service";

function EquipmentEditForm({ item }) {



  const initialData = {
    amount: item?.amount,
    color: item?.color,
    cost: item?.cost,
    endDate: item?.endDate,
    gender: item?.gender,
    height: item?.height,
    image: item?.image,
    isBooked: item?.isBooked,
    size: item?.size,
    startDate: item?.startDate,
    status: item?.status,
    text: item?.text,
    title: item?.title,
    type: item?.type,
    weight: item?.weight,
  };

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(initialData);
  const [changedFields, setChangedFields] = useState({});

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["update-equipment"],
    mutationFn: async (data) => equipmentService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["equipment"] });
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setChangedFields({
      ...changedFields,
      [name]: formData[name] !== (type === "checkbox" ? checked : value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = onEditData();
    const id = item.id;
    if (Object.keys(updatedData).length > 0) {
      console.log("Updated data:", id, updatedData);
      await mutateAsync({ id, data: updatedData });
    } else {
      console.log("No changes detected.");
    }
  };

  const onEditData = () => {
    const updatedData = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== initialData[key]) {
        updatedData[key] = formData[key];
      }
    });
    return updatedData;
  };

  return (
    <div className="w-full container mx-auto p-4 h-[600px] overflow-auto">
      <div className="w-full flex flex-wrap">
        <form onSubmit={handleSubmit} className="w-full h-screen">
          {Object.keys(formData).map((key) => (
            <div key={key} className="mb-4">
              <label
                className="text-gray-700 text-sm font-bold mb-2"
                htmlFor={key}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              {key === "isBooked" ? (
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  checked={formData[key]}
                  onChange={handleChange}
                  className={`mr-2 leading-tight ${changedFields[key] ? "bg-yellow-100" : ""
                    }`}
                />
              ) : key === "startDate" || key === "endDate" ? (
                <input
                  type="date"
                  id={key}
                  name={key}
                  // value={formData[key].substring(0, 10)}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${changedFields[key] ? "bg-yellow-100" : ""
                    }`}
                />
              ) : (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${changedFields[key] ? "bg-yellow-100" : ""
                    }`}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? "Обновление..." : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EquipmentEditForm;
