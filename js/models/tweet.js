var app = app || {};

app.Tweet = Backbone.Model.extend( {
    defaults: {
		user: '',
		body: '',
		timestamp: '',
	}
});