// Mock implementation of ai-functions for testing
export function AI<TInput, TOutput>(
  _prompt: string,
  _options?: { name?: string }
): (input: TInput) => Promise<TOutput> {
  return async (_input: TInput): Promise<TOutput> => {
    throw new Error('AI function called in test - use mocked implementation')
  }
}
