const { query: svQuery } = require("@simpleview/sv-graphql-client");

const People = class {
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
    operationName = "FindPeople",
  }) {
    context = context || this.#graphServer.context;
    const query = `query ${operationName}($filter: training_people_find_input) {
      training {
        people_find(filters: $filter) {
          ${fields}
        }
      }
    }`;
    return await svQuery({
			query,
			variables: { filter },
			url: this.#graphUrl,
			key: 'training.people_find',
			headers,
			clean: true, // nullToUndefined will run automatically
			operationName,
      token: context.token
		});
  }
  async insert({
    fields,
    context,
    input,
    headers,
    operationName = "InsertPeople",
  }) {
    context = context || this.#graphServer.context;
    const query = `mutation ${operationName}($input: [training_people_insert_input!]!) {
      training {
        people_insert(people: $input) {
          ${fields}
        }
      }
    }`;
    return await svQuery({
			query,
			variables: { input },
			url: this.#graphUrl,
			key: "training.people_insert",
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
    operationName = "RemovePeople",
  }) {
    context = context || this.#graphServer.context;
    const query = `mutation ${operationName}($filter: training_people_remove_input) {
      training {
        people_remove(peopleIds: $filter) {
          ${fields}
        }
      }
    }`;
    return await svQuery({
			query,
			variables: { filter },
			url: this.#graphUrl,
			key: "training.people_remove",
			headers,
			clean: true, // nullToUndefined will run automatically
			operationName,
			token: context.token,
		});
  }
};

module.exports = People;