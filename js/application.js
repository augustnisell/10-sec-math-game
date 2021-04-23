var generateQuestion = function () {
	var var1 = Math.ceil(Math.random() * 10);
	var var2 = Math.ceil(Math.random() * 10);

	$('#question').text(var1 + ' + ' + var2 + ' = ?');

	return var1 + var2;
}

var checkAnswer = function(playerResponse, correctAnswer) {
	return playerResponse === correctAnswer;
}

$(document).ready(function () {
	var answer = generateQuestion();

	$(document).on('submit', '#responseForm', function(event) {
  	event.preventDefault();
  	var response = parseInt($('#response').val());
  	if (checkAnswer(response, answer)) {
  		$('#currentScore').text(parseInt($('#currentScore').text()) + 1);
  		answer = generateQuestion();
  	}
  	$('#response').val('');
  });
});