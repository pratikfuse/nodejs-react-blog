import React from 'react';
import { render, screen } from '@testing-library/react';
test('renders learn react link', () => {
  render(<div></div>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
