		
		// Use the datas at the end
		function useData(data) {
			$("ul").remove();
			
			$("body").append("<ul>");
				for (i=0;i<data.length;i++) {
					$("ul").append("<li>" + data[i] + "</li>");
				}
		}
		
		// Parses a tweet and rebuilds it into links ans such
		function parseTweet(tweet) {

			var htmlTweet = tweet['text'];
			// Let's go down to strawberry fields forever
			
			// Check for urls
			if (tweet['entities']['urls'].length) {
				htmlTweet = htmlTweet.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(http) {
					return http.link(http);
				});
			};
			
			// Check for media
			try { // Wrap try catch because sometime there aren't media
				if (tweet['entities']['media'].length) {
					htmlTweet = htmlTweet.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(http) {
						return http.link(http);
					});
				};
			} catch(err) {};
			
			// Check for hashtags
			if (tweet['entities']['hashtags'].length) {
				htmlTweet = htmlTweet.replace(/[#]+[A-Za-z0-9-_]+/gi, function(tag) {
					return tag.link("http://search.twitter.com/search?q="+(tag.replace("#","%23")));
				});
			};
			
			// Check for users
			if (tweet['entities']['user_mentions'].length) {
				htmlTweet = htmlTweet.replace(/[@]+[A-Za-z0-9-_]+/gi, function(user) {
					return user.link("http://twitter.com/"+(user.replace("@","")));
				});
			};
			
			// Done
			return htmlTweet;
		};
		
		// Gets tweets
		function getTwitter(user,tweets) {
			tweetData = new Array();
			$.getJSON("https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&screen_name=" + user + "&count=" + tweets + "&callback=?",
			function(data) {
				for (i=0;i<data.length;i++) {
					tweetData.push(parseTweet(data[i]));
				};
				useData(tweetData);
			});
		};
