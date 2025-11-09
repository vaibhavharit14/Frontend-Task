import { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { showError, showSuccess } from '../utils/toastUtils';
import { parseApiError } from '../utils/parseApiError';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      showError('Session expired. Please login again.');
      localStorage.removeItem('token');
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      showSuccess('Task deleted');
      fetchTasks();
    } catch (err) {
      showError(parseApiError(err));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    showSuccess('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow">
          Your Tasks
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Add Task Button */}
        <Link
  to="/add"
  className="relative inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-indigo-100 transition duration-300 ease-out border border-indigo-500 rounded-full shadow-sm group hover:shadow-indigo-500/50 overflow-hidden"
>
  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 group-hover:from-pink-500 group-hover:to-indigo-500 opacity-70 blur-sm rounded-full"></span>
  <span className="relative z-10">+ Add Task</span>
</Link>

          {/* Logout Button */}
      <button
  onClick={handleLogout}
  className="relative inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium text-red-100 transition duration-300 ease-out border border-red-500 rounded-full shadow-sm group hover:shadow-red-500/50 overflow-hidden"
>
  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 group-hover:from-pink-500 group-hover:to-red-500 opacity-70 blur-sm rounded-full"></span>
  <span className="relative z-10 flex items-center gap-2">
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
      />
    </svg>
    Logout
  </span>
</button>
        </div>
      </div>

      {/* Task Grid */}
      {loading ? (
        <p className="text-center text-gray-400">Loading tasks...</p>
      ) : filteredTasks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 p-4 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all flex flex-col justify-between h-full overflow-hidden break-words"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold truncate max-w-[70%]">
                  {task.title}
                </h2>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded whitespace-nowrap ${
                    task.status === 'Completed'
                      ? 'bg-green-600 text-white'
                      : 'bg-yellow-600 text-white'
                  }`}
                >
                  {task.status || 'Pending'}
                </span>
              </div>

              <p className="text-gray-300 mb-2 max-h-32 overflow-auto break-words">
                {task.description}
              </p>

              <div className="flex justify-end items-center gap-4 mt-auto text-sm">
                <Link
                  to={`/edit/${task._id}`}
                  className="text-indigo-400 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No tasks found.</p>
      )}
    </div>
  );
};

export default Dashboard;