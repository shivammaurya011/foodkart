import React from 'react';
import InputSection from './components/tasks/InputSection';
import OutputSection from './components/tasks/OutputSection';

function App() {
  return (
    <div className='mx-auto w-1/2 my-12 flex flex-col gap-4 rounded-xl py-2 px-8 bg-slate-300'>
      <h1 className="text-3xl text-center font-bold">Tasks</h1>
      <InputSection />
      <OutputSection />
    </div>
  );
}

export default App;
