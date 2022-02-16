import { toast } from 'react-toastify';

const error = async (message) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    draggablePercent: 60
  });
};

const success = async (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    draggablePercent: 60
  });
};

const info = async (message) => {
  toast.dark(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    draggablePercent: 60
  });
};

const alert = {
  error,
  success,
  info
};

export default alert;
