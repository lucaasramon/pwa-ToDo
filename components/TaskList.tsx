import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Modal from './Modal';
// import Modal from 'react-modal';

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

// Modal.setAppElement('#root'); // Define o elemento raiz para o modal

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        category: newTaskCategory,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setNewTaskCategory('');
      closeModal();
    }
  };

  const toggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completeTasks = tasks.filter((task) => task.completed);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='bodyClass'>
      <h1>Todo List</h1>
    
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-4">{format(currentDate, 'dd MMMM, yyyy')}</h2>
        <p className="text-gray-600 mb-6">
          {incompleteTasks.length} incompletas, {completeTasks.length} completas
        </p>
      <h3 className="section-title">Tarefas a fazer:</h3>
      <div className="task-ul">
        {incompleteTasks.map((task) => (
          <div key={task.id} className="task-item">
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className={task.completed ? 'task-text completed' : 'task-text'}>
                {task.text}
                <br />
                <span className="category-text">{task.category}</span>
              </span>
            </label>
          </div>
        ))}
      </div>
      <h3 className="section-title">Tarefas completas:</h3>
      <div className="task-ul">
        {completeTasks.map((task) => (
          <div key={task.id} className="task-item">
            <label className="task-label">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className={task.completed ? 'task-text completed' : 'task-text'}>
                {task.text}
                <br />
                <span className="category-text">{task.category}</span>
              </span>
            </label>
          </div>
        ))}
      </div>
      <button
          onClick={openModal}
          className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-600 transition"
        >
          Adicionar Tarefa
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="mb-4">Adicionar Tarefa</h2>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="mb-2 p-2 border rounded w-full"
          placeholder="Nome da Tarefa"
        />
        <input
          type="text"
          value={newTaskCategory}
          onChange={(e) => setNewTaskCategory(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
          placeholder="Categoria"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2 rounded w-full">
          Adicionar
        </button>
      </Modal>
    </div>
    </div>
  );
};

export default TaskList;