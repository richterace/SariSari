import React, { useState } from 'react'
import { href, Link, useNavigate } from 'react-router-dom'
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi";
// import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi2";


import { getImageUrl } from '../utils/getImg';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';


const navigation =
    [
        { name: "Dashboard", href: "/user-dashboard" },
        { name: "Orders", href: "/orders" },
        { name: "Cart Page", href: "/cart" },
        { name: "Checkout", href: "/checkout" }
    ]


const Navbar = () => {

    // imports of images
    const profileImg = getImageUrl('avatar.png');


    // functions for searching
    const [searchTerm, setSearchTerm]= useState("");
    const navigate = useNavigate();

    // const handleSearch = (e) => {
    //     if (e.key === "Enter" && searchTerm.trim()) {
    //         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    //     }
    //     };

      // debounce navigation
    useEffect(() => {
        if (!searchTerm.trim()) return;
        const delayDebounce = setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounce);
    }, [searchTerm, navigate]);

    //functions to be used
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // console.log(isDropdownOpen)

    const cartItems = useSelector(state => state.cart.cartItems)
    // console.log(cartItems)

    // const currentUser = false;
    const { currentUser, logout } = useAuth()

    // to handle logout
    const handleLogout = () => {
        logout()
    }
    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6'>
            <nav className='flex justify-between items-center'>
                {/* {left side} */}
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/">
                        <HiBars3CenterLeft className='size-6' />
                    </Link>

                    {/* {Search Input} */}
                    <div className='relative sm:w-72 w-20 space-x-2'>
                        <IoIosSearch className='absolute inline-block left-3 inset-y-2' />
                         <input
                            type="text"
                            placeholder="Search here"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                    </div>
                </div>

                {/* {right side} */}
                <div className='relative flex items-center md:space-x-3 space-x-2'>

                    <div>
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={profileImg} alt=""
                                        className={`size-7 rounded-full mt-2 mr-2   
                                        ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                </button>
                                {/* {show dropdowns} */}
                                {
                                    isDropdownOpen && (
                                        <div className='absolute right-0 mt-2 w-48 bg-white
                                        shadow-lg rounded-md z-40'>
                                            <ul className='py-2'>
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                            <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> : <Link to="/login"><HiOutlineUser className='size-6' /></Link>
                        }
                    </div>
                    {/* <Link to="/cart">
                    <button className='hidden sm:block'>
                        <HiOutlineHeart className='size-6' />
                    </button>
                    </Link> */}
                    <Link to="/cart" className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                        <HiOutlineShoppingCart className='' />
                        {
                            cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span>
                                : <span className='text-sm font-semibold sm:ml-1'>0</span>
                        }

                    </Link>

                </div>

            </nav>

        </header>
    )
}

export default Navbar