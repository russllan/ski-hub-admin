import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import equipmentService from "../../services/equipment.service";

function EquipmentCreateForm() {
  const [createData, setCreateData] = useState({});
  const [isType, setIsType] = useState(false);

  return(
    <div>
      <div>
        <button>{isType ? 'Снаряжение' : 'Одежда'}</button>
      </div>
    </div>
  )
}

export default EquipmentCreateForm;
