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
    var trainFrequency = 0;
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
      console.log(trainName)
      console.log(trainDestination)
      console.log(trainFirsttime)
      console.log(trainFrequency)


    //var tFrequency = 3;
    //var firstime = "05:00"; // Time is 3:30 AM
    var firstTimeConverted = moment(trainFirsttime, "hh:mm").subtract(1, "years"); // First Time (pushed back 1 year to make sure it comes before current time)
    var currentTime = moment(); // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency; 
    var trainAway = trainFrequency - tRemainder; // Minute Until Train
    var trainArrival = moment().add(trainAway, "minutes"); // Next Train

     console.log()
    
    
    
    
    console.log(firstTimeConverted);
    // Current Time
    
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    
    console.log("DIFFERENCE IN TIME: " + diffTime);
    
    
    console.log(tRemainder);
    
    
    console.log("MINUTES TILL TRAIN: " + trainAway);
    
    
    console.log("ARRIVAL TIME: " + moment(trainArrival).format("hh:mm"));

      // Code for the push values to database
      dataRef.ref().push({
        trainName: trainName,
        trainDestination: trainDestination,
        trainFirsttime: trainFirsttime,
        trainFrequency: trainFrequency
      });
    });
    



    // Assume the following situations.
    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away
    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away
    // ==========================================================
    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18
    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21
    // Assumptions
    

   


    });
