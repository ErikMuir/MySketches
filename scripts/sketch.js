
$(window).ready(function () {
	$('#myContainer').attr({ 
		'width': (innerHeight - 122),
		'height': (innerHeight - 122)
	});
	
	// listener for clicking on thumbnails
	$('.thumb').on('click', function () {
		var id = $(this).attr('id');
		$('#myContainer').attr('src', 'sketches/' + id + '.html');
	});
	
	// listener for clicking on main sketch
	$('#myContainer').on('click', function () {
		save();
		return false;
	});
	
	// load a specific sketch on page load
	$('#myContainer').attr('src', 'sketches/sketch1.html');
});
