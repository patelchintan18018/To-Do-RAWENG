import { useEffect, useState } from 'react';
import axios from '../api/api';
import { useNavigate } from 'react-router-dom';
import TaskItem from '../components/TaskItem';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [filter, setFilter] = useState('all'); // Filter state: 'all', 'completed', 'pending'
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return navigate('/login');
    fetchTasks();
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const res = await axios.post('/tasks', { name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => [...prev, res.data]);
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(`/tasks/${id}`, { completed: !completed }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.map(task => task._id === id ? res.data : task));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Filter tasks based on the selected filter state
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all'
  });

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My To-Do List</h1>
        <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 mr-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 mr-2 rounded ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 mr-2 rounded ${filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Pending
        </button>
      </div>

      {/* Task Add Form */}
      <form onSubmit={addTask} className="flex mb-4 space-x-2">
        <input value={name} onChange={(e) => setName(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Add new task" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      {/* Task List */}
      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <TaskItem key={task._id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
