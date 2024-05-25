import React from "react";
import { useOneBase } from "../../hooks/useBase";
import BaseCard from "../../components/baseCard/BaseCard";

export default function HomePage() {
  const { data, isPending } = useOneBase(3);
  !isPending && console.log(data);
  return (
    <div>
      <BaseCard item={data} />
    </div>
  );
}
