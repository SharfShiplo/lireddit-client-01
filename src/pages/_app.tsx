import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { AppProps } from "next/app";
import { createClient, Provider } from "urql";
// Will be needed while updating the cache
// import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
// import { cacheExchange, Cache, QueryInput } from "@urql/exchange-graphcache";
// import { LoginMutation, RegisterMutation } from "../generated/graphql";

// function betterUpdateQuery<Result, Query>(
//   cache: Cache,
//   qi: QueryInput,
//   result: any,
//   fn: (r: Result, q: Query) => Query
// ) {
//   return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
// }

const client = createClient({
  url: "http://localhost:4000/graphql",
  // this is how er update the cache while it's needed
  // exchanges: [
  //   dedupExchange,
  //   cacheExchange({
  //     updates: {
  //       Mutation: {
  //         login: (_result, arg, cache, info) => {
  //           cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {});
  //           betterUpdateQuery<LoginMutation, MeQuery>(
  //             cache,
  //             { query: MeDocument },
  //             _result,
  //             (result, query) => {
  //               if (result.login.errors) {
  //                 return query;
  //               } else {
  //                 return {
  //                   me: result.login.user,
  //                 };
  //               }
  //             }
  //           );
  //         },
  //         register: (_result, arg, cache, info) => {
  //           cache.updateQuery({ query: MeDocument }, (data: MeQuery) => {});
  //           betterUpdateQuery<RegisterMutation, MeQuery>(
  //             cache,
  //             { query: MeDocument },
  //             _result,
  //             (result, query) => {
  //               if (result.register.errors) {
  //                 return query;
  //               } else {
  //                 return {
  //                   me: result.register.user,
  //                 };
  //               }
  //             }
  //           );
  //         },
  //       },
  //     },
  //   }),
  //   fetchExchange,
  // ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
