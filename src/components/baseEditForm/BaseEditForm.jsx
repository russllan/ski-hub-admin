import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import baseService from "../../services/base.service";

function BaseEditForm({baseId}) {
  const [baseName, setBaseName] = useState("");
  const [baseText, setBaseText] = useState("");
  const [address, setAddress] = useState("");
  const [baner, setBaner] = useState("");
  const [error, setError] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update-base"],
    mutationFn: async (data) => baseService.patch(data),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!baseName && !baseText && !address && !baner) {
      setError("Заполните хотя бы одно поле.");
      return;
    }
    const id = baseId;
    const data = {};
    if (baseName) data.title = baseName;
    if (baseText) data.text = baseText;
    if (address) data.address = address;
    if (baner) data.image = baner;
    try {
      await mutateAsync({id, data});
    } catch (error) {
      console.error("Error", error);
    }
    setBaseName("");
    setBaseText("");
    setAddress("");
    setBaner("");
    setError("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Измените детали</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="baseName"
          >
            Название горнолыжной базы
          </label>
          <input
            id="baseName"
            type="text"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            placeholder="Название горнолыжной базы"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="baseText"
          >
            Текст базы
          </label>
          <input
            id="baseText"
            type="text"
            value={baseText}
            onChange={(e) => setBaseText(e.target.value)}
            placeholder="Текст базы"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="address"
          >
            Адрес
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Адрес"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="baner"
          >
            Баннер
          </label>
          <input
            id="baner"
            type="text"
            value={baner}
            onChange={(e) => setBaner(e.target.value)}
            placeholder="Банер"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Сохранить
          </button>
        </div>
        {error}
      </form>
    </div>
  );
}

export default BaseEditForm;
