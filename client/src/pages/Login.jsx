import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { showError, showSuccess } from '../utils/toastUtils';
import { parseApiError } from '../utils/parseApiError';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      showError('Email and password are required');
      return;
    }

    setLoading(true);

    try {
      const res = await API.post('/auth/login', {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      localStorage.setItem('token', res.data.token);
      showSuccess('Login successful');
      navigate('/dashboard');
    } catch (err) {
      showError(parseApiError(err) || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black font-sans">
  <form
    onSubmit={handleSubmit}
    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white transition-all duration-300 hover:scale-[1.02]"
    aria-label="Login Form"
  >
    <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Sign In</h2>

    <label htmlFor="email" className="block mb-1 font-medium text-gray-300">
      Email
    </label>
    <input
      id="email"
      type="email"
      placeholder="Enter your email"
      className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => setEmail(email.trim())}
      required
      aria-required="true"
    />

    <label htmlFor="password" className="block mb-1 font-medium text-gray-300">
      Password
    </label>
    <input
      id="password"
      type="password"
      placeholder="Enter your password"
      className="w-full mb-6 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      onBlur={() => setPassword(password.trim())}
      required
      aria-required="true"
    />

    <button
      type="submit"
      disabled={loading}
      className={`w-full py-2 rounded font-semibold transition ${
        loading
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-indigo-600 hover:bg-indigo-700'
      }`}
    >
      {loading ? 'Logging in...' : 'Login'}
    </button>

    <p className="text-sm mt-4 text-center text-gray-400">
      Don’t have an account?{' '}
      <a href="/register" className="text-indigo-400 hover:underline">
        Register
      </a>
    </p>
  </form>
</div>
  );
};

export default Login;