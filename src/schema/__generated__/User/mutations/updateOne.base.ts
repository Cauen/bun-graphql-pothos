import * as Inputs from '../../inputs';
import { prisma } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneUserMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UserWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.UserUpdateInput, required: true }),
    }))

export const updateOneUserMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'User',
    nullable: true,
    args: updateOneUserMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await prisma.user.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUserMutation = defineMutation((t) => ({
  updateOneUser: t.prismaField(updateOneUserMutationObject(t)),
}));
