import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddEvent from './pages/AddEvent';
import EditEvent from './pages/EditEvent';
import Layout from './Layout';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';
import MyEvents from './pages/MyEvents';

const handleLogin = async (username, password) => {
  try {
    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      const token = `token-${user.id}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));

      return { success: true, user };
    } else {
      return { success: false, error: 'Invalid username or password' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
};

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      // Public Routes
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login onLogin={handleLogin} />,
      },
      {
        path: '/my-account',
        element: (
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/addevent',
        element: (
          <ProtectedAdminRoute>
            <AddEvent />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: '/admin/edit-event/:id',
        element: (
          <ProtectedAdminRoute>
            <EditEvent />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: '/admin/my-events',
        element: (
          <ProtectedAdminRoute>
            <MyEvents />
          </ProtectedAdminRoute>
        ),
      },
      // 404 route
      {
        path: '*',
        element: <NoPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
