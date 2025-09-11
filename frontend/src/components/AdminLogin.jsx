import React from 'react'
import { useState } from 'react';

import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import getBaseUrl from '../utils/baseUrl';

const AdminLogin = () => {
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',

                }
            })
            // Navigate("/")
            const auth = response.data;
            console.log(auth)


            if (auth.token) {
                localStorage.setItem('token', auth.token)
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has expired, Please login again!')
                    navigate("/")
                }, 3600 * 1000)
            }
            alert("Login Sucessfully")
            navigate("/dashboard")

        } catch (error) {
            setMessage("Please enter existing email.")
            console.error(error)
        }
    }
    return (
        <div className='h-screen flex justify-center items-center'>

            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4 text-center'>Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text" name='username' id="username" placeholder='Username'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight
                            focus:outline-none focus:shadow' />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mt-2 mb-2'
                            htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password" name='password' id="password" placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight
                            focus:outline-none focus:shadow' />
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'> {message}</p>
                    }

                    <div className=' mt-5'>
                        <button className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-[29px] rounded focus:outline-none mt-50'>
                            Login
                        </button>
                    </div>
                </form>

                <p className='mt-5 text-center text-gray-500 text-xs'>All rights reserved</p>
            </div>
        </div >
    )
}

export default AdminLogin