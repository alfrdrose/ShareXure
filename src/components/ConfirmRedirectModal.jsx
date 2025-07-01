import React from 'react';

const ConfirmRedirectModal = ({ open, onClose, onConfirm, storeName }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1f1f1f] text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-md font-semibold mb-4">Leave Xure?</h2>
        <p className="mb-6 text-sm">
          You are about to leave <span className="text-[#ceae7b] font-semibold">{storeName}</span>, and be redirected. Do you want to continue?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="text-[12px] px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="text-[12px] px-4 py-2 bg-[#4c1f84] rounded-md hover:opacity-90 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRedirectModal;
