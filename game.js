// Variable to count level.
var level = 0;

// Array to hold contents of the variable userChosenColour.
var userClickedPattern = [];

// Array that holds the colour sequence.
var buttonColours = ["red", "blue", "green", "yellow"];

// Array to hold a chosen colour.
var gamePattern = [];

// Function to determine the colour sequence.
function nextSequence() {

  // Once nextSequence() is triggered, reset the userClickedPattern to
  // an empty array ready for the next level.
  nextSequence = [];

  // Function to generate a random number.
  var randomNumber = Math.floor(Math.random() * 4);

  // Variable to select a random colour.
  var randomChosenColour = buttonColours[randomNumber];

  //  Push to add the chosen colour.
  gamePattern.push(randomChosenColour);

  // Variable to store what sound effect will get played.
  var audio = new Audio('sounds/' + randomChosenColour + ".mp3");

  // jQuery to select the button with the same id as the random chosen colour.
  // Selected button displays a flash animation and plays an audio file.
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  audio.play();

  // Change level title to value of level variable.
  $("#level-title").innerHTML(level);

  level++;
  return level;
}

// Detect when any of the buttons are clicked and trigger a handler function.
$(".button").click(function() {

  // Variable to store the id of the button that got clicked.
  var userChosenColour = this.attr("id");

  // Add contents of the variable userChosenColour to the array.
  userClickedPattern.push(userChosenColour);

  // Call to checkAnswer() after a user has clicked and chosen their answer,
  // passing in the index of the last answer in the user's sequence.
  var lastElement = userClickedPattern[userClickedPattern.length - 1];
  checkAnwer(lastElement);
});

// Function to play the corresponding sound on button click.
function playSound(name) {

  // Function to determine id of clicked button.
  $(".button").click(function() {
    var name = this.attr("id");

    // Variable to store what sound effect will get played.
    var audio = new Audio('sounds/' + name + ".mp3");

    // Plays an audio file.
    audio.play();

  });
}

// Function to animate buttons.
function animatePress(currentColour) {
  $(".btn").click(function() {

    // Variable to store the id of the button that got clicked.
    var currentColour = this.attr("id");

    // Variable to store the id of the button that got clicked.
    $(currentColour).addClass("pressed");

    // Remove added class after a set time.
    setTimeout(function() {
      currentColour.classList.remove("pressed");
    }, 100);
  });
}

// Detect if a key has been press.
$(document).on("keypress", function(event) {

  // Start the game by calling the function after the first keypress.
  if (event.key === true) {
    nextSequence();

    // Change level title to value of level variable.
    $("#level-title").innerHTML(level);
  }
});

// Checks wether a user has the right answer.
function checkAnswer(currentLevel) {

  // If statement to check if the most recent user answer is the same as the
  // game pattern. If so then log "success", otherwise log "wrong".
  if (currentLevel[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");

    // If the user got the most recent answer right, check that they
    // have finished their sequence.
    if (userClickedPattern.length === gamePattern.length); {

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong!");

    // Plays an audio file.
    playSound("wrong");

    // Apply class when user gets wrong answer, remove after 200 milliseconds.
    $("body").addClass("game-over");

    // Remove added class after a set time.
    setTimeout(function() {
      currentColour.classList.remove("game-over");
    }, 200);

    // Change level title game over message.
    $("#level-title").innerHTML("Game Over, Press Any Key to Restart");

    // Call startOver() if the user gets the sequence wrong.
    startOver();
  }

});

// Function, to reset the values of level, gamePattern and started variables.
function startOver() {

  level = 0;

  gamePattern = [];

  started = false;
}
