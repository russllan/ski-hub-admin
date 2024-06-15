import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import $api from '../../services';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root'); // Set this to your root element

function ToursPage() {
    const { data, isLoading } = useQuery({ queryKey: ["tours"], queryFn: async () => await $api.get("tour/adminGet") });
    const [selectedTour, setSelectedTour] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate()


    const queryClient = useQueryClient()

    const openModal = (tour) => {
        setSelectedTour(tour);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedTour(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedTour(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSave = async () => {
        // Logic to save the changes
        await $api.put(`tour/${selectedTour.id}`, selectedTour);
        queryClient.invalidateQueries({ queryKey: ["tours"] })
        closeModal();
    };

    const handleDelete = async () => {
        // Logic to save the changes
        await $api.delete(`tour/${selectedTour.id}`);
        queryClient.invalidateQueries({ queryKey: ["tours"] })
        closeModal();
    };

    if (isLoading) return <h1>Loading....</h1>;
    if (!data) return <h1>No data available</h1>;

    return (
        <div className="min-h-screen p-4">
            <div className='flex  justify-between mb-5'>
                <h1 className="text-2xl font-bold text-center mb-8">Tours</h1>

                <button
                    className="cursor-pointer bg-blue-400  px-5 rounded-md text-white"
                    onClick={() => navigate("create")}
                >Create Tour</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.data.map(tour => (
                    <div key={tour.id} className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={() => openModal(tour)}>
                        <h2 className="text-xl font-bold mb-2">{tour.title}</h2>
                        <p className="text-gray-600 mb-2">Location: {tour.location}</p>
                        <p className="text-gray-600 mb-2">Cost: ${tour.cost}</p>
                        <p className="text-gray-600 mb-2">Status: {tour.status}</p>
                        <p className="text-gray-600 mb-4">{tour.text}</p>
                        <p className="text-gray-600 mb-2">Duration: {tour.amountDay} days</p>
                        <p className="text-gray-600 mb-2">Start Date: {new Date(tour.startDate).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-2">End Date: {new Date(tour.endDate).toLocaleDateString()}</p>
                        <p className={`text-sm ${tour.isBooked ? 'text-red-500' : 'text-green-500'}`}>
                            {tour.isBooked ? 'Booked' : 'Available'}
                        </p>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Tour"
                className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mt-20 w-[500px]"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            >
                {selectedTour && (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Edit Tour</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input type="text" name="title" value={selectedTour.title} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Location</label>
                            <input type="text" name="location" value={selectedTour.location} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image</label>
                            <input type="text" name="image" value={selectedTour.image} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Cost</label>
                            <input type="number" name="cost" value={selectedTour.cost} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Status</label>
                            <input type="text" name="status" value={selectedTour.status} onChange={handleInputChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Text</label>
                            <textarea name="text" value={selectedTour.text} onChange={handleInputChange} className="w-full p-2 border rounded"></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={closeModal} className="mr-4 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                            <button onClick={handleDelete} className="mr-4 px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ToursPage;
