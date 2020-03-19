import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/COVID-19 in the United States/i);
  expect(titleElement).toBeInTheDocument();
});
