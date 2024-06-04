import React, { useState } from 'react'
import scss from "./addNewAdmin.module.scss"
import $api from '../../services'
import { toast } from 'react-toastify'

export default function AddNewAdmin() {

    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")

    const [isCreated, setIsCreated] = useState(false)

    const [createdUser, setUser] = useState(null)


    console.log(createdUser);
    const onCreateNewAdmin = async (e) => {
        e.preventDefault()
        try {
            const res = await $api.post("/user/create", {
                phoneNumber,
                password,
                role: "admin",
                isBanned: false
            })
                .finally(() => {
                    setPassword("")
                    setPhoneNumber("")
                })

            setUser(res.data)
            setIsCreated(true)
            toast.success("Success created!")
        } catch (e) {
            toast.error("This user is already exist!")
        }
    }

    return (
        <>
            <form className={scss.wrapper} onSubmit={(e) => onCreateNewAdmin(e)}>
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type='text' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                <button>Create new Admin</button>
            </form>
            <div>
                {
                    isCreated && <h5>{createdUser.user.phoneNumber}</h5>
                }
            </div>

        </>
    )
}
