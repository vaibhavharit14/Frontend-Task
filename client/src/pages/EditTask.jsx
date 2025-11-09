import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';
import { showError, showSuccess } from '../utils/toastUtils';
import { parseApiError } from '../utils/parseApiError';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await API.get(`/tasks/${id}`);
        const task = res.data;
        setTitle(task.title || '');
        setDescription(task.description || '');
        setStatus(task.status || 'Pending');
        setDueDate(task.dueDate?.slice(0, 10) || '');
      } catch (err) {
        showError(parseApiError(err) || 'Failed to load task. Please try again.');
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedDueDate = dueDate.trim();

    if (!trimmedTitle || !trimmedDescription || !trimmedDueDate) {
      showError('All fields are required');
      return;
    }

    setLoading(true);

    try {
      await API.put(`/tasks/${id}`, {
        title: trimmedTitle,
        description: trimmedDescription,
        status,
        dueDate: trimmedDueDate,
      });
      showSuccess('Task updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      showError(parseApiError(err) || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-6 rounded-xl shadow-lg w-full max-w-md backdrop-blur-md"
        aria-label="Edit Task Form"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow">
          Edit Task
        </h2>

        <label htmlFor="title" className="block mb-1 font-medium text-indigo-300">
          Title
        </label>
        <input
          id="title"
          type="text"
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
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setDescription(description.trim())}
          required
          aria-required="true"
        />

        <label htmlFor="status" className="block mb-1 font-medium text-indigo-300">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <label htmlFor="dueDate" className="block mb-1 font-medium text-indigo-300">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          {loading ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  );
};

export default EditTask;