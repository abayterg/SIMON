var buttonColors = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level=0


function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if (userClickedPattern.length===level){
    userClickedPattern=[];
    $("h1").text("Next Level");
    setTimeout(function (){
      nextSequence()},1000);
      }
  }else{
    $("h1").text("GAME OVER, PRESS ENTER TO RESTART");
    makeSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")},200)
      startOver();
  }
}

function startOver(){
  gamePattern=[];
  userClickedPattern=[];
  level=0;
}

$(document).keydown(function(e){
  if (e.key==="Enter"){
    startOver();
    setTimeout(function (){
      nextSequence()},1000);
    }
  })

function nextSequence() {
  level++
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);
  for (i=0;i<level;i++){
      (function (i){
      setTimeout(function(){console.log(gamePattern[i]);
      animateButton(gamePattern[i]);
      makeSound(gamePattern[i])},500*i)
  })(i)
  }
}

$(".btn").click(function (){
var btnClicked=$(this).attr("id");
userClickedPattern.push(btnClicked);
makeSound(btnClicked);
animatePress(btnClicked);
checkAnswer(userClickedPattern.length-1);
})

function animatePress(color){
  var col=$("#"+color);
  col.addClass("pressed");
  setTimeout(function(){
    col.removeClass("pressed")},100)
}

function animateButton(color){
  $("#" + color).fadeOut().fadeIn();
}

function makeSound(color) {
  switch (color) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "wrong":
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      break;
    default:

  }


}
