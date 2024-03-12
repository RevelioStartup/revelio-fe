import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ChangeProfile from '@/app/profile/change-profile/page';
import { useUpdateProfileMutation, useGetProfileQuery } from '@/redux/api/profileApi';
import { useDispatch } from 'react-redux';
import { store } from '@/redux/store';
import { setProfile } from '@/redux/features/profileSlice';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';

jest.mock('@/redux/api/profileApi', () => ({
  useUpdateProfileMutation: jest.fn(),
  useGetProfileQuery: () => ({
    data: { profile: { 
      bio: "hi"
     } }
  })
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Test for ChangeProfile component', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn();
    (useDispatch as any).mockReturnValue(mockDispatch);

    const mockUpdateProfile = jest.fn().mockResolvedValue({ data: { bio: 'New bio' } });
    (useUpdateProfileMutation as jest.Mock).mockReturnValue([mockUpdateProfile]);

    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renders profile update form', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    );
    expect(getByPlaceholderText('Enter bio')).toBeInTheDocument();
    expect(getByText('Update Profile')).toBeInTheDocument();
  });

  it('updates profile successfully', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    );

    // Fill form input
    fireEvent.change(getByPlaceholderText('Enter bio'), { target: { value: 'New bio text' } });

    // Submit form
    fireEvent.click(getByText('Update Profile'));

    // Wait for the update to complete
    await waitFor(() => {
      expect(useUpdateProfileMutation).toHaveBeenCalledTimes(1);
      expect(useUpdateProfileMutation).toHaveBeenCalledWith(expect.any(Function));
    });

    // Assert dispatch function is called with the updated profile
    expect(useDispatch).toHaveBeenCalledWith(setProfile({
      user: expect.any(Object),
      profile: {
        bio: 'New bio',
        profile_picture: null
      },
    }));

    // Assert navigation push function is called
    expect(mockPush).toHaveBeenCalledWith('/profile');
  });
});
