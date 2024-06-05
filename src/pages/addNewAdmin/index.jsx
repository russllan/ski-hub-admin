import React, { useState, useEffect } from 'react';
import scss from "./addNewAdmin.module.scss";
import $api from '../../services';
import { toast } from 'react-toastify';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AddNewAdmin() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");


    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const response = await $api.get('/user/get');
            return response.data;
        },
    });

    const onCreateNewAdmin = async (e) => {
        e.preventDefault();
        try {
            if (phoneNumber !== "" && password !== "") {
                const result = await $api.post("/user/create", {
                    phoneNumber,
                    password,
                    role: "admin",
                    isBanned: false,
                });
                toast.success("Successfully created!");
                queryClient.invalidateQueries({ queryKey: ["admin"] });
            } else {
                toast.error("Write phone number & password");
            }
        } catch (error) {
            toast.error("This user already exists!");
        }
    };

    const onToggleBanAdmin = async (id, isBanned) => {
        try {
            await $api.put(`/user/adminUpdate/${id}`, { isBanned: !isBanned });
            toast.success(`Admin ${!isBanned ? 'banned' : 'unbanned'} successfully!`);
            queryClient.invalidateQueries({ queryKey: ["admin"] });
        } catch (error) {
            toast.error(`Failed to ${!isBanned ? 'ban' : 'unban'} admin!`);
        }
    };

    // const onDeleteAdmin = async (id) => {
    //     try {
    //         await $api.delete(`/user/delete/${id}`);
    //         toast.success("Admin deleted successfully!");
    //         queryClient.invalidateQueries({ queryKey: ["admin"] });
    //     } catch (error) {
    //         toast.error("Failed to delete admin!");
    //     }
    // };

    const mutation = useMutation({
        mutationFn: (e) => onCreateNewAdmin(e),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin"] });
        }
    });

    return (
        <>
            <form className={scss.wrapper} onSubmit={(e) => { mutation.mutate(e) }}>
                <div className={scss.inputContainer}>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" />
                </div>
                <div className={scss.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>
                <button className={`${scss.createButton}`}>Create new Admin</button>
            </form>
            <div className={scss.adminList}>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && (
                    <ul>
                        {data?.map((user) => (
                            <li key={user.id} className={`${scss.adminItem} ${user.isBanned ? scss.banned : ''}`}>
                                {user.phoneNumber} ({user.role})
                                <div className={scss.buttonContainer}>
                                    <button className={scss.banButton} onClick={() => onToggleBanAdmin(user.id, user.isBanned)}>
                                        {user.isBanned ? 'Unban' : 'Ban'}
                                    </button>
                                    {/* <button className={scss.deleteButton} onClick={() => onDeleteAdmin(user.id)}>Delete</button> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
