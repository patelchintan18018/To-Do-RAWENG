import { useState } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/tasks');
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/'); 
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4">
      <form onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-3">Login</h2>
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
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
      <div className="text-center">
        <p>
          Don't have an account?{' '}
          <button
            onClick={handleRegisterRedirect}
            className="text-blue-600 underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
