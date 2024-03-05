import Profile from '@/app/profile/page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';

// Mock the useSelector and useDispatch hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

test('Profile component renders correctly', async () => {
  // Mock useSelector to return some sample profile data
  const mockProfile = {
    profile: {
      user: {
        username: 'testuser',
        email: 'test@example.com',
      },
      profile: {
        bio: 'Sample bio',
      },
    },
    status: 'succeeded',
    error: null,
  };

  // Typecast useSelector to any before calling mockReturnValue
  (useSelector as unknown as jest.Mock).mockReturnValue(mockProfile);

  // Render the Profile component
  render(<Profile />);

  // Assert loading message is not present
  expect(screen.queryByText('Loading your profile...')).not.toBeInTheDocument();

  // Assert profile information is rendered correctly
  expect(screen.getByText('Your Profile')).toBeInTheDocument();
  expect(screen.getByText('testuser')).toBeInTheDocument();
  expect(screen.getByText('test@example.com')).toBeInTheDocument();
  expect(screen.getByText('Sample bio')).toBeInTheDocument();

  // Assert premium text is rendered correctly
  expect(screen.getByText('PREMIUM')).toBeInTheDocument();

  // Assert buttons are rendered correctly
  expect(screen.getByRole('button', { name: /change profile/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /change password/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  
  // Simulate button click
  userEvent.click(screen.getByRole('button', { name: /change profile/i }));
  // Add assertions for the behavior that should follow button click
});
