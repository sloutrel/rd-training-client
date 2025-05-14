// Each collection should contain:
  // a constructor that:
  // accepts an object argument with graphUrl and graphServer
  // sets private variables for graphUrl and graphServer values from the arguments passed in.

  // three methods that adhere to your graphQL endpoints. Each method (find, insert, remove) should:
    // Pass at minimum:
      //  - fields
      //  - context
      //  - input/filter
    // Use variables
    // Use the url from the constructor
    // Use headers (accept header in arguments and pass to graphQl query) - this info doesn't seem to be in documentation, but we do use it.
    // Query GraphQL via the query function from the npm sv-graphql-client library
    // Use nullToUndefined on the query result.

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