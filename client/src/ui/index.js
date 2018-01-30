/* global $ */

export const closeNav = () => {
  $('.navbar-collapse').collapse('hide');
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

export const toggleModal = (id) => {
  $(`#${id}`).modal('toggle');
}
