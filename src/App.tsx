import React, { useState } from 'react';
import './App.css';

interface Task {
  id: number;
  description: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formDescription, setFormDescription] = useState('');

  const handleAddTask = () => {
  setShowModal(true);
 };

 const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
    if (editingTask) {
       const updatedTask = { ...editingTask, description: formDescription };
       const updatedTasks = tasks.map(task => (task.id === editingTask.id ? updatedTask : task));
       setTasks(updatedTasks);
       setEditingTask(null);
     } else {
      const newTask = {id: Date.now(), description: formDescription };
      const newTasks = [newTask, ...tasks];
      setTasks(newTasks);
    }
    setFormDescription('');
    setShowModal(false);
  };

  const handleEditTask = (task: Task) => {
    setFormDescription(task.description);
    setEditingTask(task);
    setShowModal(true);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

 return (
   <div>
      <h1><b>To-Do List</b></h1>
      <button onClick={handleAddTask}type="button" className="btn btn-primary">Add Task</button>
      <ul>
          {tasks.map(task => ( 
          <li key={task.id}>
            <div>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => handleEditTask(task)}>Edit</button><br></br>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
          ))}
        </ul>
        {showModal && (
          <div className="modal">
            <form onSubmit={handleFormSubmit}>
            <label htmlFor="description">Add Your Task</label>
            <textarea id="description" value={formDescription} onChange={e => setFormDescription(e.target.value)} />
            <button type="submit">{editingTask ? 'Save' : 'Add'}</button><br></br>
            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
          </div>
    )}
 </div>
 );
};

export default App;