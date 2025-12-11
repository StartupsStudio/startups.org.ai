import { resolve } from 'path'

export default {
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      'ai-functions': resolve(__dirname, './test/mocks/ai-functions.ts'),
    },
  },
}
