// declare global variables
window.IsPaused;
window.MyContainer;
window.Sketch;
window.PauseResume;
window.Save;
window.CopyrightYear;
window.Sketches = [];
window.CurrentSketchIndex;

$(window).ready(function () {
	// set global variables
	window.IsPaused = false;
	window.MyContainer = $('#my-container');
	window.Sketch = document.getElementById('my-container').contentWindow;
	window.PauseResume = $('#pause-resume');
	window.Save = $('#save');
	window.CopyrightYear = $('#copyright-year');

	// set the copyright year
	window.CopyrightYear.text(new Date().getFullYear());
	
	// set size of container
	window.MyContainer.attr({ 
		'width': (innerHeight - 128),
		'height': (innerHeight - 128)
	});	
	
	// listener for clicking on thumbnails
	$('.thumb').on('click', function () {
		changeSketch(parseInt($(this).data('index')));
	});

	$('.thumb').each(function() {
		window.Sketches.push($(this).attr('id'));
	});

	// listener for arrow keys
	window.onkeyup = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (key === 37 && window.CurrentSketchIndex > 0) {
			changeSketch(window.CurrentSketchIndex - 1);
		} else if (key === 39 && window.CurrentSketchIndex < window.Sketches.length - 1) {
			changeSketch(window.CurrentSketchIndex + 1);
		}
	}
	
	// listener for clicking on pause/resume
	window.PauseResume.on('click', function () {
		try {
			if (window.IsPaused) 
				window.Sketch.loop(); 
			else 
				window.Sketch.noLoop();
			window.IsPaused = !window.IsPaused;
		} catch(e) {
			alert('This functionality is out of order');
		}		
	});
	
	// listener for clicking on save
	window.Save.on('click', function () {
		try {
			window.Sketch.save();
		} catch(e) {
			alert('This functionality is out of order');
		}
	});
	
	// load default sketch on page load
	changeSketch(0);
});

var changeSketch = function(index) {
	window.CurrentSketchIndex = index;
	$('.thumb').removeClass('active');
	window.MyContainer.attr('src', 'sketches/' + window.Sketches[index] + '.html');
	$('#' + window.Sketches[index]).addClass('active');
};