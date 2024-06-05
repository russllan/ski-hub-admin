import React from "react";
import { useEquipment } from "../../hooks/useEquipment";
import EquipmentCard from "../../components/equipmentCard/EquipmentCard";
import Header from "../../components/headerEquipment/Header";

export default function Equipment() {

  const { data, isPending, isError } = useEquipment();
  if (!isPending) {
    console.log(data);
  }
  if (isError) {
    console.log(isError);
    return <div>Error with data</div>;
  }


  return (
    <div className="w-full flex flex-col  gap-6">
      <Header />
      <div className="w-full flex">
        {!isPending && data?.map((item) => <EquipmentCard key={item.id} item={item} />)}
      </div>
    </div>
  );
}
