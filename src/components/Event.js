import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const Post = ({ post, onBookingUpdate }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const adminStatus = JSON.parse(localStorage.getItem('isAdmin'));
    const currentUser = JSON.parse(localStorage.getItem('user'));
    setIsAdmin(adminStatus);
    setUser(currentUser);

    if (currentUser?.bookedEvents) {
      setIsBooked(currentUser.bookedEvents.includes(post.id));
    }
  }, [post.id]);

  const updateUserBookings = useCallback(async (updatedBookings) => {
    if (!user) return;

    const response = await fetch(`http://localhost:5000/users/${user.id}`, {
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
  }, [user, onBookingUpdate]);

  const handleBookEvent = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('Please log in to book events');
      }

      const currentBookings = user.bookedEvents || [];
      if (currentBookings.includes(post.id)) {
        throw new Error('Event already booked');
      }

      const updatedBookings = [...currentBookings, post.id];
      await updateUserBookings(updatedBookings);
      setIsBooked(true);
      toast.success('Event booked successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEvent = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error('Please log in to cancel bookings');
      }

      const updatedBookings = user.bookedEvents.filter(id => id !== post.id);
      await updateUserBookings(updatedBookings);
      setIsBooked(false);
      setShowConfirmDialog(false);
      toast.success('Event cancelled successfully!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="space-y-4">
        <h1 className="text-2xl text-green-800 font-semibold text-center">{post.title}</h1>
        
        {post.image_url && (
          <div className="bg-gray-100 rounded-lg h-64 w-full">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-64 object-contain rounded-lg"
          />
        </div>
        )}
        
        <p className="text-gray-700">{post.content}</p>
        
        <p className="text-sm">
          Hosted By: <span className="italic text-green-800 font-medium">{post.author}</span>
        </p>

        {user && !isAdmin && (
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
                        Are you sure you want to cancel your booking for "{post.title}"? This action cannot be undone.
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

export default Post;
