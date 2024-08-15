import React, { useEffect, useState } from 'react';
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

import { useParams } from 'react-router-dom'
const Listing = () => {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [ listing,setListing]=useState(null);
    const [loading,setLoading] =useState(true);
    const [error,setError] =useState(false);
    useEffect(() => {
        const fetchListing = async()=>{
            try {
                const res = await fetch(`/api/listing/get/${params.id}`);
            const data = await res.json();
            console.log(data)
            if(data.success === false){
                setError(true);
                setLoading(false)
                return;
            }
            setListing(data);
            setLoading(false);
            setError(false)
            } catch (error) {
                setError(true);
                setLoading(false)
            }
            
        }
        fetchListing();
    },[])
  return (
   <main>
    {
        loading && <p className='text-center my-7 text-2xl'>Loading...</p>
    }
    {
        error && <p className='text-center my-7 text-2xl'>something went wrong...</p>
    }
    {
        listing && !loading && !error && (
            <>
            <Swiper navigation>
{listing.imageUrls.map((url)=>(
    <SwiperSlide key={url}>
         <div className="h-[550px]" style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover'}}></div>
    </SwiperSlide>
))}
            </Swiper>
            </>
        )
    }
   </main>
  )
}

export default Listing