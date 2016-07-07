function fetchQuestion( button ) {

	// UI elements
	var buttonElement = button;

	var randomRange = 6;

	// List of the questions and answers ; [Question ; Answer ; Source link ; Source text]
	// Source link is optional
	// Source text is optional

	var questionList = [
	// ReactJS relative questions
	// ---------------------------
		
		['Who is in charge of the development of React JS?',
		'React JS was originally built by Facebook. Today, a large community contribute to it',
		'https://github.com/facebook/react',
		'React JS Github'],
		['Why is React JS so fast?',
		'React JS uses what\'s called a virtual DOM that allows to only update the minimum necessary in what\'s displayed',
		'https://facebook.github.io/react/docs/advanced-performance.html',
		'React Advanced Performance'],
		['What is the logic of React?',
		'React is all about building reusable components. In fact, with React the only thing you do is build components. Since they\'re so encapsulated, components make code reuse, testing, and separation of concerns easy.',
		'https://facebook.github.io/react/docs/why-react.html',
		'Why React?'],
		['What back-end should I use React with?',
		'React can work with any regular back-end. However, many people prefer to use Node.js to have a javascript full stack. Also, many people use webpack which is quite convenient',
		'',
		''],
		['Why aren\'t the styles in an external common file?',
		'Styles are local because of the component logic. Basically, if you want a style to be shared by several components, it\'s the same component, maybe nested in another component',
		'',
		''],

	// React Native relative questions
	// -------------------------------

		['Navigator, NavigatorIOS or Navigation Experimental in RN?',
		'Navigator is the current common choice. However, Facebook is dropping support for it and focusing on Navigation Experimental which includes the Redux logic which is commonly admitted as best practice today. You could still use NavigatorIOS since it is a native component, but you won\'t be able to personalize it.',
		'https://github.com/ericvicenti/navigation-rfc/blob/master/Docs/NavigationOverview.md',
		'Navigation Comparison'],
		['Who is in charge of the development of React Native?',
		'React JS was originally built by Facebook. Today, a large community contribute to it',
		'https://github.com/facebook/react-native',
		'React Native GitHub'],
		['Is React Native stable?',
		'There is a minor update of React Native approximatively every 2 weeks. However, none of them should break your app',
		'',
		''],
		['How to create animations in React Native?',
		'There is a library dedicated to it called Animated',
		'https://facebook.github.io/react-native/docs/animations.html',
		'Animated Library'],
		['Are React JS and React Native the same language?',
		'The logic and the syntax are the same ; the only difference is the HTML tags replaced by mobile components tags',
		'https://facebook.github.io/react-native/',
		'React Native Homepage'],
		['Is React Native really native?',
		'The UI is exclusively native, while the logic part of the app is executed in its own separated thread by Javascript-engine',
		'https://medium.com/@talkol/performance-limitations-of-react-native-and-how-to-overcome-them-947630d7f440#.7a5xt7z54',
		'Performance limitations'],
		['Is React Native hybrid?',
		'Since the logic part of the app is executed in a separate thread by Javascript-engine, yes',
		'https://medium.com/@talkol/performance-limitations-of-react-native-and-how-to-overcome-them-947630d7f440#.7a5xt7z54',
		'Performance limitations'],
		['Can I use one code for iOS and Android?',
		'That depends on the components you are using ; some are exclusive to iOS or Android, some work on both. However, you should consider users are used to different UI and UX depending on the platform',
		'',
		''],
		['How can I contribute to React Native?',
		'You can create your own components or make a pull request for any existing component on GitHub!',
		'',
		''],
		['Why can\'t I develop with React Native iOS without a Mac?',
		'For now, you need XCode to compile an iOS app, which is exclusively on OSX (soon to be Mac OS).',
		'',
		''],
		['Are there any best practices for React Native? Where to find them?',
		'The best pratices are still in dispute. The closest to them would be the official F8 sample app you can find on GitHub',
		'https://github.com/fbsamples/f8app',
		'F8 on GitHub'],

	// Redux relative question
	// -----------------------

		['Who is in charge of the development of Redux?',
		'Redux was originally developed by Dan Abramov, who was since hired at Facebook',
		'https://twitter.com/dan_abramov/status/671135846830075904',
		'Dan Abramov tweet'],
		['What is Flux?',
		'Flux is a logic architecture to handle the data flow of your app and any state in it. It eases the way you can get your data shared between several components',
		'',
		''],
		['What is Redux?',
		'Redux is an implementation of Flux. It comes with many functions you will use all the time',
		'http://redux.js.org/',
		'redux.js.org'],
		['What are actions and reducers?',
		'Actions and reducers are Redux notions. Actions are payloads of information that describe "what happens" and reducers update the state according to those actions',
		'http://redux.js.org/docs/basics/Store.html',
		'Store in Redux'],
		['What are mapStateToProps and mapDispatchToProps?',
		'These are common functions used in a Flux environment. Since the states are supposed to be immutable in Redux, you need to pass them to your props and manipulate as such. mapDispatchToProps will then update your main state',
		'',
		''],
		['Is Redux or any other implementation of Flux required when working with React?',
		'Flux is not required but highly recommended if you do not want to avoid struggling with states and props being inherited in a messy project',
		'',
		''],
		// ['Question 8',
		// 'Answer 8',
		// '',
		// ''],
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
			if (question[3] == null || question[3] == '' || question[3] == undefined)
				document.getElementById('sourceLink').innerHTML = question[2];
			else
				document.getElementById('sourceLink').innerHTML = question[3];
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
			if (question[3] == null || question[3] == '' || question[3] == undefined)
				document.getElementById('sourceLink').innerHTML = question[2];
			else
				document.getElementById('sourceLink').innerHTML = question[3];
			document.getElementById('sourceLink').setAttribute('href', question[2]);
		}
		mixpanel.track("Next Click");
		mixpanel.people.increment("next_clicks");
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
