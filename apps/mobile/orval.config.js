module.exports = {
  'crypto-alert': {
    input: {
      target: `${process.env.API_URL}/doc`,
    },
    output: {
      mode: 'tags-split',
      target: './src/schema/schema.ts',
      schemas: './src/schema/model',
      client: 'react-query',
      httpClient: 'fetch',
      baseUrl: process.env.API_URL,
      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useMutation: true,
          useInfiniteQueryParam: "page",
        }
      }
    },
  },
  'crypto-alert-zod': {
    input: {
      target: `${process.env.API_URL}/doc`,
    },
    output: {
      mode: 'tags-split',
      client: 'zod',
      target: './src/schema',
      fileExtension: '.zod.ts',
      baseUrl: process.env.API_URL,
    },
  }
};