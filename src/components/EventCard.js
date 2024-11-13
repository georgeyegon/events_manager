import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function EventCard({post}) 
{


  return (
    <Link to={`/event/${post.id}`} className='border p-3 bg-gray-200' >
        <div>
           <img class="rounded-t-lg w-full h-[50vh]" src="" alt="" />
        </div>
        <h1 className='text-xl font-semibold'>{post.title}</h1>
        <p>{post.content}</p>
        <p>By <span className='italic'>{post.author}</span> </p>
        
  </Link>
  )
}