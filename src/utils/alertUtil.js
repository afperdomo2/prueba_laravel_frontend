// import swal2 from 'sweetalert2';

// export const alertSuccess = async (msg, timer = 0) => {
//   await swal2.fire({
//     title: '¡Correcto!',
//     html: `<span style="font-family:Roboto;">${msg}</span>`,
//     icon: 'success',
//     timer,
//   });
// };

// export const alertWarning = async (msg, timer = 0) => {
//   await swal2.fire({
//     title: '¡Incorrecto!',
//     html: `<span style="font-family:Roboto;">${msg}</span>`,
//     icon: 'warning',
//     timer,
//   });
// };

// export const alertError = async (msg, timer = 0) => {
//   await swal2.fire({
//     title: '¡Incorrecto!',
//     html: `<span style="font-family:Roboto;">${msg}</span>`,
//     icon: 'error',
//     timer,
//   });
// };

// export const alertInfo = async (msg, timer = 0) => {
//   await swal2.fire({
//     title: '¡Información!',
//     html: `<span style="font-family:Roboto;">${msg}</span>`,
//     icon: 'info',
//     allowOutsideClick: false,
//     confirmButtonText: "<span style='font-family:Roboto;'>ACEPTAR</span>",
//     customClass: 'myCustomClass',
//     timer,
//   });
// };

// export const alertInfoWhitLogin = (msg, estaActivo, timer = 0) => {
//   if (estaActivo) {
//     swal2.fire({
//       icon: 'info',
//       title: `<span style="font-family:Roboto;">¡${msg}!</span>`,
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       didOpen: () => {
//         swal2.showLoading();
//       },
//     });
//   } else {
//     swal2.close();
//   }
// };
