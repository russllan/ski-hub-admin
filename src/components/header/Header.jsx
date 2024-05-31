import React, { useState } from "react";
import { headerData } from "./constant";
import Modal from "../modal/Modal";
import EquipmentCreateForm from "../equipmenForm/EquipmentCreateForm";

function Header() {
  const [modal, setModal] = useState(false);
  return (
    <div className="w-full h-[50px] pt-2 flex items-center justify-between">
      <div className="flex flex-row items-center gap-7">
        {headerData.map((item) => (
          <div
            key={item.title}
            className="cursor-pointer hover:bg-blue-400 p-1 px-5 rounded-md hover:text-white"
          >
            <button>{item.title}</button>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => setModal(true)}
          className="bg-blue-400 p-2 px-10 rounded-md text-white"
        >
          Добавить +
        </button>
      </div>
      {modal && (
        <Modal setIsModal={setModal}>
          <EquipmentCreateForm />
        </Modal>
      )}
    </div>
  );
}

export default Header;
