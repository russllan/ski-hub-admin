import React from "react";

export default function Modal({ children, setIsModal }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setIsModal(false)}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
