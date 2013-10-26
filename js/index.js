document.addEventListener("deviceready", init, false);

function init() {
	alert('hello');
	clockRun();
}

function clockRun() {
	$('#clock').on('pagebeforeshow', function() {
		
	});
	$('#start').on('tap', function() {
		var time = new Date();
		time_print = time.toTimeString();
		window.localStorage.setItem('start_time',time.getTime());
		//$('#elapsed_time').html(time_print);
	});
	$('#end').on('tap', function() {
		var start_time = window.localStorage.getItem('start_time');
		var time = new Date();
		var end_time = time.getTime();
		var time_elapsed = end_time-start_time;
		var print_time = time_elapsed.toTimeString();
		$('#elapsed_time').html(print_time);
	})
}