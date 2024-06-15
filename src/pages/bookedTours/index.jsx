import React from "react";
import $api from "../../services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function BookedToursPage() {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const res = await $api.get("booked-tour/adminGet");
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["bookedtour"],
    queryFn: fetchData,
  });

  const updateData = async ({ id, updatedFields }) => {
    await $api.put(`booked-tour/${id}`, updatedFields);
  };

  const mutation = useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries("bookedtour");
    },
  });

  //   const toggleIsPickUp = (id, currentStatus , item) => {
  //     mutation.mutate({ id, updatedFields: {  ...item  , isPickUp: !currentStatus  } });
  //   };

  //   const toggleIsRefund = (id, currentStatus , item) => {
  //     mutation.mutate({ id, updatedFields: {  ...item , isRefund: !currentStatus } });
  //   };

  if (isLoading) return <h1 className="text-center text-xl">Loading...</h1>;

  return (
    <section className="">
      <h1 className="text-2xl font-bold mb-4">Booked Tour</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Tour ID: {item.id}</h2>
            <p className="mb-2">
              <strong>Amount:</strong> {item.amount}
            </p>
            <div className="mb-2">
              <strong>Tour Details:</strong>
              <ul className="list-disc pl-4">
                <li>Amount: {item.tour.amount}</li>
                <li>Color: {item.tour.color}</li>
                <li>Cost: {item.tour.cost}</li>
                <li>End Date: {item.tour.endDate}</li>
                <li>Text: {item.tour.text}</li>
                <li>ID: {item.tour.id}</li>
                <li>
                  Image:{" "}
                  <img
                    src={item.tour.image}
                    alt={item.tour.title}
                    className="w-16 h-16 object-cover"
                  />
                </li>
                <li>Is Booked: {item.tour.isBooked ? "Yes" : "No"}</li>
                <li>status: {item.tour.status}</li>
                <li>Start Date: {item.tour.startDate}</li>
                <li>location: {item.tour.location}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookedToursPage;
