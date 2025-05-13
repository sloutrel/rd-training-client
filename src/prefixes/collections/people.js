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

    const { nullToUndefined, query } = require('@simpleview/sv-graphql-client');
    
    const People = class {
			#graphServer;
			#graphUrl;
			constructor({ graphUrl, graphServer }) {
        this.#graphServer = graphServer;
				this.#graphUrl = graphUrl;
      }

      async find({fields, context, filter, headers, operationName}) {
        const query = `query movieQuery($filters: movies_find_input) {
          training {
            movies_query {
              movies_find(filters: $filters) {
                ${fields}
              }
            }
          }
        }`;
        const result = await query({
          query,
          variables: filter,
          url: this.#graphUrl,
          headers,
          context,
          clean: true,
          operationName
        })

        return result;
      };
		};

    module.exports = People;