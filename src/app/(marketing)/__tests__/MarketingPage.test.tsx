import { Heading } from '@/app/(marketing)/_components/heading';
import { render } from '@testing-library/react';

describe('Heading', () => {
  it('With a valid session, showing button to route to dashboard', () => {
    const session = {
      user: {
        id: "1",
        name: 'test',
        email: '',
      },
      expires: '',
    }
    
    const header = render(<Heading session={session} />);
    // expect to seen a Button show text "Enter Memoize"
    expect(header.getByText("Enter Memoize")).toBeInTheDocument();
    // to expect to see a link component with href="/dashboard"
    expect(header.getByRole("link", {name: "Enter Memoize"})).toHaveAttribute("href", "/dashboard");

    
  });

  // without session, expect to see a button show text "Sign in"
  it('with no session, showing button asking for signing in', () => {
    const session = null;
    
    const header = render(<Heading session={session} />);
    // expect to seen a button show text "Enter Memoize"
    expect(header.getByText("Sign in")).toBeInTheDocument();
    // expect 
  });
}); 

