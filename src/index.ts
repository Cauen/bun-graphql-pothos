import { createYoga } from 'graphql-yoga'
import { schema } from './schema'

export const yoga = createYoga({
  schema,
  cors: false,
  plugins: []
})

import { Elysia } from 'elysia'

const graphqlPath = "/graphql"

new Elysia()
  .get('/', (() => `Olá`))
  .get('/id/:id', (({ params: { id } }) => id))
  .get(graphqlPath, async ({ request }) => yoga.fetch(request))
  .post(graphqlPath, async ({ request }) => yoga.fetch(request), {
    type: 'none'
  })
  .listen(3000)