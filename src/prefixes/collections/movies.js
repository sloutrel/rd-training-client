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
				const query = `query ${operationName}($filter: movies_find_input) {
          training {
            movies_query {
              movies_find(filters: $filter) {
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
				operationName = "InsertMovie",
			}) {
				const query = `mutation ${operationName}($input: [movies_insert_input!]!) {
          training {
            movies_mutation {
              movies_insert(movies: $input) {
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
				operationName = "RemoveMovie",
			}) {
				const query = `mutation ${operationName}($filter: movies_remove_input) {
          training {
            movies_mutation {
              movies_remove(movieIds: $filter) {
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

		module.exports = Movies;