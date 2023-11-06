import SchemaBuilder from '@pothos/core';

const builder = new SchemaBuilder({});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


builder.queryType({
  fields: (t) => ({
    createUser: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: async (parent, { name }) => {
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
  }),
});

export const schema = builder.toSchema();