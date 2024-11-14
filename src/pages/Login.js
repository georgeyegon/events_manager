import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      const result = await onLogin(username, password);
      console.log(username);

      if (result && result.success) {
        navigate('/');
      } else {
        setError(result?.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="grid w-auto h-[80vh] mt-8 border border-gray-700">
      <div className="bg-green-800 text-white flex justify-center items-center">
        <Link to="/" className="grid justify-center items-center gap-4">
          <img src="/G.png" className="h-20" alt="G Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-500">
            Events
          </span>
        </Link>
      </div>

      <div className="flex flex-col justify-center items-center p-6">
        <h2 className="text-center text-green-800 font-semibold text-2xl mb-6">Login</h2>
        
        {error && <div className="text-red-500 mb-4">{error}</div>}
        
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div>
            <label className='block mb-2 text-md font-medium text-green-800'>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label className='block mb-2 text-md font-medium text-green-800'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
            />
          </div>

          <div className='flex justify-center mt-4'>
            <button type="submit" className="text-white bg-green-800 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Login
            </button>
          </div>
        </form>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-green-800 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
