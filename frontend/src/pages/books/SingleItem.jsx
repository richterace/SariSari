import React from 'react'
import { getBookData } from '../../utils/getBookData'
import { useParams } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchItemByIdQuery } from '../../redux/features/items/itemsApi';


const SingleItem = () => {

    const { id } = useParams();
    const { data: item, isLoading, isError } = useFetchItemByIdQuery(id);

    if (isLoading) return <div>Loading....</div>
    if (isError) return <div>Error Encountered...</div>

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    return (
        <div className="max-w-lg justify-items-center shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{item.title}</h1>

            <div className='justify-items-center'>
                <div>
                    <img
                        src={`${getBookData(item.coverImage)}`}
                        alt={item.title}
                        className="mb-8"
                    />
                </div>

                <div className='mb-5 justify-items-center'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {item.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(item?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {item?.category}
                    </p>
                    <p className="text-gray-700 text-center"><strong>Description:</strong> {item.description}</p>
                </div>

                <button onClick={() => handleAddToCart(item)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
            </div>
        </div>
    )
}

export default SingleItem