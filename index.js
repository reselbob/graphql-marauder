const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./graphql/typedefs');
const resolvers = require('./graphql/resolvers');
const subscriptions = require('./graphql/subscriptions');

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
    subscriptions,
    typeDefs,
    resolvers,
});


server.listen(PORT).then(({url, subscriptionsUrl}) => {
    process.env.SERVER_CONFIG = JSON.stringify({serverUrl: url, subscriptionsUrl});
    console.log(`Starting servers at ${new Date()}`);
    console.log(`🚀  Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
});

//Export the server to make it available to unit and API tests
module.exports = {server};