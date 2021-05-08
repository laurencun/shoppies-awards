import { render, screen } from '@testing-library/react';
import App from './App';

test('renders shoppies title', () => {
  render(<h1>Official Shoppies Nominations</h1>);
  const heading = screen.getByText(/Shoppies/i);
  expect(heading).toBeInTheDocument();
});
