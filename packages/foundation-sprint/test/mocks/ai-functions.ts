// Mock for ai-functions package
// This is only used for testing the non-AI helper functions and constants

export function AI<TInput, TOutput>(
  prompt: string,
  options?: { name?: string }
): (input: TInput) => Promise<TOutput> {
  // Return a mock function that throws an error if called
  // We're only testing the helper functions, not the AI functions
  return async (input: TInput): Promise<TOutput> => {
    throw new Error('AI functions are mocked in tests. Only test helper functions and constants.')
  }
}
