import { useState } from 'react';
import { toast } from 'react-toastify';

export const useConfirmationToast = () => {
  const [toastId, setToastId] = useState(null);

  const showConfirmationToast = (onConfirm, onCancel) => {
    const id = toast(
      <div>
        <span>Are you sure you want to proceed?</span>
        <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            onConfirm(); // Call the onConfirm callback
            toast.dismiss(id); // Dismiss the toast
          }}
        >
          Yes
        </button>
        <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            onCancel(); // Call the onCancel callback
            toast.dismiss(id); // Dismiss the toast
          }}
        >
          No
        </button>
      </div>,
      {
        autoClose: false, // Prevent auto-close so the user can click
        closeButton: false, // Disable the default close button
      }
    );
    setToastId(id); // Store the toast ID for future management if needed
  };

  return { showConfirmationToast };
};
