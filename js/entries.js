function listEntries() {
	var db = window.openDatabase("time-card", "1.0", "Time Card Database", 1000000);
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM times', [], printEntries, errorDB);
	}, errorDB, successDB);
}

function printEntries(tx, results) {
	$('#entries').html('');
	var entries_num = results.rows.length;
	for(i=0; i<entries_num; i++) {
		var start_time = new Date(results.rows.item(i).start).getTime();
		var end_time = new Date(results.rows.item(i).end).getTime();
		var time = end_time-start_time;
		var time_object = new Date(results.rows.item(i).end);
		$('#entries').append('<p>Month: ' + time_object.getMonth() + '<br />Day: ' + time_object.getDate() + '</p>' + elapsedTime(time) + '</p><p>' + results.rows.item(i).description + '</p>')
	}
}