function fetchQuestion( button ) {

	// UI elements
	var buttonElement = button;

	var randomRange = 6;

	// List of the questions and answers ; don't forget the source

	var questionList = [
		['Navigator, NavigatorIOS or Navigation Experimental in RN?',
		'Navigator is the current common choice. However, Facebook is dropping support for it and focusing on Navigation Experimental which includes the Redux logic which is commonly admitted as best practice today. You could still use NavigatorIOS since it is a native component, but you won\'t be able to personalize it.',
		'https://github.com/ericvicenti/navigation-rfc/blob/master/Docs/NavigationOverview.md'],
		['Question 2', 'Answer 2', ''],
		['Question 3', 'Answer 3'],
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

		var question = selectQuestion();

		document.getElementById('question').innerHTML = question[0];
		document.getElementById('answer').innerHTML = question[1];
		if (question[2] == null || question[2] == '' || question[2] == undefined) {
			document.getElementById('source').innerHTML = '';
			document.getElementById('sourceLink').innerHTML = '';
		} else {
			document.getElementById('source').innerHTML = 'Source: ';
			document.getElementById('sourceLink').innerHTML = question[2];
			document.getElementById('sourceLink').setAttribute('href', question[2]);
		}
	};

	// Selects and removes the next question from the list
	var selectQuestion = function() {
		var question, range, index;

		range = randomRange > questions.length ? questions.length : randomRange;
		index = Math.floor(Math.random() * range);

		question = questions[index];
		questions.splice(index, 1);

		// When all questions have been seen, refresh the list
		if ( questions.length == 0 ) {
			questions = questionList.slice(0);
    	}
    	storeQuestions();

		return question;
	};

	var onButtonClick = function() {

		var question = selectQuestion();

		document.getElementById('question').innerHTML = question[0];
		document.getElementById('answer').innerHTML = question[1];
		if (question[2] == null || question[2] == '' || question[2] == undefined) {
			document.getElementById('source').innerHTML = '';
			document.getElementById('sourceLink').innerHTML = '';
		} else {
			document.getElementById('source').innerHTML = 'Source: ';
			document.getElementById('sourceLink').innerHTML = question[2];
			document.getElementById('sourceLink').setAttribute('href', question[2]);
		}
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
