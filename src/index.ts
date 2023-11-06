import { createSchema, createYoga } from 'graphql-yoga'
import { schema } from './schema'

const oldSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      greetings: String
    }
  `,
  resolvers: {
    Query: {
      greetings: () => 'Hello from Yoga in a Bun app!'
    }
  }
})

const yoga = createYoga({
  schema,
})

const server = Bun.serve({
  fetch: yoga,
})

console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
)