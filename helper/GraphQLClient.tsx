import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
// const domain = 'https://cfd-reactjs.herokuapp.com/';
const domain = 'http://localhost:8888/';

const GraphQL = new ApolloClient({
    uri: `${domain}graphql`,
    cache: new InMemoryCache()
});

const GraphQLClient = {
    query: (qr: string) => {
        return GraphQL.query({
            query: gql`${qr}`
        })
    }
}


export default GraphQLClient