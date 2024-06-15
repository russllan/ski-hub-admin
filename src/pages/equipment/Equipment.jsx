import React, { useState, useEffect } from "react";
import { useEquipment } from "../../hooks/useEquipment";
import EquipmentCard from "../../components/equipmentCard/EquipmentCard";
import Header from "../../components/headerEquipment/Header";

export default function Equipment() {
  const [filter, setFilter] = useState("");
  const { data, isPending, isError } = useEquipment();
  const [filteredData, setFilteredData] = useState([]);

  console.log(filter);

  useEffect(() => {
    if (!data) return;

    if (filter === "") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.type === filter));
    }
  }, [filter, data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error with data</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Header onFilterChange={setFilter} />
      <div className="w-full flex flex-wrap gap-7">
        {filteredData?.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
