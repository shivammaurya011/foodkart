import React, { useState } from 'react';
import { useAddTaskMutation } from '../../redux/apiSlice';

function InputSection() {
  const [taskValue, setTaskValue] = useState('');
  const [addTask] = useAddTaskMutation();

  const handleAddTask = async () => {
    if (taskValue.trim()) {
      await addTask(taskValue);
      setTaskValue('');
    }
  };

  return (
    <div className='flex w-full bottom-2 gap-4 items-center justify-center text-lg font-semibold bg-slate-50 py-1 px-4 rounded-md'>
      <span>+</span>
      <input
        placeholder='Add a new task'
        type="text"
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
        className='w-full outline-none bg-slate-50'
      />
      <button onClick={handleAddTask} className='hover:bg-slate-300 py-1 px-2 rounded-md'>
        Add
      </button>
    </div>
  );
}

export default InputSection;
