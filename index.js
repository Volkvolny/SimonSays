// Initialize arrays needed
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;

// Start game on keypress as long as started is false
$(document).keypress(function()
{
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})

// Set up user click function
$(".btn").click(function()
{
  var userClick = $(this).attr("id");
  userPattern.push(userClick);

  animatePress(userClick);
  playSound(userClick);

  checkAnswer(userPattern.length - 1);
})

// Set up function that plays next sequence colour
function nextSequence()
{
  userPattern = []; // We reset this to be refilled each round, which is how the increment works
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Play sound function
function playSound(name)
{
  var playSound = new Audio("sounds/" + name + ".mp3");
  playSound.play();
}

// Animate button on press
function animatePress(color)
{
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userPattern[currentLevel]) // Every time a button is clicked, the value is checked
  {
    console.log(gamePattern[currentLevel]);
    console.log(userPattern[currentLevel]);
    if (userPattern.length === gamePattern.length){ // When the two lengths are the same and all values were correct, continue
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } // Check lengths
  } // Close if

  else
    {
      // Play error sound
      playSound("wrong");

      // Add error flash
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      // Change h1
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
    } // end else
} // end function

function startOver()
{
  started = false;
  level = 0;
  gamePattern = [];
}
