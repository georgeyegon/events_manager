import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const Event = ({ event, onBookingUpdate }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
        const adminStatus = JSON.parse(localStorage.getItem('isAdmin') || 'false');
        
        setIsLoggedIn(!!currentUser);
        setIsAdmin(adminStatus);
        setUser(currentUser);

        // Only check booked events if we have both user data and event id
        if (currentUser?.bookedEvents && event?.id) {
          setIsBooked(currentUser.bookedEvents.includes(event.id));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setUser(null);
        setIsBooked(false);
      }
    };

    loadUserData();
  }, [event?.id]); // Safe dependency using optional chaining

  const updateUserBookings = useCallback(async (updatedBookings) => {
    if (!isLoggedIn || !user?.id) {
      toast.error('Please log in to continue');
      return;
    }

    try {
      const response = await fetch(`https://events-manager-5wr8.onrender.com/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookedEvents: updatedBookings
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedUser = { ...user, bookedEvents: updatedBookings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      if (onBookingUpdate) {
        onBookingUpdate(updatedUser);
      }

      return updatedUser;
    } catch (error) {
      console.error('Error updating bookings:', error);
      throw error;
    }
  }, [user, onBookingUpdate, isLoggedIn]);

  const handleBookEvent = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to book events');
      return;
    }

    if (!event?.id) {
      toast.error('Event information is not available');
      return;
    }

    setIsLoading(true);
    try {
      const currentBookings = user?.bookedEvents || [];
      if (currentBookings.includes(event.id)) {
        throw new Error('Event already booked');
      }

      const updatedBookings = [...currentBookings, event.id];
      await updateUserBookings(updatedBookings);
      setIsBooked(true);
      toast.success('Event booked successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to book event');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEvent = async () => {
    if (!isLoggedIn) {
      toast.error('Please log in to cancel bookings');
      return;
    }

    if (!event?.id || !user?.bookedEvents) {
      toast.error('Unable to cancel booking at this time');
      return;
    }

    setIsLoading(true);
    try {
      const updatedBookings = user.bookedEvents.filter(id => id !== event.id);
      await updateUserBookings(updatedBookings);
      setIsBooked(false);
      setShowConfirmDialog(false);
      toast.success('Event cancelled successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking');
    } finally {
      setIsLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="border rounded-lg p-4 bg-white shadow-md">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-4">
        <h1 className="text-2xl text-green-800 font-semibold text-center">{event.title}</h1>
        
        {event.image_url && (
          <div className="bg-gray-100 rounded-lg h-64 w-full">
            <img 
              src={event.image_url} 
              alt={event.title} 
              className="w-full h-64 object-contain rounded-lg"
            />
          </div>
        )}
        
        <p className="text-gray-700">{event.content}</p>
        
        <p className="text-sm">
          Hosted By: <span className="italic text-green-800 font-medium">{event.author}</span>
        </p>

        {isLoggedIn && !isAdmin && (
          <>
            {isBooked ? (
              <>
                <button
                  onClick={() => setShowConfirmDialog(true)}
                  disabled={isLoading}
                  className="w-full mt-4 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    'Cancel Event'
                  )}
                </button>

                {showConfirmDialog && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                      <h3 className="text-lg font-semibold mb-4">Cancel Event Booking</h3>
                      <p className="text-gray-600 mb-6">
                        Are you sure you want to cancel your booking for "{event.title}"? This action cannot be undone.
                      </p>
                      <div className="flex justify-end space-x-4">
                        <button
                          onClick={() => setShowConfirmDialog(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Keep Booking
                        </button>
                        <button
                          onClick={handleCancelEvent}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Yes, Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={handleBookEvent}
                disabled={isLoading}
                className="w-full mt-4 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  </div>
                ) : (
                  'Book Event'
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Event;
