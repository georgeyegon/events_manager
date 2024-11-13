import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import AddEvent from './pages/AddEvent';
import Layout from "./Layout";
import AdminLayout from './AdminLayout';
import AdminLogin from './pages/AdminLogin';
import NoPage from './pages/NoPage';
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle Login (mock API call)
  const handleLogin = (username, password) => {
    // Make a POST request to the login endpoint
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(users => {
        // Find if any user matches the username and password
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
          setIsAuthenticated(true);  // Set authenticated status
          alert('Login successful');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Login error', error);
        alert('An error occurred during login');
      });
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addevent' element={<AddEvent />} />
          <Route path='/login' element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
          <Route path="*" element={<NoPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin/' element={<AdminLayout />}>
          <Route path='login' element={<AdminLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
