var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
let level = 0;
var started = false;

function nextSequence() {
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    level++;
    $("h1").text("Level " + level);
    return randomChosenColour;
}

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function () {
    playSound(this.id);
    animatePress(this.id);
    if (userClickedPattern.length == 0 && gamePattern.length == 1) {
        userClickedPattern.push(this.id);
        checkAnswer();
    } else if (sucesso.includes(false) == false) {
        userClickedPattern.push(this.id);

        let currentIndex = userClickedPattern.length - 1;
        if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
            if (userClickedPattern.length == gamePattern.length) {
                checkAnswer();
            }
        } else {
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 100);
            started = false;
            level = 0;
            gamePattern.length = 0;
            userClickedPattern.length = 0;
            $("h1").text("Press A Key to Start");
        }

    } else {
        gamePattern.length = 0;
        userClickedPattern.length = 0;
        $("h1").text("Press A Key to Start");

    }
});

var sucesso = [false];

function checkAnswer() {
    sucesso.length = 0;
    for (let index = 0; index < userClickedPattern.length; index++) {
        if (gamePattern[index] == userClickedPattern[index]) {
            sucesso.push(true);
        } else {
            sucesso.push(false);
            console.log("errado");
            $("body").addClass("game-over");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 100);
            started = false;
            level = 0;
        }

    }
    if (sucesso.includes(false) == false) {
        nextSequence();
        userClickedPattern.length = 0;
        sucesso.length = 0;
    } else if (sucesso.includes(false) == true) {

        gamePattern.length = 0;
        userClickedPattern.length = 0;
        $("h1").text("Press A Key to Start");
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};