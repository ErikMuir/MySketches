var active;

$(window).ready(function () {
	
	// set size of container
	$('#myContainer').attr({ 
		'width': (innerHeight - 128),
		'height': (innerHeight - 128)
	});
	
	// load default sketch on page load
	$('#myContainer').attr('src', 'sketches/sketch1.html');
	active = true;
	
	// listener for clicking on thumbnails
	$('.thumb').on('click', function () {
		var id = $(this).attr('id');
		$('#myContainer').attr('src', 'sketches/' + id + '.html');
	});
	
	// listener for clicking on pause/resume
	$('#pauseresume').on('click', function () {
		if (active) {
			document.getElementById('myContainer').contentWindow.noLoop();
		} else {
			document.getElementById('myContainer').contentWindow.loop();
		}
		active = !active;
	});
	
	// listener for clicking on save
	$('#save').on('click', function () {
		document.getElementById('myContainer').contentWindow.save();
	});
	
});