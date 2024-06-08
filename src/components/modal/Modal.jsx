import React from 'react';

function Modal({ children, setIsModal }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-2xl">
        <button
          onClick={() => setIsModal(false)}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
