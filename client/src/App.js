import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditTask />
            </PrivateRoute>
          }
        />

        {/* 🚫 Fallback Route */}
        <Route
          path="*"
          element={
            <div className="text-center mt-10">
              <h1 className="text-2xl text-red-600 font-bold">404 - Page Not Found</h1>
              <a href="/" className="text-blue-500 underline mt-4 block">
                Go back to Login
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;