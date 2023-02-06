import { dedupExchange, fetchExchange } from "urql";
import {
  LogoutMutation,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
// MeDocument, MeQuery will be imported from "../generated/graphql" once we create the MeQuery
import { cacheExchange } from "@urql/exchange-graphcache";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  exchanges: [
      // this is how er update the cache while it's needed
    dedupExchange,
    //   cacheExchange({
    //     updates: {
    //       Mutation: {
    //            logout: (_result, arg, cache, info) => {
    //             betterUpdateQuery<LogoutMutation, MeQuery>(
    //                           cache,
    //                           { query: MeDocument },
    //                           _result,
    //                           ()=> ({me: null})
    //                         );
    //            },
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
    // cacheExchange,
    ssrExchange,
    fetchExchange,
  ],
});
