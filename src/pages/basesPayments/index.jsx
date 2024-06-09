import React, { useEffect, useState } from "react";
import $api from "../../services";
import { toast } from "react-toastify";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


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

    const getChartData = () => {
        const labels = payments.map(payment => new Date(payment.createdAt).toLocaleDateString());
        const data = payments.map(payment => payment.price / 100 );
    
        return {
          labels,
          datasets: [
            {
              label: 'Payment Amount',
              data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }
          ]
        };
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
                    <h2 className="text-2xl font-bold mb-4">Payments for {selectedBase?.title} {payments?.length && <> <h2> Вся сумма {payments?.reduce((acc, el) => acc + el.price, 0) / 100} сом</h2></>}</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg shadow-md">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Currency</th>
                                    <th className="py-3 px-6 text-left">Price</th>
                                    <th className="py-3 px-6 text-left">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {payments?.map((payment) => (
                                    <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{payment.currency}</td>
                                        <td className="py-3 px-6 text-left">{payment.price / 100} сом</td>
                                        <td className="py-3 px-6 text-left">{payment.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
           <div className="bg-white rounded-lg shadow-md p-6">
            <Line data={getChartData()} />
          </div>
        </div>
    );
}

export default BasesPayments;
