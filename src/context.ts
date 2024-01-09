import { Prisma, PrismaClient, User } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'
import { prisma } from './db'

type SelectType = {
  select?: Record<string, string>
}

export interface Context {
  user?: User
  request: IncomingMessage
  response: ServerResponse
}

export async function createContext({
  req,
  res,
}: {
  req: IncomingMessage
  res: ServerResponse
}): Promise<Context> {
  return {
    request: req,
    response: res,
    user: await prisma.user.findFirst() || undefined
  }
}
