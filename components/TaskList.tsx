import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Modal from "./Modal";
import ptBR from "date-fns/locale/pt-BR";
import ButtonWithIcon from "./MyButtom";
import Checkbox from "@mui/material/Checkbox";
import SEO from "./SEO";

interface Task {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText,
        category: newTaskCategory,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText("");
      setNewTaskCategory("");
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
  const [larguraTela, setLarguraTela] = useState<any>();

  const updateLarguraTela = () => {
    setLarguraTela(window.innerWidth);
  };

  useEffect(() => {
    updateLarguraTela();
    window.addEventListener('resize', updateLarguraTela);
    return () => {
      window.removeEventListener('resize', updateLarguraTela);
    };
  }, []);

  return (
    <div className="bodyClass">
      <SEO title="TaskList" description={'Olá eu sou a description'} />
      <div className="flex flex-col items-center  min-h-screen p-6">
        <div className="max-w-lg w-full">
          <div className="max-w-ld">
            <h2 className="text-2xl dataDay font-semibold mb-4">
              {format(currentDate, "dd 'de' MMMM, yyyy", { locale: ptBR })}
            </h2>
            <p className=" font-semibold text-gray-600 subTask mb-6">
              {incompleteTasks.length} incompletas, {completeTasks.length}{" "}
              completas
            </p>
          </div>
          <h3 className="my-3 section-title">A fazer</h3>
          <div className="task-ul">
            {incompleteTasks.map((task) => (
              <div key={task.id} className=" my-3 task-item">
                <div className="my-0 task-label">
                  <Checkbox
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 check text-gray-400"
                  />
                </div>
                <div>
                  <span
                    className={`ml-3 text-lg font-medium text-gray-700 labelCheck ${
                      task.completed ? "line-through text-gray-600 " : ""
                    }`}
                  >
                    {task.text}
                    <span className=" text-gray-500 text-sm">
                      {task.category}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <br />
          <h3 className="section-title">Completas</h3>
          <div className="task-ul">
            {completeTasks.map((task) => (
              <div key={task.id} className="my-3 task-item">
                <div className="task-label">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="accent-gray-500 my-1 form-checkbox h-5 w-5 border border-gray-700"
                  />
                </div>
                <div>
                  <span
                    className={` ml-3 text-lg font-medium text-gray-400 labelCheck ${
                      task.completed ? "task-text completed" : "task-text"
                    }`}
                  >
                    {task.text}
                    <br />
                  </span>
                </div>
              </div>
            ))}
          </div>
          {larguraTela < 600 || undefined ?
          <ButtonWithIcon onClick={openModal} />
            : 
            <div className="alignButton">

            <button
            onClick={openModal}
            className=" buttonModal text-center bg-blue-500 w-80 text-white p-2 rounded w-full"
            >
            Adicionar
          </button>
            </div>
        }
        </div>
        <Modal 
          isOpen={isModalOpen}
          onClose={closeModal}
          newTaskText={newTaskText}
          newTaskCategory={newTaskCategory}
          addTask={addTask}
          setNewTaskText={setNewTaskText}
          setNewTaskCategory={setNewTaskCategory}/>

      </div>
    </div>
  );
};

export default TaskList;
