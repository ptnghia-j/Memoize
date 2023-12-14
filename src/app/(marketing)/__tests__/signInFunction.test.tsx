import * as nextAuthReact from 'next-auth/react';

jest.mock('next-auth/react');
const nextAuthReactMocked = nextAuthReact as jest.Mocked<typeof nextAuthReact>;

describe("Testing Sign In function working properly", () => {
  nextAuthReactMocked.signIn.mockImplementation(() =>
    Promise.resolve({ error: '', status: 403, ok: false, url: '' })
  );

  it("should return error message when signIn function is not working properly", async () => {
    const response = await nextAuthReactMocked.signIn("google");
    expect(response).toEqual({
      error: '',
      status: 403,
      ok: false,
      url: '',
    });
  });

});
