//instructions noted to get keys first, below are the variables to get the keys

require("dotenv").config();
var keys = require('./keys.js');
//next is the section to use require to request info from respective source, but not IMDB, that we come in differnt fashion
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');
// access key information as noted in instruction
//var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);

// need ti create variables for the input (request and request value
var request = process.argv;
var searchFor = process.argv[2];

//need to build the area for inputs and for the inputs to then call the functions to search and return the repective info
//Found this online as way to create the options instead of if else statements switch (expression) {
//swithc(nameit) 
//   case value1:
    //Statements executed when the
    //result of expression matches value1
 //   [break;]
 // case value2:
    //Statements executed when the
    //result of expression matches value2
switch(command)
{
//set-up for getting twwets
    case "my-tweets":
        Tweets();
    break;
//for getting songs, but need to have default value in there in case there is no value input if else statement      
    case "spotify-this-song":
        if(x)
        {
            Songs(x);
        } 
        else
        {
            Songs("The Sign");
        }
    break;
//for getting the movie information, but also needed a defualt in case user didn't give movie name      
    case "movie-this":
        if(x)
        {
            Movies(x)
        } 
        else
        {
            Movies("Mr. Nobody")
        }
    break;
 //refers to the randome text file     
    case "do-what-it-says":
        Whatevs();
    break;
 // the swith required a default so have put this in.     
    default:
          console.log("Please enter your request (my-tweets, spotify-this-song, movie-this, do-what-it-says) followed by a space and your search criteria");
    break;
}
//UGH error that is cannot find something... I give on this as it has been hours moving on

////////Need to input the functions now for the searching

//have to write a function in order to get the tweets and limit to only 20 results
function Tweets()
{

    var User_ID = 
    {
        screen_name: 'HiltOp'
    };
    client.get('statuses/user_timeline', User_ID, function(error, tweets, response)
    {
      if(!error)
        {
        for(var i = 0; i<tweets.length; i++)
            {
                var date = tweets[i].created_at;
                console.log(User_ID + tweets[i].text + " Created At: " + date.substring(0, 19));
                console.log("-----------------------");
                fs.appendFile('log.txt', User_ID  + tweets[i].text + " Created At: " + date.substring(0, 19));
                
            }
        }
                else
            {
                console.log('OOPS, there is a problem.');
            }
    s});
}

//next function needed is for being able to the song search if it were to work. This too will have a defualt referenence incase no song is provided
//need to bring information back for artist, the songs name(title), preview song link, album that was from
function songs()
{
    spotify.search(
    { type: 'track', query: song}, function(error, data)
        {
      if(!error)
            {
        for(var i = 0; i < data.tracks.items.length; i++)
                {
                    var songData = data.tracks.items[i];
//the identifed results requested based upon song input     
          console.log(songData.artists[0].name);
          console.log(songData.name);
          console.log(songData.preview_url);
          console.log(songData.album.name);
 //add the info
          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
// inputting a defalt value so that all can see someting is now movie supplier  
                }
            } else
            {
                console.log('OOOPS! There was a problem');
            }
        });
  }
  