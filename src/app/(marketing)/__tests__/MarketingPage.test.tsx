import { render, screen } from '@testing-library/react';
import MarketingPage from '../page';
import '@testing-library/jest-dom'; 
import { Heading } from "../_components/heading";
import { Heroes } from "../_components/heroes";

// check that both  <Heading /> component is imported and rendered
test('renders heading component', () => {
  render(<Heading />);
  const headingElement = screen.getByText("Your Information, Your Definition. All in one place. Learn and Play with");
  expect(headingElement).toBeInTheDocument();
});

// check that both  <Heroes /> component is imported and rendered
test('renders heroes component', () => {
  render(<Heroes />);
  const heroesElement = screen.getByAltText("Documents");
  expect(heroesElement).toBeInTheDocument();
  const heroesElement2 = screen.getByAltText("Reading");
  expect(heroesElement2).toBeInTheDocument();
});



