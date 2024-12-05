import swal2 from 'sweetalert2';

export const alertSuccess = async (msg, timer = 3000) => {
  await swal2.fire({
    title: '¡Correcto!',
    html: `<span style="font-family:Roboto;">${msg}</span>`,
    icon: 'success',
    timer,
    customClass: { popup: 'swal2-custom-zindex' },
  });
};

export const alertError = async (msg, timer = 3000) => {
  await swal2.fire({
    title: '¡Incorrecto!',
    html: `<span style="font-family:Roboto;">${msg}</span>`,
    icon: 'error',
    timer,
    customClass: { popup: 'swal2-custom-zindex' },
  });
};
