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
    while(i < numNew){
        var tweet = streams.home[head - i];
        var text = '@' + tweet.user + ': ' + tweet.message;

	var $timestamp = '<div class="timestamp" data-time="' + tweet.created_at + '"></div>';
        var $tweetMsg = '<div class="tweet_msg">' + text + '</div>' + $timestamp;
	var $tweet = '<div class = "tweet">' + $tweetMsg + '</div>';

        toInsert += $tweet;

        i += 1;
    }

    $('body').prepend(toInsert);

    $('.timestamp').each(function() {
	var readableTime = moment($(this).data('time')).fromNow();
	$(this).text(readableTime);
    });

};

var update = function() {
    checkNewTweets();
    updateTweets();
};
