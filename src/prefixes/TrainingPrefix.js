// This file should declare a class with the name of the prefix and export that class.

// Your prefix should contain:
  // a constructor that:
    // accepts an object argument with graphUrl and graphServer
    // sets this.name to "training"
    // sets private variables for graphUrl and graphServer values from the arguments passed in.
    // A folder called collections/ which should contain a js file for each of your collections.

// The prefix should import the collections and expose the methods for that collection

const Movies = require('./collections/movies');
const People = require('./collections/people');

const TrainingPrefix = class {
  #graphServer;
  #graphUrl;
  constructor({graphUrl, graphServer}) {
    this.name = "training";
    this.#graphServer = graphServer;
    this.#graphUrl = graphUrl;

    this.movies = new Movies({ graphServer: this.#graphServer, graphUrl: this.#graphUrl });
    this.people = new People({ graphServer: this.#graphServer, graphUrl: this.#graphUrl })
  }
}

module.exports = TrainingPrefix;