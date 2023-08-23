import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 mx-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition"
          >
            Fechar
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;