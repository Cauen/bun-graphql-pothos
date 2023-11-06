import * as Inputs from '../inputs';
import { builder } from '../../builder';
import {
  definePrismaObject,
  defineFieldObject,
  defineRelationFunction,
  defineRelationObject,
} from '../utils';

export const UserObject = definePrismaObject('User', {
  description: undefined,
  findUnique: ({ id }) => ({ id }),
  fields: (t) => ({
    id: t.field(UserIdFieldObject),
    email: t.field(UserEmailFieldObject),
    name: t.field(UserNameFieldObject),
  }),
});

export const UserIdFieldObject = defineFieldObject('User', {
  type: "ID",
  description: undefined,
  nullable: false,
  resolve: (parent) => String(parent.id),
});

export const UserEmailFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: false,
  resolve: (parent) => parent.email,
});

export const UserNameFieldObject = defineFieldObject('User', {
  type: "String",
  description: undefined,
  nullable: true,
  resolve: (parent) => parent.name,
});
