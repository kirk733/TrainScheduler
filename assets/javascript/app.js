$(document).ready(function() {
    
// Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7JCV3lb5OLc4gl7AQ-63hczOH_D4iZWw",
    authDomain: "trainscheduler-6a345.firebaseapp.com",
    databaseURL: "https://trainscheduler-6a345.firebaseio.com",
    projectId: "trainscheduler-6a345",
    storageBucket: "trainscheduler-6a345.appspot.com",
    messagingSenderId: "365931620301"
  };
  firebase.initializeApp(config);
  var dataRef = firebase.database();

   // Initial Values
    var trainName = "";
    var trainDestination = "";
    var trainFirsttime = "";
    var trainFrequency = "";
    var trainArrival = "";
    var trainAway = "";

    // Submit Button Click
    $("#add-train").on("click", function(event) {
     
      event.preventDefault();

      // capture vaules input by user
      trainName = $("#tname").val().trim();
      trainDestination = $("#dest").val().trim();
      trainFirsttime = $("#trainInitial").val().trim();
      trainFrequency = $("#freq").val().trim();
     


    //var tFrequency = 3;
    var firstTimeConverted = moment(trainFirsttime, "hh:mm").subtract(1, "years"); // First Time (pushed back 1 year to make sure it comes before current time)
    var currentTime = moment(); // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency; 
    trainAway = trainFrequency - tRemainder; // Minute Until Train
    trainArrival = moment().add(trainAway, "minutes"); // Next Train
    nextTrain = moment(trainArrival).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(trainArrival).format("hh:mm"));
   // console.log(trainArrival);

      // Code for the push values to database
      dataRef.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFirsttime: trainFirsttime,
        trainFrequency: trainFrequency,
        trainAway: trainAway,
        nextTrain: nextTrain
       // trainArrival: trainArrival
      });
    });
    

   


    });
