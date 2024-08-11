import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import { useRef } from 'react';
import { getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,} from 'firebase/storage';
  import {updateUserSuccess,updateUserFailure,updateUserStart,deleteUserFailure,deleteUserStart,deleteUserSuccess, signOutUserStart} from '../redux/user/userSlice.js';
  import { useDispatch } from 'react-redux';

import {app} from '../firebase'
const Profile = () => {
  const fileRef =useRef(null)
  const {currentUser,loading,error}=useSelector((state)=>state.user);
const [file,setFile]=useState(undefined)
const [filePerc, setFilePerc] = useState(0);
const [formData, setFormData] = useState({});
const [fileUploadError, setFileUploadError] = useState(false);
const [updateSuccess, setUpdateSuccess] = useState(false);
const dispatch = useDispatch();

// console.log(formData)
// console.log(filePerc)
// console.log(formData)
  // console.log(file);
  useEffect(()=>{
    if(file){
handleFileUpload(file);
    }
  },[file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChangle =(e)=>{
    e.preventDefault();
    setFormData({...formData,[e.target.id]:e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut =async () => {
   try {
    signOutUserStart();
    const res = await fetch('/api/user/signout', {
      method: 'GET',
    })
    const data=await res.json();
    if (data.success === false) {
      dispatch(deleteUserFailure(data.message))
      return;
    }
    dispatch(deleteUserSuccess(data))
    // localStorage.clear();
    // window.location.href = '/';
   } catch (error) {
    dispatch(deleteUserFailure(error.message))
   }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={()=>fileRef.current.click()} className='rounded-full h-24 cursor-pointer object-cover w-24 self-center mt-2' src={formData.avatar || currentUser.avatar} alt="profile" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input onChange={handleChangle} type="text" placeholder='username' 
        defaultValue={currentUser.username} className='border p-3 rounded-lg' id='username'/>
        <input onChange={handleChangle} type="email" defaultValue={currentUser.email} placeholder='email'  className='border p-3 rounded-lg' id='email'/>
        <input type="password" onChange={handleChangle} placeholder='password'  className='border p-3 rounded-lg' id='password'/>
<button disabled={loading}  className='bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80% '>{
loading ? 'loading...' : 'update'
}</button>
      </form>  
      <div className='flex justify-between mt-5s'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer '>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer '>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'profile updated successfully' : ''}</p>
    </div>
  )
}

export default Profile