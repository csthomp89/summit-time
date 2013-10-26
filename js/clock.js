function clockRun() {
	var interval;
	
	var db = window.openDatabase("time-card", "1.0", "Time Card Database", 1000000);
	db.transaction(initDB, errorDB, successDB);
	
	$('#start').on('tap', function() {
		var time = new Date();
		start_time = time.getTime();
		db.transaction(function(tx) {
			tx.executeSql('INSERT INTO times (start, sent) VALUES ("' + time + '", "false")', [], querySuccessDB, errorDB);
		}, errorDB, successDB);
		window.localStorage.setItem('start_time',start_time);
		interval = window.setInterval(function() {
			var time = new Date();
			var end_time = time.getTime();
			var time_elapsed = end_time-start_time;
			$('#elapsed_time').html(elapsedTime(time_elapsed));
		}, 1000);
	});
	$('#end').on('tap', function() {
		var time = new Date();
		var end_time = time.getTime();
		db.transaction(function(tx) {
			tx.executeSql('UPDATE times SET end="' + time + '" WHERE id="' + last_id + '"');
			tx.executeSql('UPDATE times SET description="temporary description" WHERE id="' + last_id + '"');
		}, errorDB, successDB);
		window.clearInterval(interval);
	});
}

function initDB(tx) {
	tx.executeSql('DROP TABLE IF EXISTS times');
	tx.executeSql('CREATE TABLE IF NOT EXISTS times (id INTEGER PRIMARY KEY AUTOINCREMENT, start, end, description, sent)');
}

function errorDB(err) {
	alert("SQL Error: " + err.code);
}

function successDB() {
	
}

function querySuccessDB(tx, results) {
	last_id = results.insertId;
}

function elapsedTime(time_elapsed) {
	time_elapsed = time_elapsed/1000;
	var hours = Math.floor(((time_elapsed % 31536000) % 86400) / 3600);
	var minutes = Math.floor((((time_elapsed % 31536000) % 86400) % 3600) / 60);
	var seconds = Math.floor((((time_elapsed % 31536000) % 86400) % 3600) % 60);
	return hours + ":" + minutes + ":" + seconds;
}