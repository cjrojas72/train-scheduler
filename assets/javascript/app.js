$(document).ready(function() {

  // init firebase
  var config = {
    apiKey: "AIzaSyBioDTFn7oK5BBArCZqPiS8Kb16Ln61Pjg",
    authDomain: "train-tracker-bd8e3.firebaseapp.com",
    databaseURL: "https://train-tracker-bd8e3.firebaseio.com",
    projectId: "train-tracker-bd8e3",
    storageBucket: "train-tracker-bd8e3.appspot.com",
    messagingSenderId: "677661922800"
  };
  firebase.initializeApp(config);

  //firebase database reference
  database = firebase.database();

  // add event listener for form submit
  $("#submit-btn").on("click", function(event) {
    event.preventDefault();

    //store data from input
    var trainData = {
      name: $("#train-input").val().trim(),
      destination: $("#destination-input").val().trim(),
      time: $("#time-input").val(),
      frequency: parseInt($("#frequency-input").val())
    };

    console.log(trainData);

    //push new object into database
    database.ref().push(trainData);

    //clear out input fields
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("")
    $("#frequency-input").val("");

  });

  //add new element to table when data is pushed to database
  database.ref().on("child_added", function(childSnap) {

    // Log train data in database
    console.log(childSnap.val().name);
    console.log(childSnap.val().destination);
    console.log(childSnap.val().time);
    console.log(childSnap.val().frequency);

    var now = moment();
    var trainTime = moment(childSnap.val().time);

    console.log(now, trainTime);
    

    // lists all objects in database to table
    $("#train-info").append(
      "<tr><td>"+ childSnap.val().name + "</td>" +
      "<td>" + childSnap.val().destination + "</td>" +
      "<td>" + childSnap.val().frequency + "</td>" +
      "<td>" + childSnap.val().time + "</td>" +
      "<td>5"+ moment().startOf('minute').fromNow() +"</td></tr>");

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


});