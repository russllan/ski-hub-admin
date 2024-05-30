import React from "react";
import { useEquipment } from "../../hooks/useEquipment";

export default function Equipment() {
  const { data, isPending, isError } = useEquipment();
  if(!isPending) {
    console.log(data);
  }
  if(isError) {
    console.log(isError);
    return <div>Error with data</div>
  }
  return <div className="">awdawd</div>;
}
