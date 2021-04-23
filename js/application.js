var highScore = 0;
var currentScore = 0;
var timeLeft = null;
var timer = null;

var startRound = function () {
	$('#response').val('');
	currentScore = 0;
	$('#currentScore').text(0);
	answer = generateQuestion();
	timerAction('startTimer');
	$('#response').focus();

	$(document).on('submit', '#responseForm', function(event) {
  	event.preventDefault();
  	var response = parseInt($('#response').val());
  	if (checkAnswer(response, answer)) {
  		timerAction('addTime');
  		currentScore += 1;
  		$('#currentScore').text(parseInt($('#currentScore').text()) + 1);
			if (currentScore > highScore) {
				highScore = currentScore;
				$('#highScore').text(currentScore);
			}
  		answer = generateQuestion();
  	}
  	$('#response').val('');
  });
}

var generateQuestion = function () {
	var var1 = Math.ceil(Math.random() * 10);
	var var2 = Math.ceil(Math.random() * 10);

	$('#question').text(var1 + ' + ' + var2 + ' = ?');

	return var1 + var2;
}

var checkAnswer = function(playerResponse, correctAnswer) {
	return playerResponse === correctAnswer;
}

var timerAction = function (action) {
	var timerSpan = $('#timeLeft');
	var initialTimeLimit = 10000;
	var startTime;

	var startTimer = function (time) {
    startTime = Date.now();
    timeLimit = time;
    timer = setInterval(function () {
      timeLeft = timeLimit - (Date.now() - startTime);
      timerSpan.text(Math.ceil(timeLeft / 1000));
    	if (timeLeft <= 0) {
    		stopTimer();
    		$('#questionBox').toggleClass('hidden');
    		$('#startButton').toggleClass('hidden');
    	}
  	}, 20);
	}

	var stopTimer = function () {
	  window.clearInterval(timer);
	  timer = null;
	};

	if (action === 'startTimer') {
		startTimer(initialTimeLimit);
	} else if (action === 'addTime') {
		stopTimer();
		startTimer(timeLeft + 1000);
	}
}

$(document).ready(function () {
	var answer;
	$('#startButton').focus();

	$(document).on('click', '#startButton', function(event) {
		$('#questionBox').toggleClass('hidden');
		$('#startButton').toggleClass('hidden');
		startRound();
	});
});