import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register({ register_user }) {
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:5000/users', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        image_url: imageUrl,
        password: password,
        isAdmin: isAdmin,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        toast.success('Registration successful');
      })
      .catch((err) => {
        toast.error('Registration failed');
      });

    if (register_user) {
      register_user(username, isAdmin, password);
    }

    setUsername('');
    setPassword('');
    setRepeatPassword('');
    setImageUrl('');
    setIsAdmin(false);
  }

  return (
    <div className='grid w-auto  h-[80vh] mt-8 border border-gray-700'>
      <div className='bg-green-800 text-white flex justify-center items-center'>
        <Link to="/" className="grid justify-center items-center gap-4">
          <img src="/G.png" className="h-20" alt="G Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-500">Events</span>
        </Link>
      </div>
      <div className='flex flex-col justify-center items-center p-6'>
        <h1 className='text-center text-green-800 font-semibold text-2xl mb-6'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='w-full max-w-md'>
          <div className='mb-5'>
            <label className='block mb-2 text-md font-medium text-green-800'>
              Your Username
            </label>
            <input
              type='text'
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-00 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
              placeholder='Username'
              required
            />
          </div>
          <div className='mb-5'>
            <label className='block mb-2 text-md font-medium text-green-800'>
              Image URL
            </label>
            <input
              type='text'
              value={imageUrl || ''}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-gray-00 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
              placeholder='Image URL'
              required
            />
          </div>
          <div className='mb-5'>
            <label className='block mb-2 text-md font-medium text-green-800'>
              Your password
            </label>
            <input
              type='password'
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-00 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
              required
            />
          </div>
          <div className='mb-5'>
            <label className='block mb-2 text-md font-medium text-green-800'>
              Repeat password
            </label>
            <input
              type='password'
              value={repeatPassword || ''}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="bg-gray-00 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
              required
            />
          </div>
          <div className='mb-5'>
            <label className='block mb-2 text-md font-medium text-green-800'>
              Select
            </label>
            <select
              onChange={(e) => setIsAdmin(e.target.value === 'true')}
              value={isAdmin ? 'true' : 'false'}
              className="bg-gray-00 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
            >
              <option value='false'>User</option>
              <option value='true'>Admin</option>
            </select>
          </div>

          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-green-800 rounded p-2">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
