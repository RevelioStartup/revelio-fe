import ProfilePage from '@/app/page'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Profile Page', () => {
  it('renders the profile section', () => {
    render(<ProfilePage />);
    const profileSection = screen.getByTestId('profile-section');
    expect(profileSection).toBeInTheDocument();
  });

  it('renders the user name', () => {
    render(<ProfilePage />);
    const userNameElement = screen.getByTestId('user-name');
    expect(userNameElement).toBeInTheDocument();
  });

  it('renders the bio section', () => {
    render(<ProfilePage />);
    const bioElement = screen.getByTestId('bio');
    expect(bioElement).toBeInTheDocument();
  });

  it('renders the profile picture', () => {
    render(<ProfilePage />);
    const profilePictureElement = screen.getByTestId('profile-picture');
    expect(profilePictureElement).toBeInTheDocument();
  });

});
