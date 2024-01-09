import { createYoga } from 'graphql-yoga'
import { schema } from './schema'
import { cors } from '@elysiajs/cors'

export const yoga = createYoga({
  schema,
  cors: true,
  plugins: [],
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
  .use(cors())
  .listen(3000, () => {
    console.log(`🚀 Server ready on http://localhost:3000${graphqlPath}`)
  })