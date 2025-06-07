import { defineConfig } from 'orval';

export default defineConfig({
  authApi: {
    input: './openapi.yml',
    output: {
      mode: 'tags-split',
      target: './src/api/generated/auth.ts',
      schemas: './src/api/generated/model',
      client: 'react-query',
      mock: true,
    },
    hooks: {
      afterAllFilesWrite: 'npx @biomejs/biome check --write ./src --unsafe',
    },
  },
});
