// Mock for ai-functions package used in testing
export function AI<TInput, TOutput>(
  _prompt: string,
  _options?: { name?: string }
): (input: TInput) => Promise<TOutput> {
  return async (_input: TInput) => {
    throw new Error('AI function called in test - should be mocked if needed')
  }
}
