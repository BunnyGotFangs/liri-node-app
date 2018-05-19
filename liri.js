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
 // error statement       
      if(!error)
        {
 //looping to get multiple twitter responses and limiting to 20           
        for(var i = 0; i<tweets.length; i++)
            {
                var date = tweets[i].created_at;
                console.log(User_ID + tweets[i].text + date.substring(0, 19));
//tryig to include the creation of the information in a text file
                fs.appendFile('log.txt', User_ID  + tweets[i].text + date.substring(0, 19));
                
            }
        }
                else
            {
                console.log('OOPS, there is a problem.');
            }
    });
}

//next function needed is for being able to the song search if it were to work. This too will have a defualt referenence incase no song is provided
//need to bring information back for artist, the songs name(title), preview song link, album that was from
function songs()
{
    spotify.search(
    { type: 'track', query: song}, function(error, data)
        {
//error statement
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
//tryig to include the creation of the information in a text file
          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
// inputting a defalt value so that all can see someting is no  movie supplied  
                }
            } 
            else
            {
                console.log('OOOPS! There was a problem');
            }
        });
  }
  
  // next is the function for finding movie information calling omdb and passing some requests for plot and tomatoes and reg stuff
  function movies()
{
    var oURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';
  //error statement
    request(oURL, function (error, response, body)
    {
      if(!error && response.statusCode == 200)
        {
            var body = JSON.parse(body);
  
        console.log(body.Title);
        console.log(body.Year);
        console.log(body.imdbRating);
        console.log(body.tomatoRating);
        console.log(body.Country);
        console.log(body.Language);
        console.log(body.Plot);
        console.log(body.Actors);
  
//tryig to include the creation of the information in a text file
        fs.appendFile('log.txt', body.Title);
        fs.appendFile('log.txt', body.Year);
        fs.appendFile('log.txt', body.imdbRating);
        fs.appendFile('log.txt', body.tomatoRating);
        fs.appendFile('log.txt', body.Country);
        fs.appendFile('log.txt', body.Language);
        fs.appendFile('log.txt', body.Plot);
        fs.appendFile('log.txt', body.Actors);
  
        } 
            else
        {
            console.log('OOPS, there is a problem.')
        }
        //here is the if statement and default value for in case no movie was input
            if(movie === "Mr. Nobody")
        {

            console.log("If you haven't watched 'Mr. Nobody,' then the instructor of my class says I should tell you too. I have never seen it, but here's the info http://www.imdb.com/title/tt0485947/");
    
            fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
            fs.appendFile('log.txt', "It's on Netflix!");
        }
    });
  
}
  //but not 100% what it is I am supposed to be doing with the random file. I know I need a function but to do what
  function Whatevs()
{
    
}