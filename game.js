var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var wrongSeqSound = new Audio("sounds/wrong.mp3");

function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color){
  $(color).addClass("pressed");
  setTimeout(function () {
    $(color).removeClass("pressed");
  }, 100);
}

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  animatePress("#"+randomChosenColor);
}

function gameOver(){
  wrongSeqSound.play();
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 100);
  setTimeout(function () {
    alertUserLevel();
  }, 150);
  setTimeout(function () {
    gamePattern.splice(0, gamePattern.length);
    userClickedPattern.splice(0, userClickedPattern.length);
  }, 200);
  $("body").keypress(function(event){
    if(gamePattern.length === 0){
      nextSequence();
      $("h1").text("Level "+ gamePattern.length);
    }
  })
}


  $('body').keypress(function(event){
    if(gamePattern.length === 0){
      nextSequence();
      $("h1").text("Level "+ gamePattern.length);

    }
  });

  $(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(this.id);
    animatePress("#"+this.id);
    if(gamePattern.length > userClickedPattern.length){
      for(var i = 0; i< userClickedPattern.length; i++){
        if(gamePattern[i] === userClickedPattern[i]){console.log("guessed right")}
        else{
          gameOver();
        }
      }
    }
    else if(JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern) && gamePattern.length === userClickedPattern.length){
      var numIncr = gamePattern.length + 1;
      $("h1").text("Level "+ numIncr);
      userClickedPattern.splice(0, userClickedPattern.length);
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
    else if(JSON.stringify(gamePattern) !== JSON.stringify(userClickedPattern)){
      gameOver();

    }
  });

  function alertUserLevel(){
    if(gamePattern.length < 3){
      alert("You made it to level " + gamePattern.length + "! You did okay, but can do better.🤔");
    }
    else if(gamePattern.length >2 && gamePattern.length <7){
      alert("Okay! You made it to level " + gamePattern.length + "! Now that is what I am talking about.🤩");
    }
    else if(gamePattern.length>6 && gamePattern.length < 12){
      alert("oh la la... you made it to level " + gamePattern.length + "! You definitely can represent the human race. 😇😱");
    }
    else{alert("🤯🤯🤯 Are you even human?!!! You made it to level " + gamePattern.length + "! You are definitely on fire🔥 ");
    }
  }
