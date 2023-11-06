import { createSchema, createYoga, useReadinessCheck } from 'graphql-yoga'
import { schema } from './schema'
import { useSofa } from '@graphql-yoga/plugin-sofa'

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
  plugins: [
    // useSofa({
    //   basePath: '/rest',

    //   swaggerUI: {
    //     endpoint: '/rest/swagger'
        
    //   },
    // }),
    // useReadinessCheck({
    //   endpoint: '/health', // default
    //   check: async (arg) => {
    //     // if resolves, respond with 200 OK
    //     // if throw, respond with 503 Service Unavailable and error message as plaintext in body
    //     return false
    //     return new Response(JSON.stringify({ access: true }))
    //   }
    // })
  ]
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