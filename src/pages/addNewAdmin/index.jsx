import React, { useState, useEffect } from 'react';
import scss from "./addNewAdmin.module.scss";
import $api from '../../services';
import { toast } from 'react-toastify';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AddNewAdmin() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isCreated, setIsCreated] = useState(false);
    const [createdUser, setUser] = useState(null);

    const queryClient = useQueryClient()

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
                setUser(result);
                setIsCreated(true);
                toast.success("Success created!");
            } else {
                toast.error("Write phone number & password");
            }
        } catch (error) {
            toast.error("This user is already exist!");
        }
    };

    const mutation = useMutation({
        mutationFn: (e) => onCreateNewAdmin(e),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin"] })
        }
    })

    console.log(data);

    return (
        <>
            <form className={scss.wrapper} onSubmit={(e) => { mutation.mutate(e) }}>
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <button className="bg-blue-950 hover:bg-blue-600 transition-all">Create new Admin</button>
            </form>
            <div>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {data && (
                    <ul>
                        {data?.map((user) => (
                            <li key={user.id}>
                                {user.phoneNumber} ({user.role})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}