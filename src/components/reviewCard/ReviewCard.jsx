function ReviewCard({ item }) {
  return (
    <div className="w-[200px] h-[50px] shadow-lg">
      <div className="p-2">{item?.rating}</div>
      <div className="p-2">{item?.comment}</div>
    </div>
  );
}

export default ReviewCard;
