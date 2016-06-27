function fetchQuestion( button ) {

	// UI elements
	var buttonElement = button;

	var randomRange = 6;

	// List of the questions and answers ; don't forget the source

	var questionList = [
		['Question 1', 'Answer 1', 'Source 1'],
		['Question 2', 'Answer 2', 'Source 2'],
		['Question 3', 'Answer 3', 'Source 3'],
		['Question 4', 'Answer 4', 'Source 4'],
		['Question 5', 'Answer 5', 'Source 5'],
		['Question 6', 'Answer 6', 'Source 6'],
		['Question 7', 'Answer 7', 'Source 7'],
		['Question 8', 'Answer 8', 'Source 8'],
	];

	var questions = null;

	// Prepares and binds the button
	var init = function() {

		button.onclick = onButtonClick;

		questions = questionList.slice(0);

		// If the Browser supports html5 storage
		if ( supportsHtmlStorage() === true ) {

			// Check for past data
			if ( localStorage[ 'questions' ] !== undefined ) {
				loadQuestions();
			}
		}
	};

	// Selects and removes the next question from the list
	var selectQuestion = function() {
		var question, range, index;

		range = randomRange > questions.length ? questions.length : randomRange;
		index = Math.floor(Math.random() * range);

		question = questions[index];
		questions.splice(index, 1);

		return question;
	};

	// Opens the given url in a new window
	var openSite = function( url ) {
		window.open( url );
	};

	var onButtonClick = function() {

		var question = selectQuestion();

		document.getElementById('question').innerHTML = question[0];
		document.getElementById('answer').innerHTML = question[1];
		document.getElementById('source').innerHTML = question[2];
		document.getElementById('source').setAttribute('href', question[2]);

		// When all questions have been seen, refresh the list
		if ( questions.length == 0 ) {
			questions = questionList.slice(0);
    	}

    	storeQuestions();
	};

	// Save the current list of questions for the new user.
	var storeQuestions = function() {
		localStorage[ 'questions' ] = JSON.stringify( questions );
	}

	// Load the list of questions
	var loadQuestions = function() {
		questions = JSON.parse(localStorage['questions']);
	};

	init();
}
