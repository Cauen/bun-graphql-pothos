import { prisma } from "../db";
import { builder } from "./builder";
import { generateAllCrud, generateAllMutations, generateAllObjects, generateAllQueries } from './__generated__/autocrud'
import { GraphQLError } from "graphql";
import z from "zod";

import './User'
import { CustomUser } from "./User/object";

builder.queryField("findFirstUserFake", (t) => t.prismaField({
  type: 'User',
  authScopes: {
    employee: true,
  },
  resolve: async (query, root, args, ctx, info) =>
    prisma.user.findFirstOrThrow({
      // the `query` argument will add in `include`s or `select`s to
      // resolve as much of the request in a single query as possible
      ...query,
      where: {
        name: "John Dough",
      },
    }),
}))

builder.mutationFields(t => ({
  createUserFake: t.prismaField({
    type: CustomUser,
    args: {
      name: t.arg.string({
        validate: {
          email: true,
        }
      }),
      namex: t.arg.string({
        validate: {
          length: [10, { message: "Digite 10 caracteres" }],
        }
      }),
    },
    authScopes: {
      public: true,
    },
    resolve: async (include, parent, { name }, context, info) => {
      // const user = context.user
      if (name === "error") throw new GraphQLError("Invalid name")

      // create a new user
      const created = await prisma.user.create({
        data: {
          name: "John Dough",
          email: `john-${Math.random()}@example.com`,
        },
      });

      // return `There are ${count} users in the database.`
      return {
        ...created,
      }
    },
  }),
}));

// Defining schema roots
builder.queryType({});
builder.mutationType({});
generateAllObjects({ exclude: ['User'] })
generateAllQueries()
generateAllMutations()

export const schema = builder.toSchema();