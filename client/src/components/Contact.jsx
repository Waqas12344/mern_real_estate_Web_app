import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Contact = ({listing}) => {
    const[landlord,setLandloard]=useState(null);
    const [message,setMessage]=useState('');
    useEffect(()=>{
        const fetchLandlord=async()=>{
            try {
                const res =await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandloard(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandlord();
    },[listing.userRef]);

    const onChange=(e)=>{
        // e.preventdefault();
        setMessage(e.target.value)

    }
  return (
   <div>
    {
        landlord&& (
            <div className=" flex flex-col gap-2">
                <p>Contact <span className='font-semibold'>{landlord.username}</span>
                <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                </p>
                <textarea onChange={onChange}  name="message" id="message"  rows="2" placeholder='Enter your message here' value={message} className='w-full   p-3 rounded-lg'></textarea>

                <Link to={`mailto:${landlord.email}?subject=Regarding${listing.name}&body=Hi ${message}`} className='text-white text-center bg-slate-700 p-3 uppercase hover:opacity-95 rounded-lg'>
                Send Message</Link>
            </div>
        )
    }
   </div>
  )
}

export default Contact