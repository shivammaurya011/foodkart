import React from 'react';
import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '../../redux/apiSlice';

function OutputSection() {
  const { data: tasks = [], isLoading, isError, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleToggleStatus = async (taskId, currentStatus) => {
    await updateTask({ taskId, status: !currentStatus });
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">{error}</p>;

  return (
    <ul className='w-full text-lg'>
      {tasks.map((task) => (
        <li key={task.id} className='bg-slate-50 flex justify-between mb-4 py-1 px-2 rounded'>
          <div className='flex gap-2 items-center'>
            <input
              type="checkbox"
              checked={task.status}
              onChange={() => handleToggleStatus(task.id, task.status)}
            />
            <span className={task.status ? 'line-through' : ''}>{task.value}</span>
          </div>
          <button
            className='py-1 px-2 rounded bg-red-300'
            onClick={() => handleDeleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default OutputSection;
