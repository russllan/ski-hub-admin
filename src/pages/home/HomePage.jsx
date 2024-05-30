import { useOneBase } from "../../hooks/useBase";
import BaseCard from "../../components/baseCard/BaseCard";
import ReviewCard from "../../components/reviewCard/ReviewCard";

export default function HomePage() {
  const { data, isPending } = useOneBase(3);
  !isPending && console.log(data);
  return (
    <div className={`h-screen w-full`}>
      <BaseCard item={data} />
      {data?.reviews?.map((item) => (
        <ReviewCard item={item} />
      ))}
    </div>
  );
}
