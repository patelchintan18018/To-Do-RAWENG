import { useState } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <form onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-3">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-3"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          Already have an account?{' '}
          <button
            onClick={handleLoginRedirect}
            className="text-blue-600 underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
