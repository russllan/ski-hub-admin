import React from "react";
import { useEquipment } from "../../hooks/useEquipment";
import EquipmentCard from "../../components/equipmentCard/EquipmentCard";
import Header from "../../components/header/Header";

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
    <div className="w-full h-screen overflow-auto flex flex-row flex-wrap items-center gap-6">
      <Header />
      {!isPending && data?.map((item) => <EquipmentCard key={item.id} item={item} />)}
    </div>
  );
}
