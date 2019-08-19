require("dotenv").config();

var keys = require("./keys.js");
// Basic Node application for requesting data from the OMDB website via axios
// Here we incorporate the "axios" npm package
var axios = require("axios");
var moment = require("moment");

var DigitalAssistant = function () {
   
    this.movie = function () {
        // We then run the request with axios module on a URL with a JSON
        axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
            function (response) {
                // Then we print out the movie info
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Score: " + response.data.Ratings[1].Value);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Cast: " + response.data.Actors);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function() {
                // always executed
            })

    };

    this.concert = function() {
        axios.get("https://rest.bandsintown.com/artists/tyler+the+creator/events?app_id=codingbootcamp").then(
            function (response) {
                // handle success
                console.log("Venue: " + response.data[0].venue.name);
                console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log("Date: " + JSON.stringify({
                    datetime : moment().format("L")}));
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function() {
                // always executed
            })
    };

    this.spotify = function() {
        console.log("How about we add some Spotify too!");
    };
}

var bots = {};

bots.Liri = new DigitalAssistant();

// var spotify = new Spotify(keys.spotify);

var bot = process.argv[2];
var method = process.argv[3];

bots[bot][method]();
