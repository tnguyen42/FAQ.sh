if (supportsHtmlStorage() === true) {
	if (localStorage.FAQuid !== undefined) {
		mixpanel.identify(localStorage.FAQuid);
		mixpanel.people.set({
			$last_login: moment().format()
		});
	} else {
		var id = moment().format();

		localStorage.FAQuid = id;
		mixpanel.identify(id);
		mixpanel.people.set({
			$created: moment().format('MMMM Do YYYY'),
			$last_login: moment().format('MMMM Do YYYY'),
			next_clicks: 0
		});
	}
}