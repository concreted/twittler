var totalTweets = 0;
var numNew = 0;

var formatDate = function(date) {
    var hours = '' + date.getHours();
    var minutes = '' + date.getMinutes();
    var seconds = '' + date.getSeconds();
    hours = hours.length < 2 ? '0' + hours : hours;
    minutes = minutes.length < 2 ? '0' + minutes : minutes;
    seconds = seconds.length < 2 ? '0' + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
}

var checkNewTweets = function() {
    var numTweets = streams.home.length;
    
    numNew = numTweets - totalTweets;
    
    totalTweets = numTweets;
    
    if (numNew > 0)
        console.log(numNew + ", " + totalTweets);
};

var updateTweets = function() {
    var toInsert = '';
    var head = totalTweets - 1;
    var i = 0;
    while(i < numNew){
        var tweet = streams.home[head - i];

	var minutes = '' + tweet.created_at.getMinutes();
	if (minutes.length < 3) {
	    minutes = '0' + minutes;
	}

	var timestamp = formatDate(tweet.created_at); //tweet.created_at.getHours() + ":" + minutes + ":" + tweet.created_at.getSeconds();          
	var $timestamp = '<div class="timestamp">' + timestamp + '</div>';
	
        var text = '@' + tweet.user + ': ' + tweet.message;
        var $tweetMsg = '<div class="tweet_msg">' + text + '</div>' + $timestamp;
	
	var $tweet = '<div class = "tweet">' + $tweetMsg + '</div>';
        toInsert += $tweet;
        i += 1;
    }
    $('body').prepend(toInsert);
};

var update = function() {
    checkNewTweets();
    updateTweets();
};
