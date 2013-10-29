var global_results;

function listEntries() {
	var db = window.openDatabase("time-card", "1.0", "Time Card Database", 1000000);
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM times', [], printEntries, errorDB);
	}, errorDB, successDB);
}

function printEntries(tx, results) {
	global_results = results;
	$('#entries').html('');
	var entries_num = results.rows.length;
	for(i=0; i<entries_num; i++) {
		var start_time = new Date(results.rows.item(i).start).getTime();
		var end_time = new Date(results.rows.item(i).end).getTime();
		var time = end_time-start_time;
		var time_object = new Date(results.rows.item(i).end);
		$('#entries').append('<p>Month: ' + time_object.getMonth() + '<br />Day: ' + time_object.getDate() + '</p>' + elapsedTime(time) + '</p><p>' + results.rows.item(i).description + '</p><a href="#edit_entry" onclick="editEntry(' + i + ')">EDIT</a><br /><br />');
	}
}

function editEntry(the_id) {
	$('#entry').html('<form name="entry_edit"><input type="text" name="start" placeholder="Start time" value="' + global_results.rows.item(the_id).start + '" /><br /><input type="text" name="end" placeholder="End time" value="' + global_results.rows.item(the_id).end + '" /><br /><input type="text" name="description" placeholder="Description" value="' + global_results.rows.item(the_id).description + '" /><input type="hidden" name="id" placeholder="id" value="' + global_results.rows.item(the_id).id + '" /><br /><input type="submit" id="edit_entry_submit" value="Save"/></form>');
	$('#edit_entry_submit').on('tap', function() {
		var db = window.openDatabase("time-card", "1.0", "Time Card Database", 1000000);
		db.transaction(function(tx) {
			var sql = 'UPDATE times SET start="' + document.entry_edit.start.value + '", end="' + document.entry_edit.end.value + '", description="' + document.entry_edit.description.value + '" WHERE id="' + document.entry_edit.id.value + '"';
			tx.executeSql(sql, [], successDB, errorDB);
		}, errorDB, successDB);
	});
}