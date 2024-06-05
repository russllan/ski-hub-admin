import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import $api from '../../services';
import "./EditBaseModal.css"

Modal.setAppElement('#root'); // Ensure screen readers work

function EditBaseModal({ isOpen, onRequestClose, base, onUpdate }) {
    const [formData, setFormData] = useState({ ...base });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await $api.put(`/bases/${base.id}`, formData);
            toast.success('Base updated successfully!');
            onUpdate();
            onRequestClose();
        } catch (error) {
            toast.error('Failed to update base!');
        }
    };

    const hanldleDelete = async (e) => {
        e.preventDefault();

        try {
            await $api.delete("/bases/" + base.id)
            toast.success('Base deleted successfully!');
            onUpdate();
            onRequestClose();
        } catch {
            toast.error('Failed to update base!');
        }
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
            <h2>Edit Base</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Text</label>
                    <textarea name="text" value={formData.text} onChange={handleChange} />
                </div>
                <div className='flex gap-2'>
                    <button type="submit">Save</button>
                    <button onClick={hanldleDelete} className=' bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 transition'>Delete</button>
                </div>
            </form>
        </Modal>
    );
}

export default EditBaseModal;
