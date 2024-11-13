import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AddEvent() 
{
  const [title, setTitle] = useState()
  const [imageUrl, setImageUrl] = useState()
  const [comments] = useState([])
  const [author, setAuthor] = useState()
  const [content, setContent] = useState()

  function handleSubmit(e){
    e.preventDefault()

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        image_url: imageUrl,
        content: content,
        author: author,
        comments: comments
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
  .then((response) => response.json())
  .then((res) =>{
    toast.success("Post saved successfully")
  });

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
        <h1 className='text-center text-green-800 font-semibold text-2xl mb-6'>Add Event</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-green-800">Title</label>
            <input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              type="text" 
              className="bg-gray-00 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
              required 
            />
          </div>
          
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-green-800">Image URL</label>
            <input 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              type="text" 
              className="bg-gray-00 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-green-800">Details</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
              required 
            />
          </div>
          
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-green-800">Author</label>
            <input 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"  
              required 
            />
          </div>
          <div className='flex justify-center'>
            <button type="submit" className="text-white bg-green-800 rounded p-2">
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}
