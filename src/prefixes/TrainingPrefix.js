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