import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { showError, showSuccess } from '../utils/toastUtils';
import { parseApiError } from '../utils/parseApiError';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      showError('All fields are required');
      return;
    }

    try {
      await API.post('/auth/register', {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      showSuccess('Registration successful');
      navigate('/');
    } catch (err) {
      showError(parseApiError(err));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white transition-all duration-300 hover:scale-[1.02]"
        aria-label="Register Form"
      >
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">Create Your Account</h2>
<label htmlFor="password" className="block mb-1 font-medium text-gray-300">
      Name
    </label>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
 <label htmlFor="email" className="block mb-1 font-medium text-gray-300">
      Email
    </label>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
<label htmlFor="password" className="block mb-1 font-medium text-gray-300">
      Password
    </label>
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-white/20 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center text-gray-300">
          Already have an account?{' '}
          <a href="/" className="text-blue-400 hover:underline font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;