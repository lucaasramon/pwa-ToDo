import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  newTaskText: string;
  newTaskCategory: string;
  addTask: () => void;
  setNewTaskText: React.Dispatch<React.SetStateAction<string>>;
  setNewTaskCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  newTaskText,
  newTaskCategory,
  addTask,
  setNewTaskText,
  setNewTaskCategory,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="justify-center fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
        <div className=" modalW bg-white p-3 rounded-lg shadow-lg relative">
          <div>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition"
            >
              X
            </button>
            <h2 className="mb-4 titleModal">Adicionar Tarefa</h2>
            <div className="mb-6 relative">
              <input
                type="text"
                className="p-input-2  border-b-2 border-0 border-blue-500 h-14 border bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full"
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder=" "
              />
              <label className="textColorInput absolute top-1 left-2 px-1 bg-white text-gray-500 text-xs">
                Tarefa
              </label>
            </div>
            <div className="mb-6 relative">
              <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="p-input-2 border-b-2 border-blue-500 h-14 border-0 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-full appearance-none"
              >
                <MenuItem value={'💰 Finanças'}>💰 Finanças</MenuItem>
                <MenuItem value={'💞 Casamento'}>💞 Casamento</MenuItem>
                <MenuItem value={'🖥️ Trabalho'}>🖥️ Trabalho</MenuItem>
                <MenuItem value={'🛒 Lista de Compras'}>🛒 Lista de Compras</MenuItem>
              </Select>
              <label className="textColorInput absolute top-1 left-2 px-1 bg-white text-gray-500 text-xs">
                Categoria
              </label>
            </div>
          </div>
          <div className="mb-4">
            <button
              onClick={addTask}
              className=" buttonModal text-center bg-blue-500 text-white p-2 rounded w-full"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
