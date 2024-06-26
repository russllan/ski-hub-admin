import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import equipmentService from "../../services/equipment.service";
import $api from "../../services";
import { useQueryClient } from "@tanstack/react-query";

function EquipmentCreateForm() {
  const [createData, setCreateData] = useState({
    title: "",
    image: "",
    amount: 0,
    cost: 0,
    type: "",
    size: "",
    height: 0,
    weight: 0,
    color: "",
    gender: "",
    text: "",
    status: "",
    isBooked: false,
    base: Number(localStorage.getItem("baseId")),
  });

  const [isType, setIsType] = useState(false);

  const queryClient = useQueryClient();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateData({
      ...createData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setCreateData({
        ...createData,
        [e.target.name]: base64,
      });
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...createData,
      type: isType ? "Одежда" : "Снаряжение",
    };
    await $api.post("/product/create", dataToSend);
    queryClient.invalidateQueries({ queryKey: ["equipment"] });
  };

  const toggleType = () => {
    setIsType(!isType);
  };

  return (
    <div
      className="max-h-[800px] bg-white shadow-lg rounded-lg p-6"
      style={{ overflowY: "scroll" }}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">
        Создать снаряжение
      </h1>
      <div className="mb-4 text-center">
        <button
          onClick={toggleType}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isType ? "Одежда" : "Снаряжение"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(createData).map(
            (key) =>
              key !== "isBooked" &&
              key !== "type" && (
                <div className="mb-4" key={key}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={key}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={key}
                    type={key === "image" ? "file" : "text"}
                    name={key}
                    value={key === "image" ? undefined : createData[key]}
                    onChange={key === "image" ? handleFileChange : handleChange}
                    // required
                  />
                </div>
              )
          )}
          <div className="mb-4 col-span-1 md:col-span-2"></div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            type="submit"
          >
            Создать карточку
          </button>
        </div>
      </form>
    </div>
  );
}

export default EquipmentCreateForm;
