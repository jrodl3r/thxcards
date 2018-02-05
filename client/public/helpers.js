/* global $, toastr */
$(function() {
  // $('[data-toggle="tooltip"]').tooltip();
  $('.datepicker').pickadate({
    multidate: true
  });
  $('#scheduleTimePicker').pickatime({
    twelvehour: true
  });
	toastr.options = { positionClass: 'toast-top-center' };
});
