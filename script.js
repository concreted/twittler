var totalTweets = 0;
var numNew = 0;

var checkNewTweets = function() {
    var numTweets = streams.home.length;
    
    numNew = numTweets - totalTweets;
    
    totalTweets = numTweets;
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

		var $node = $user + $tweet + '</br>';
		
        toInsert += $node;

        i += 1;
    }

    $('#tweets').prepend(toInsert);
	$('.tweet').fadeIn();	
    $('.timestamp').each(function() {
		var readableTime = moment($(this).data('time')).fromNow();
		$(this).text(readableTime);
    });

};

var update = function() {
    checkNewTweets();
    updateTweets();
};
