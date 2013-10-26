document.addEventListener("deviceready", init, false);

function init() {
	clockRun();
	$('#clock').on('pagebeforeshow', function() {
		
	});
	$('#time_entries').on('pagebeforeshow', function() {
		listEntries();
	});
}

