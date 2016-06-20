$(document).ready(function() {

	var dataRef = new Firebase("https://rbctrainschedule.firebaseio.com/");
	// Initial Values 
	var trainName = "";
	var destination = "";
	var frequency = "";
	var nextArrival = "";
	var minutesAway = "";

	// Capture Button Click
	$("#addTrainBtn").on("click", function() {
		console.log("submit button clicked")
		// Grabbed values from tex-boxes
		trainName = $('#newTrainName').val().trim();
		destination = $('#newDestination').val().trim();
		frequency = $('#newTrainFrequency').val().trim();
		//needs a function
		//nextArrival = $('#nextArrival').val().trim();
		//minutesAway = $('#minutesAway').val().trim();
		// Code for "Setting values in the database"
		
		dataRef.push({
			trainName: trainName,
			destination: destination,
			frequency: frequency,
			nextArrival: nextArrival,
			minutesAway: minutesAway
		})

		// Don't refresh the page!
		return false;
	}); // end ("#addTrainBtn) on click

	//Firebase watcher + initial loader HINT: .on("value")
	// dataRef.on("value", function(snapshot) {
	dataRef.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
		// Log everything that's coming out of snapshot
		// Change the HTML to reflect
		$("#trainName").html(snapshot.val().trainName);
		$("#destination").html(snapshot.val().destination);
		$("#frequency").html(snapshot.val().frequency);
		$("#nextArrival").html(snapshot.val().nextArrival);
		$("#minutesAway").html(snapshot.val().minutesAway);
	// Handle the errors
	}, function(errorObject){
		console.log("Errors handled: " + errorObject.code)
	});

}); // end $(document).ready

