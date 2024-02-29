import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from './components/WealthDashboard/Dashboard';

// Mock the UserContext for testing
jest.mock('./context/UserContext', () => ({
  useUser: () => ({ userData: { id: 1, currentBalance: 1000 } }),
}));

test('Dashboard component renders without crashing', () => {
  render(<Dashboard />);
  // You can add more assertions if needed
});

// You can add more test cases for specific functionality within the Dashboard component.
