import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import $api from '../../services';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateTourPage() {
    const { data: basesData, isLoading: isBasesLoading } = useQuery({ queryKey: ["tours"], queryFn: async () => await $api.get("bases/adminGet") });
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        cost: '',
        status: '',
        text: '',
        amountDay: '',
        startDate: '',
        endDate: '',
        isBooked: false,
        base: ''
    });

    if (isBasesLoading) return <h1>Loading....</h1>;
    if (!basesData) return <h1>No data available</h1>;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const queryClient = useQueryClient()
    const navigation = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add logic to create a new tour
        await $api.post('tour/create', formData)
            .then(() => {
                queryClient.invalidateQueries({ queryKey: ["tours"] })
                navigation("/tour")
                toast.success("tour created successfully")
            })
        // Redirect or update UI as needed

    };

    return (
        <div className="min-h-screen ">
            <h1 className="text-2xl font-bold text-center mb-8">Create New Tour</h1>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Cost</label>
                    <input type="number" name="cost" value={formData.cost} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <input type="text" name="status" value={formData.status} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea name="text" value={formData.text} onChange={handleInputChange} className="w-full p-2 border rounded" required></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Duration (days)</label>
                    <input type="number" name="amountDay" value={formData.amountDay} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Start Date</label>
                    <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">End Date</label>
                    <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Booked</label>
                    <input type="checkbox" name="isBooked" checked={formData.isBooked} onChange={handleInputChange} className="w-4 h-4 text-blue-600" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Base</label>
                    <select name="base" value={formData.base} onChange={handleInputChange} className="w-full p-2 border rounded" required>
                        <option value="">Select a base</option>
                        {basesData.data.map(base => (
                            <option key={base.id} value={base.id}>{base.title}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Create Tour</button>
                </div>
            </form>
        </div>
    );
}

export default CreateTourPage;
