import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function MyEvents() {
  const [user, setUser] = useState(null);
  const [postedEvents, setPostedEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser && currentUser.isAdmin) {
      setIsLoggedIn(true);
      setIsAdmin(true);
      setUser(currentUser);
      fetchPostedEvents(currentUser.postedEvents);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const fetchPostedEvents = async (eventIds) => {
    try {
      const events = await Promise.all(
        eventIds.map((eventId) =>
          fetch(`http://localhost:5000/posts/${eventId}`).then((res) => res.json())
        )
      );
      setPostedEvents(events);
    } catch (error) {
      toast.error('Failed to load posted events');
      console.error(error);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!user) return;

    const updatedPostedEvents = user.postedEvents.filter(
      (id) => id !== eventId
    );

    try {
      await fetch(`http://localhost:5000/posts/${eventId}`, {
        method: 'DELETE',
      });

      const response = await fetch(`http://localhost:5000/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postedEvents: updatedPostedEvents }),
      });
      const updatedUser = await response.json();

      setUser(updatedUser);
      setPostedEvents(updatedUser.postedEvents);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Event deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete event');
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/edit-event/${id}`);
  };

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return (
    <div className="grid w-auto mt-8 ">
      <div className="bg-green-800 text-white flex justify-center items-center">
        <Link to="/" className="grid justify-center items-center gap-4">
          <img src="/G.png" className="h-20" alt="G Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-500">Events</span>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center p-6">
        <h1 className="text-center text-green-800 font-semibold text-2xl mb-6">My Posted Events</h1>
        <div>
          {postedEvents.length === 0 ? (
            <p>No events posted yet.</p>
          ) : (
            <ul>
              {postedEvents.map((event) => (
                <li key={event.id} className="mb-4 border-b border-gray-300 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <h4 className="text-lg font-semibold text-green-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.content}</p>
                    </div>
                    <div className="flex justify-end space-x-2">
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => handleUpdate(event.id)}
                            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                          >
                            Update
                          </button>
                            <button
                              onClick={() => deleteEvent(event.id)}
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            >
                              Delete
                            </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}