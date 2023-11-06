import SchemaBuilder from "@pothos/core";
import { Scalars } from 'prisma-generator-pothos-codegen';
import { Prisma } from '.prisma/client';
import PrismaTypes from './__generated__/objects.d'
import PrismaPlugin from '@pothos/plugin-prisma'
import { prisma } from '../db'

export const builder = new SchemaBuilder<{
  // ... Context, plugins? ...
  PrismaTypes: PrismaTypes; // required for @pothos/plugin-prisma integration (which is required)
  Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>; // required to define correct types for created scalars.
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
});