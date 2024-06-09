import React, { useEffect, useState } from "react";
import $api from "../../services";
import { toast } from "react-toastify";

function BasesPayments() {
  const [adminBases, setBases] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);

  const getMineBases = async () => {
    try {
      const res = await $api.get("/bases/adminGet");
      setBases(res.data);
    } catch (e) {
      toast.error("No Tours you have yet");
    }
  };

  const getPayments = async (baseId) => {
    try {
      const res = await $api.get(`/payment/adminGet/${baseId}`);
      setPayments(res.data);
    } catch (e) {
      toast.error("Failed to fetch payments");
    }
  };

  useEffect(() => {
    getMineBases();
  }, []);

  const handleBaseClick = (base) => {
    setSelectedBase(base);
    getPayments(base.id);
  };

  return (
    <div className="p-6min-h-screen">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Bases</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Text</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {adminBases.map((base) => (
                <tr
                  key={base.id}
                  onClick={() => handleBaseClick(base)}
                  className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">{base.title}</td>
                  <td className="py-3 px-6 text-left">{base.address}</td>
                  <td className="py-3 px-6 text-left">{base.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {selectedBase && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Payments for {selectedBase.title}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">User</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">{payment.user.name}</td>
                    <td className="py-3 px-6 text-left">{payment.amount}</td>
                    <td className="py-3 px-6 text-left">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default BasesPayments;
