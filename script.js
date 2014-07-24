var totalTweets = 0;
var numNew = 0;

var checkNewTweets = function() {
    var numTweets = streams.home.length;
    
    numNew = numTweets - totalTweets;
    
    totalTweets = numTweets;
};

var showUserTweets = function(user) {
    if (user === undefined) return;
    if (user[0] !== '@') user = '@' + user;
    
    $('.row').each(function(i) {
	var current = $(this).children('.user');
	var row_user = current.text();
	if (row_user !== user) {
	    $(this).fadeOut();
	}
    });
    /*
    $.grep($('.row'), function(obj, i) {
	console.log(obj);
	return true;//obj.find('.user').text !== user;
    })
    */
};

var showAllTweets = function() {
    $('.row').fadeIn();
};

var updateTweets = function() {
    var toInsert = '';
    var head = totalTweets - 1;
    var i = 0;
    while(i < numNew) {
        var tweet = streams.home[head - i];
        var text = tweet.message;
	var user = '@' + tweet.user;

	var $user = '<div class="user">' + user + "</div>";
	var $timestamp = '<span class="timestamp" data-time="' + tweet.created_at + '"></span>';
        var $tweetMsg = '<div class="tweet_msg">' + text + '</div>' + $timestamp;
	var $tweet = '<div class="tweet">' + $tweetMsg + '</div>';

	var $node = '<div class="row">' + $user + $tweet + '</div>';
		
        toInsert += $node;

        i += 1;
    }

    $('#tweets').prepend(toInsert);
    $('.row').fadeIn();	
    $('.timestamp').each(function() {
	var readableTime = moment($(this).data('time')).fromNow();
	$(this).text(readableTime);
    });

};

var update = function() {
    checkNewTweets();
    updateTweets();
};
