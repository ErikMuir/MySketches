// declare global variables
window.IsPaused;
window.MyContainer;
window.SketchPad;
window.PauseResume;
window.Save;
window.CopyrightYear;
window.CurrentSketchIndex;
window.ThumbTemplate;
window.Sketches = [];


$(window).ready(function () {
	// set global variables
	window.IsPaused = false;
	window.MyContainer = $('#my-container');
	window.SketchPad = document.getElementById('my-container').contentWindow;
	window.PauseResume = $('#pause-resume');
	window.Save = $('#save');
	window.CopyrightYear = $('#copyright-year');
	window.CurrentSketchIndex = 0;
	window.ThumbTemplate = $('#thumb-template').text();

	window.Sketches = [
		'sketch1',
		'sketch2',
		'sketch3',
		'sketch4',
		'sketch5',
		'sketch6',
	];

	// set the copyright year
	window.CopyrightYear.text(new Date().getFullYear());
	
	// set size of container
	window.MyContainer.attr({ 
		'width': (innerHeight - 128),
		'height': (innerHeight - 128)
	});

	$('#thumb-container').html(_.template(window.ThumbTemplate));
	
	// listener for clicking on thumbnails
	$('.thumb').on('click', function () {
		changeSketch(parseInt($(this).data('index')));
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
				window.SketchPad.loop(); 
			else 
				window.SketchPad.noLoop();
			window.IsPaused = !window.IsPaused;
		} catch(e) {
			alert('This functionality is out of order');
		}		
	});
	
	// listener for clicking on save
	window.Save.on('click', function () {
		try {
			window.SketchPad.save();
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