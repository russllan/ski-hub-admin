import React, { useState } from "react";
import Modal from "../modal/Modal";
import BaseEditForm from "../baseEditForm/BaseEditForm";

export default function BaseCard({ item }) {
  const [modal, setModal] = useState(false);
  return (
    <div className="w-full h-full bg-[#fff] shadow-lg">
      <div className="w-full h-full p-5">
        <div className="text-2xl">{item?.title}</div>
        <div>
          <img
            src={`${item?.image}`}
            alt="base image"
            className="w-full h-[410px] rounded-[8px]"
          />
        </div>
        <div>Адрес: {item?.address}</div>
        <div>Описание: {item?.text}</div>
        <div>
          <button
            onClick={() => setModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold focus:outline-none focus:bg-blue-600"
          >
            Изменить детали
          </button>
        </div>
        <div>
          {modal ? (
            <Modal isModal={modal} setIsModal={setModal}>
              <BaseEditForm baseId={item.id}/>
            </Modal>
          ) : null}
        </div>
      </div>
    </div>
  );
}
