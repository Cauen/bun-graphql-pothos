const fs = require('fs')
const path = require('path')

/** @type {import('prisma-generator-pothos-codegen').Config} */
module.exports = {
  crud: {
    outputDir: './src/schema/__generated__/',
    excludeResolversContain: [],
    prismaCaller: 'prisma',
    disabled: false,
    resolverImports: "\nimport { prisma } from '@/db';"
  },
  inputs: {
    prismaImporter: `import { Prisma } from '.prisma/client';`,
    outputFilePath: './src/schema/__generated__/inputs.ts',
  },
  global: {
    builderLocation: "./src/schema/builder",
  },
}
