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
    context = this.#graphServer.context, // TODO: is this needed
    filter,
    headers,
    operationName = "FindPeople",
  }) {
    const query = `query ${operationName}($filter: people_find_input) {
      training {
        people_query {
          people_find(filters: $filter) {
            ${fields}
          }
        }
      }
    }`;
    return await svQuery({
      query,
      variables: { filter },
      url: this.#graphUrl,
      headers,
      clean: true, // nullToUndefined will run automatically
      operationName,
    });
  }
  async insert({
    fields,
    context,
    input,
    headers,
    operationName = "InsertPeople",
  }) {
    const query = `mutation ${operationName}($input: [people_insert_input!]!) {
      training {
        people_mutation {
          people_insert(people: $input) {
            ${fields}
          }
        }
      }
    }`;
    return await svQuery({
      query,
      variables: { input },
      url: this.#graphUrl,
      headers,
      clean: true, // nullToUndefined will run automatically
      operationName,
    });
  }
  async remove({
    fields,
    context,
    filter,
    headers,
    operationName = "RemovePeople",
  }) {
    const query = `mutation ${operationName}($filter: people_remove_input) {
      training {
        people_mutation {
          people_remove(peopleIds: $filter) {
            ${fields}
          }
        }
      }
    }`;
    return await svQuery({
      query,
      variables: { filter },
      url: this.#graphUrl,
      headers,
      clean: true, // nullToUndefined will run automatically
      operationName,
    });
  }
};

module.exports = People;