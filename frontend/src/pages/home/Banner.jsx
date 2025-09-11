import React from 'react'

import { getImageUrl } from '../../utils/getImg'

const Banner = () => {

    const BannerImg = getImageUrl("banner.png");
    return (
        <div className='flex flex-col-reverse md:flex-row pt-0 pb-16 justify-between items-center gap-12'>



            {/* {left side} */}
            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
                <p className='mb-10'>
                    It's time to update your reading list with some of the latest
                    and greatest releases in the literary world.
                    From heart-pumping thrillers to captivating memoirs,
                    this week's new releases offer something for everyone
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