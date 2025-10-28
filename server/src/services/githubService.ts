export async function mockCreatePR(_diff: unknown): Promise<{ url: string; number: number }> {
  return { url: 'https://github.com/example/repo/pull/123', number: 123 };
}

