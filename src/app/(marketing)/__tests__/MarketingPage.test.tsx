import { render, screen } from '@testing-library/react';
import MarketingPage from '../page';
import '@testing-library/jest-dom'; 
import { Heading } from "../_components/heading";
import { Heroes } from "../_components/heroes";
import { Footer } from '../_components/footer';
import { Logo } from '../_components/logo';
import { Navbar } from '../../../components/navbar';

// test the Footer contain a <Logo /> component and two <Button /> components
// logo has two images one for light mode and one for dark mode
test('Footer contains a Logo component and two Button components', () => {
  render(<Footer />);
  expect(screen.getAllByRole('img')).toHaveLength(2);
  expect(screen.getAllByRole('button')).toHaveLength(2);
});

// test the Heading to contain a <Button /> component with the text "Enter Memoize"
test('Heading contains a Button component with the text "Enter Memoize"', () => {
  render(<Heading session={null} />);
  expect(screen.getByRole('button')).toHaveTextContent('Enter Memoize');
});

// test the Heroes to contain two <Image /> components for each mode
test('Heroes contains two Image components for each mode', () => {
  render(<Heroes />);
  expect(screen.getAllByRole('img')).toHaveLength(4);
});

// test the navbar to contain a <Logo /> component and a <ModeToggle /> component
// logo has two images one for light mode and one for dark mode
test('Navbar contains a Logo component and a ModeToggle component', () => {
  render(<Navbar session={null} />);
  expect(screen.getAllByRole('img')).toHaveLength(2);
  expect(screen.getByRole('button')).toBeInTheDocument();
});


