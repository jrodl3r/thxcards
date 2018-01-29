/* global $ */

export const closeNav = () => {
  $('#navbarToggler').addClass('collapsed');
  $('#navbarSupportedContent').removeClass('show');
}

export const closeModal = (id) => {
  $(`#${id}`).modal('hide');
  $(`#${id} input`).removeClass('valid invalid');
}

export const resetModal = (id) => {
  setTimeout(() => {
    $(`#${id} input`).removeClass('validate').focus();
    setTimeout(() => {
      $(`#${id} input`).addClass('validate');
    }, 200);
  }, 150);
}
