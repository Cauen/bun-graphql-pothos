import { prisma } from "../db";
import { builder } from "./builder";
import { generateAllCrud } from './__generated__/autocrud'
import { GraphQLError } from "graphql";

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
  createUserFake: t.string({
    args: {
      name: t.arg.string(),
    },
    authScopes: {
      employee: true,
    },
    resolve: async (parent, { name }, context, info) => {
      const user = context.user
      if (name === "error") throw new GraphQLError("Invalid name")

      // create a new user
      await prisma.user.create({
        data: {
          name: "John Dough",
          email: `john-${Math.random()}@example.com`,
        },
      });

      // count the number of users
      const count = await prisma.user.count();
      return `There are ${count} users in the database.`
    },
  }),
}));

// Defining schema roots
builder.queryType({});
builder.mutationType({});
generateAllCrud()

export const schema = builder.toSchema();