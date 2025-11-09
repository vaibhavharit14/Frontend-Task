import { toast } from 'react-toastify';

export const showSuccess = (msg) => {
  const message = msg?.trim() || 'Action completed successfully';
  toast.success(message);
};

export const showError = (msg) => {
  const message = msg?.trim() || 'Something went wrong';
  toast.error(message);
};