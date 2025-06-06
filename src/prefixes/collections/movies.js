const { query: svQuery } = require("@simpleview/sv-graphql-client");

const Movies = class {
  #graphServer;
  #graphUrl;
  constructor({ graphUrl, graphServer }) {
    this.#graphServer = graphServer;
    this.#graphUrl = graphUrl;
  }

  async find({
    fields,
    context,
    filter,
    headers,
    operationName = "FindMovie",
  }) {
    context = context || this.#graphServer.context;
    const query = `query ${operationName}($filter: training_movies_find_input) {
      training {
        movies_find(filters: $filter) {
          ${fields}
        }
      }
    }`;
    return await svQuery({
			query,
			variables: { filter },
			url: this.#graphUrl,
			key: "training.movies_find",
			headers,
			clean: true, // nullToUndefined will run automatically
			operationName,
			token: context.token,
		});
  }
  async insert({
    fields,
    context,
    input,
    headers,
    operationName = "InsertMovie",
  }) {
    context = context || this.#graphServer.context;
    const query = `mutation ${operationName}($input: [training_movies_insert_input!]!) {
      training {
        movies_insert(movies: $input) {
          ${fields}
        }
      }
    }`;
    return await svQuery({
			query,
			variables: { input },
			url: this.#graphUrl,
			key: "training.movies_insert",
			headers,
			clean: true, // nullToUndefined will run automatically
			operationName,
			token: context.token,
		});
  }
  async remove({
    fields,
    context,
    filter,
    headers,
    operationName = "RemoveMovie",
  }) {
    context = context || this.#graphServer.context;
    const query = `mutation ${operationName}($filter: training_movies_remove_input) {
      training {
        movies_remove(movieIds: $filter) {
          ${fields}
        }
      }
    }`;
    return await svQuery({
			query,
			variables: { filter },
			url: this.#graphUrl,
			key: "training.movies_remove",
			headers,
			clean: true, // nullToUndefined will run automatically
			operationName,
			token: context.token,
		});
  }
};

module.exports = Movies;