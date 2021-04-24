// Update generateQuestion() for different operators

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

var specifyOperator = function () {
	var allOperators = ['add', 'subtract', 'multiply', 'divide'];
	var usedOperators =[];
	for (var i = 0; i < allOperators.length; i++) {
		if ($('#' + allOperators[i]).is(':checked')) {
			usedOperators.push(allOperators[i]);
		}
	}

	return usedOperators[Math.floor(Math.random() * usedOperators.length)];
}

var generateQuestion = function () {
	var add = function (var1, var2) {
		$('#question').text(var1 + ' + ' + var2 + ' = ?');
			return var1 + var2;
	}
	var subtract = function (var1, var2) {
		if (var2 > var1) {
			var1, var2 = var2, var1;
		}
		$('#question').text(var1 + ' - ' + var2 + ' = ?');
		return var1 - var2;
	}
	var multiply = function (var1, var2) {
		$('#question').text(var1 + ' x ' + var2 + ' = ?');
		return var1 * var2;
	}
	var divide = function (var1, var2) {
		var1 = var1 * var2;
		$('#question').text(var1 + ' / ' + var2 + ' = ?');
		return var1 / var2;
	}

	var x = Math.ceil(Math.random() * 10);
	var y = Math.ceil(Math.random() * 10);

	var fnstring = specifyOperator();

	switch (fnstring) {
		case "add":
			return add(x, y);
			break;
		case "subtract":
			return subtract(x, y);
			break;
		case "multiply":
			return multiply(x, y);
			break;
		case "divide":
			return divide(x, y);
			break;
	}
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
    		$('#startMenu').toggleClass('hidden');
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
		$('#startMenu').toggleClass('hidden');
		startRound();
	});
});