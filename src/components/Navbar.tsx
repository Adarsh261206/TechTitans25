import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);               // Remove from context
    localStorage.removeItem('token'); // Remove from localStorage
    navigate('/login');           // Redirect to login page
  };

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">StackIt</Link>
      <div className="space-x-4">
        <Link to="/ask">Ask</Link>

        {token ? (
          <>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
