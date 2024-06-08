import React, { useState } from "react";
import { headerData } from "./constant";
import Modal from "../modal/Modal";
import EquipmentCreateForm from "../equipmenForm/EquipmentCreateForm";
import { useNavigate, useSearchParams } from "react-router-dom";

function Header({ onFilterChange }) {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams()

  const onClickCriteria = (criteria) => {
    navigate(criteria === "Все" ? "?filter=" : "?filter=" + criteria);
    onFilterChange(criteria === "Все" ? "" : criteria);
  };

  const pathname = searchParams.get("filter")

  return (
    <div className="w-full flex items-center justify-between bg-gray-100 p-4 shadow-md">
      <div className="flex flex-row items-center gap-7">
        {headerData.map((item) => (
          <button
            key={item.title}
            style={pathname === item.title ? { backgroundColor: "#60a5fa", color: "white", transition: "backgroundColor ease-in-out 0.3s" } : { transition: "backgroundColor ease-in-out" }}
            className="cursor-pointer hover:bg-blue-400 p-1 px-5 rounded-md hover:text-white"
            onClick={() => onClickCriteria(item.title)}
          >
            {item.title}
          </button>
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
