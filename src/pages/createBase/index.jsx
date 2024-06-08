import React, { useState } from 'react';
import $api from '../../services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateBase = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        imageSlapes: '',
        address: '',
        text: ''
    });


    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const base64 = await toBase64(file);
        setFormData({
            ...formData,
            [e.target.name]: base64
        });
    };

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const onCreate = async () => {
        await $api.post("/bases/create", {
            ...formData
        }).then(() => {
            toast.success("Base createt successfylly!")
            navigate("/adminHome")
        }).catch(() => {
            toast.error("Too large request")
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onCreate()
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4">
            <h1 className="text-3xl font-bold mb-4">Создать базу</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full ">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Название
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        URL изображения
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageSlapes">
                        URL изображения слайда
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="imageSlapes"
                        type="file"
                        name="imageSlapes"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Адрес
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                        Текст
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="text"
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                        type="submit"
                    >
                        Создать карточку
                    </button>
                </div>
            </form>
            {
                formData?.image &&
                <div>
                    <h1>Главное изображение</h1>
                    <img className='w-[500px]' src={formData?.image} alt="" />
                </div>
            }
        </div>
    );
};

export default CreateBase;
