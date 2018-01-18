/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyAtpJYe9s2DVVwRHjrR6yrjL6-n9V2j_6k",
    authDomain: "train-schedule-gwhw7.firebaseapp.com",
    databaseURL: "https://train-schedule-gwhw7.firebaseio.com",
    projectId: "train-schedule-gwhw7",
    storageBucket: "train-schedule-gwhw7.appspot.com",
    messagingSenderId: "164648736215"
};
firebase.initializeApp(config);
var database = firebase.database();
// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var empName = $("#employee-name-input").val().trim();
  var empRole = $("#role-input").val().trim();
  var empStart = moment($("#start-input")).val().trim();
  var empRate = $("#rate-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    role: empRole,
    start: empStart,
    rate: empRate
  };
  // Uploads employee data to the database
  database.ref().push(newEmp);
  // Logs everything to console
  console.log(newEmp.name);
  console.log(newEmp.role);
  console.log(newEmp.start);
  console.log(newEmp.rate);
  // Alert
  alert("Employee successfully added");
  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;
  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);
  // Calculate the hours an minutes of the next arrival worked using hardcore math
  // To calculate next arrival
  var hourDiff = moment(moment.utc('2013-03-02 01:30:00')).diff(moment.utc('2013-03-02 01:30:00'),'hours');////////only include time
  var minuteDiff = moment(moment.utc('2013-03-02 01:30:00')).diff(moment.utc('2013-03-02 01:30:00'),'minutes');/////same
  hourDuration = Math.floor(minuteDiff/60);
  minuteDuration = minuteDiff % 60;

  console.log(hourDuration);
  console.log(minuteDuration);




  var empArrival = moment().diff(moment.unix(empStart, "X"), "months");
  console.log(empArrival);
  // Calculate the total billed rate
  var empBilled = empArrival * empRate;
  console.log(empBilled);
  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" 
  + empArrival + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case