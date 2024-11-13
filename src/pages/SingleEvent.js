import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SingleEvent() 
{
  const nav = useNavigate()
  const {id} = useParams()
  const [post, setPost] = useState({})



  return (
    <div className='flex justify-center'>
      

<div className="w-[50vw] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div>
        <img className="rounded-t-lg w-full h-[50vh]" src={post.image_url}  alt={post.title} />
    </div>


    <button onClick={()=> console.log("Delete")} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Delete
    </button>

    <Link to="" type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
            Update Event
    </Link>

</div>


    </div>
  )
}