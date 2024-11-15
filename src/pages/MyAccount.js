import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function MyAccount() {
  const [user, setUser] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser) {
      setIsLoggedIn(true);
      setIsAdmin(currentUser.isAdmin);
      setUser(currentUser);

      if (!currentUser.isAdmin && Array.isArray(currentUser.bookedEvents)) {
        fetchBookedEvents(currentUser.bookedEvents);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const fetchBookedEvents = async (eventIds) => {
    try {
      const events = await Promise.all(
        eventIds.map((eventId) =>
          fetch(`https://events-manager-5wr8.onrender.com/events/${eventId}`).then((res) => res.json())
        )
      );
      setBookedEvents(events);
    } catch (error) {
      toast.error('Failed to load booked events');
      console.error(error);
    }
  };

  const cancelEvent = async (eventId) => {
    if (!user) return;

    const updatedBookedEvents = user.bookedEvents.filter(
      (id) => id !== eventId
    );

    try {
      const response = await fetch(`https://events-manager-5wr8.onrender.com/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookedEvents: updatedBookedEvents }),
      });
      const updatedUser = await response.json();

      setUser(updatedUser);
      setBookedEvents(updatedUser.bookedEvents);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Event booking canceled successfully!');
    } catch (error) {
      toast.error('Failed to cancel booking');
      console.error(error);
    }
  };

  if (!isLoggedIn) {
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
        <h1 className="text-center text-green-800 font-semibold text-2xl mb-6">My Profile</h1>
        <div className="text-center">
          <img
            src={user?.image_url}
            alt="User"
            className="rounded-full h-24 w-24 mb-4"
          />
          <h2 className="text-lg font-semibold text-green-800">{user?.username}</h2>
        </div>

        {isAdmin ? (
          <div className="mt-6 w-full max-w-md">
            <h3 className="text-red-600 font-semibold text-xl mb-4">Admin Access</h3>
            <p>You have admin rights, but cannot book or cancel events.</p>
          </div>
        ) : (
          <div className="mt-6 w-full max-w-md">
            <h3 className="text-green-800 font-semibold text-xl mb-4">Booked Events</h3>
            <div>
              {bookedEvents.length === 0 ? (
                <p>No events booked yet.</p>
              ) : (
                <ul>
                  {bookedEvents.map((event) => (
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
                        <button
                          onClick={() => cancelEvent(event.id)}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
