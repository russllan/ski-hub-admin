import React, { useState } from "react";
import Modal from "../modal/Modal";
import EquipmentEditForm from "../equipmenForm/EquipmentEditForm";
import $api from "../../services";
import { useQueryClient } from "@tanstack/react-query";



const EquipmentCard = ({ item }) => {
  const [isModal, setIsModal] = useState(false);
  const queryClient = useQueryClient()

console.log(item);

  const onDelete = async() => {
    await $api.delete("product/" + item.id)
    
    queryClient.invalidateQueries({queryKey:["equipment"]})
  }

  return (
    <div className="w-[350px] h-[640px] rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-[240px]" src={item.image} alt={item.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.title}</div>
        <p className="h-[25px] text-gray-700 text-base">{item.text}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p>
          <strong>Тип:</strong> {item.type}
        </p>
        <p>
          <strong>Размер:</strong> {item.size}
        </p>
        <p>
          <strong>Цвет:</strong> {item.color}
        </p>
        <p>
          <strong>Цена:</strong> {item.cost} руб.
        </p>
        <p>
          <strong>Пол:</strong> {item.gender}
        </p>
        <p>
          <strong>Дата начала:</strong>{" "}
          {new Date(item.startDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Дата окончания:</strong>{" "}
          {new Date(item.endDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Статус:</strong> {item.status}
        </p>
        <p>
          <strong>Количество:</strong> {item.amount}
        </p>
        <p>
          <strong>Забронировано:</strong> {item.isBooked ? "Да" : "Нет"}
        </p>
        <div className="flex justify-between ">
          <button
            onClick={() => setIsModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:bg-blue-600"
          >
            Изменить детали
          </button>
          <button
            onClick={() => onDelete()}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:bg-blue-600"
          >
            Удалить
          </button>
        </div>
      </div>

      {isModal && (
        <Modal setIsModal={setIsModal}>
          <EquipmentEditForm item={item} />
        </Modal>
      )}
    </div>
  );
};

export default EquipmentCard;
