$(function() {
	$('.App > .container').on('click', function() {
		$('.navbar-collapse').collapse('hide');
	});
  // $('[data-toggle="tooltip"]').tooltip();
	toastr.options = { positionClass: 'toast-top-center' };
});
