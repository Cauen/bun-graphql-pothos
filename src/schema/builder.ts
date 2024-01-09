import SchemaBuilder from "@pothos/core";
import { Scalars } from 'prisma-generator-pothos-codegen';
import { Prisma } from '.prisma/client';
import PrismaTypes from './__generated__/objects.d'
import PrismaPlugin from '@pothos/plugin-prisma'
import { prisma } from '../db'
import ValidationPlugin from '@pothos/plugin-validation';
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import { Context } from "@/context";

export const builder = new SchemaBuilder<{
  Context: Context,
  PrismaTypes: PrismaTypes; // required for @pothos/plugin-prisma integration (which is required)
  Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>; // required to define correct types for created scalars.
  AuthScopes: {
    public: boolean;
    employee: boolean;
    admin: boolean;
  };
}>({
  plugins: [PrismaPlugin, ValidationPlugin, ScopeAuthPlugin],
  authScopes: async (context) => ({
    public: true,
    employee: !!context.user,
    admin: !!context.user?.email.includes("@admin.com"),
  }),
  prisma: {
    client: prisma,
  },
});