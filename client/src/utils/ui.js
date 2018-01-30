/* global $ */

export const closeNav = () => {
  $('.navbar-collapse').collapse('hide');
}

export const closeModal = (id) => {
  $(`#${id}`).modal('hide');
  $(`#${id} input`).removeClass('valid invalid');
}

export const toggleModal = (id) => {
  $(`#${id}`).modal('toggle');
}

export const clearValidation = (id) => {
  setTimeout(() => {
    $(`#${id} input`).removeClass('validate').focus();
    setTimeout(() => {
      $(`#${id} input`).addClass('validate');
    }, 200);
  }, 150);
}

export const resetForm = (id) => {
  $(`#${id}`)[0].reset();
}

export const resetImportModal = (type) => {
  $(`#${type}ImportLabel`).removeClass('red-text green-text').text('').parent().addClass('d-none');
  $(`#${type}ImportFile`).removeClass('invalid valid');
  $(`#${type}ImportProgress`).addClass('d-none');
  $(`#import${type.charAt(0).toUpperCase() + type.slice(1)}Modal .modal-footer, #${type}ImportFileInput`).removeClass('d-none');
}

export const importMessage = (type, msg) => {
  $(`#${type}ImportLabel`).removeClass('red-text').text(msg).parent().removeClass('d-none');
  $(`#${type}ImportFile`).removeClass('invalid').addClass('valid');
}

export const importError = (type, msg) => {
  $(`#${type}ImportLabel`).addClass('red-text').text(msg).parent().removeClass('d-none');
  $(`#${type}ImportFile`).removeClass('valid').addClass('invalid');
}

export const importShowProgress = (type) => {
  $(`#${type}ImportProgress`).removeClass('d-none');
  $(`#import${type.charAt(0).toUpperCase() + type.slice(1)}Modal .modal-footer`).addClass('d-none');
}

export const hideImportInput = (type) => {
  $(`#${type}ImportFileInput`).addClass('d-none');
  $(`#${type}ImportLabel`).parent().addClass('d-none');
  $(`#${type}ImportSubmit`).prop('disabled', false);
}
