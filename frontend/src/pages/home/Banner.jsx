import React from 'react'

import { getImageUrl } from '../../utils/getImg'

const Banner = () => {

    const BannerImg = getImageUrl("bgpicture.webp");
    return (
        <div className='flex flex-col-reverse md:flex-row pt-0 pb-16 justify-between items-center gap-12'>



            {/* {left side} */}
            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'>Sari-Sari Store</h1>
                <p className='mb-10'>
                    At Sari-Sari Store, we bring convenience right to your fingertips. 
                    Whether you're looking for everyday essentials, snacks, beverages, 
                    or household items, we’ve got everything you need — all in one place.
            <br /> 
            <br />
                🛒 Browse our online price list, check item availability, 
                    and plan your purchases before heading out. 
                    No more guessing — just easy, transparent shopping.
                </p>
                <button className='btn-primary'>
                    Subscribe
                </button>
            </div>

            {/* {right side} */}
            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img src={BannerImg} alt="" className='' />

            </div>


        </div>
    )
}

export default Banner