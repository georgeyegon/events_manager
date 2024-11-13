import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';

export default function Post({post, setOndelete}) 

{
  const [isAdmin, setIsAdmin] = useState(false);

    const handleDelete = (id) =>{
        fetch(`http://localhost:5000/posts/${id}`, {
            method: 'DELETE',
          })
        .then((res) => res.json())
        .then((response)=>{
            setOndelete(id)
            toast.success("Post deleted successfully!")
        })
    }

    return (
    <div className='border p-3 bg-gray-300' >
        <Link to="/event/:id" className=''>
            <h1 className='flex justify-center py-4 text-xl font-semibold'>{post.title}</h1>
            {post.image_url && (
                <img  src={post.image_url}  alt={post.title}  className='w-full h-64 mb-4' />
                )}
            <p>{post.content}</p>
            <p>By <span className='italic text-green-800'>{post.author}</span> </p>
            {/* <div className='bg-gray-300 p-4'>
            <h5>Comments {post.comments.length}</h5>
            {
            post.comments && post.comments.map((comment)=>(
                <div className='p-2 bg-white mt-4' key={comment.id}>
                <p>{comment.text}</p>
                <p>{comment.author}</p>
                </div>
            ))
            }
            </div> */}
            <div className="m-4">
                {isAdmin && (
                    <button 
                        onClick={() => handleDelete(post.id)} 
                        type="button" 
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                        Delete
                    </button>
                )}
            </div>
        </Link>
    </div>
  )
}
