var totalTweets = 0;
var numNew = 0;
var user = null;

var checkNewTweets = function() {
    var numTweets = streams.home.length;
    
    numNew = numTweets - totalTweets;
    
    totalTweets = numTweets;
};


var showAllTweets = function() {
    user = null;
    $('.row').fadeIn();
};

var showUserTweets = function() {
    if (user === null) {
	showAllTweets();
	return;
    }
    if (user[0] !== '@') user = '@' + user;
    
    $('.row').each(function(i) {
	var current = $(this).children('.user');
	var row_user = current.text();
	if (row_user !== user) {
	    //$(this).fadeOut();
	    $(this).hide();
	}
	else {
	    $(this).fadeIn();
	}
    });
};

var updateTweets = function() {
    var toInsert = '';
    var head = totalTweets - 1;
    var i = 0;
    while(i < numNew) {
        var tweet = streams.home[head - i];
        var text = tweet.message;
	var user = '@' + tweet.user;

	var $user = '<div class="user no-underline">' + "<a href='#' class='no-underline'>" + user + "</a>" + "</div>";
	var $timestamp = '<span class="timestamp" data-time="' + tweet.created_at + '"></span>';
        var $tweetMsg = '<div class="tweet_msg">' + text + '</div>' + $timestamp;
	var $tweet = '<div class="tweet">' + $tweetMsg + '</div>';

	var $node = '<div class="row">' + $user + $tweet + '</div>';
		
        toInsert += $node;

        i += 1;
    }

    $('#tweets').prepend(toInsert);

    showUserTweets();

    $('.timestamp').each(function() {
	var readableTime = moment($(this).data('time')).fromNow();
	$(this).text(readableTime);
    });

};

var update = function() {
    checkNewTweets();
    updateTweets();
};
