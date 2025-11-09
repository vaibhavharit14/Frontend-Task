import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';
import { validateTask } from '../utils/validateForm';
import { showError, showSuccess } from '../utils/toastHelper';
import { parseApiError } from '../utils/errorHandler';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    const error = validateTask({ title: trimmedTitle, description: trimmedDescription });
    if (error) return showError(error);

    setLoading(true);

    try {
      await axiosInstance.post('/tasks', {
        title: trimmedTitle,
        description: trimmedDescription,
      });

      showSuccess('Task added successfully!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Add Task Error:', err);
      showError(parseApiError(err) || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md"
        aria-label="Add Task Form"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow">
          Add New Task
        </h2>

        <label htmlFor="title" className="block mb-1 font-medium text-indigo-300">
          Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTitle(title.trim())}
          required
          aria-required="true"
        />

        <label htmlFor="description" className="block mb-1 font-medium text-indigo-300">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter task description"
          className="w-full mb-6 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setDescription(description.trim())}
          required
          aria-required="true"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-full font-semibold transition duration-300 ${
            loading
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500'
          }`}
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

export default AddTask;