import React from "react";
import $api from "../../services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function BookedProductPage() {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const res = await $api.get("booked-product/adminGet");
    return res.data;
  };

  const { data, isLoading } = useQuery({ queryKey: ["bookedproduct"], queryFn: fetchData });

  const updateData = async ({ id, updatedFields }) => {
    await $api.put(`booked-product/${id}`, updatedFields);
  };

  const mutation = useMutation( {
    mutationFn:updateData,
    onSuccess: () => {
      queryClient.invalidateQueries("bookedproduct");
    },
  });

  const toggleIsPickUp = (id, currentStatus , item) => {
    mutation.mutate({ id, updatedFields: {  ...item  , isPickUp: !currentStatus  } });
  };

  const toggleIsRefund = (id, currentStatus , item) => {
    mutation.mutate({ id, updatedFields: {  ...item , isRefund: !currentStatus } });
  };

  if (isLoading) return <h1 className="text-center text-xl">Loading...</h1>;

  return (
    <section className="">
      <h1 className="text-2xl font-bold mb-4">Booked Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.filter((item) => item.isRefund === false).map(item => (
          <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">Название: {item.product.title}</h2>
            <img style={{paddingBottom: 15}} src={item.product.image} alt={item.product.title} />
            <p className="mb-2"><strong>Amount:</strong> {item.amount}</p>
            <p className="mb-2"><strong>End Date:</strong> {item.endDate}</p>
            <p className="mb-2"><strong>Is PickUp:</strong> {item.isPickUp ? "Yes" : "No"}</p>
            <p className="mb-2"><strong>Is Refund:</strong> {item.isRefund ? "Yes" : "No"}</p>
            <div className="mb-2">
              <strong>Product Details:</strong>
              <ul className="list-disc pl-4">
                <li>Amount: {item.product.amount}</li>
                <li>Color: {item.product.color}</li>
                <li>Cost: {item.product.cost}</li>
                <li>End Date: {item.product.endDate}</li>
                <li>Gender: {item.product.gender}</li>
                <li>ID: {item.product.id}</li>
                <li>Is Booked: {item.product.isBooked ? "Yes" : "No"}</li>
                <li>Size: {item.product.size}</li>
                <li>Start Date: {item.product.startDate}</li>
                <li>Type: {item.product.type}</li>
              </ul>
            </div>
            <div className="flex justify-between gap-4 pt-3">
              <button
                onClick={() => toggleIsPickUp(item.id, item.isPickUp , item)}
                className={`bg-blue-500 text-white py-1 px-2 rounded ${mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={mutation.isLoading}
              >
                Забрал
              </button>
              <button
                onClick={() => toggleIsRefund(item.id, item.isRefund , item)}
                className={`bg-green-500 text-white py-1 px-2 rounded ${mutation.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={mutation.isLoading}
              >
                Вернул
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookedProductPage;
