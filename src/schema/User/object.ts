// ./src/graphql/User/object.ts

import { prisma } from "@/db";
import { UserObject, UserEmailFieldObject } from "../__generated__/User";
import { builder } from "../builder"; // Pothos schema builder
import { GraphQLError } from "graphql";

// Or modify it as you wish
export const CustomUser = builder.prismaObject("User", {
  ...UserObject,
  fields: (t) => {
    const { email: emailAddress, ...fields } = UserObject.fields(t);

    return {
      ...fields,
      // Renamed field
      emailAddress: t.field({
        ...UserEmailFieldObject,
        resolve (root) {
          if (root.email.includes("1@")) throw new GraphQLError("Its a protected email")
          return root.email
        }
      }),
      // Edit and extend field
      customField: t.field({
        type: "Int",
        resolve: (root, args, context, info) => root.id,
      }),
      total: t.field({
        type: "Int",
        resolve: async (root, args, context, info) => {
          const count = await prisma.user.count();
          return count;
        },
        authScopes: {
          admin: true,
        },
      }),
    };
  },
});
