import { Prisma } from "@prisma/client";
import { builder } from "../builder";
import { UserUpdateInputFields } from '../__generated__/inputs';

// Note: you can't use `builder.inputType` to generate this new input
export const UserUpdateInputCustom = builder
  .inputRef<Prisma.UserUpdateInput & { customArg: string }>('UserUpdateInputCustom')
  .implement({
    fields: (t) => ({
      ...UserUpdateInputFields(t),
      customArg: t.field({ required: true, type: 'String' }),
    }),
  });