import { useManyBases, useOneBase } from "../../hooks/useBase";
import BaseCard from "../../components/baseCard/BaseCard";
import ReviewCard from "../../components/reviewCard/ReviewCard";

export default function HomePage() {
  // const { data, isPending } = useOneBase(3);
  const {data , isPending , isLoading} = useManyBases()

  console.log(data);

  

  !isPending && console.log(data);

  if(isLoading) return <h1>Loading...</h1>
  return (
    <div className={`h-screen w-full`}>
      {/* <BaseCard item={data} />
      {data?.reviews?.map((item) => (
        <ReviewCard item={item} />
      ))} */}
    </div>
  );
}
