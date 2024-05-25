import React from "react";

export default function BaseCard({ item }) {
  return (
    <div className="w-[400px] h-[500px] bg-[#fff] shadow-lg">
      <div className="w-full h-full p-5">
        <div className="text-2xl">{item?.title}</div>
        <div>
          <img src={`${item?.image}`} alt="base image" className="w-full h-[210px] rounded-[8px]" />
        </div>
        <div>Адрес: {item?.address}</div>
        <div>Описание: {item?.text}</div>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:bg-blue-600">
            Изменить детали
          </button>
        </div>
      </div>
    </div>
  );
}
