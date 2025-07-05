import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage title', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /pollie/i });
  expect(heading).toBeInTheDocument();
});
