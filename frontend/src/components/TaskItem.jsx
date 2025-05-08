function TaskItem({ task, onToggle, onDelete }) {
    return (
      <li className="flex justify-between items-center p-2 border rounded">
        <span
          onClick={() => onToggle(task._id, task.completed)}
          className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
        >
          {task.name}
        </span>
        <button onClick={() => onDelete(task._id)} className="text-red-500">Delete</button>
      </li>
    );
  }
  
  export default TaskItem;
  