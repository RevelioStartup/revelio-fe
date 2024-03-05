// YourComponent.test.tsx
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../../src/redux/features/profileSlice';
import ChangeProfile from '@/app/profile/change-profile/page';
import { RootState, AppDispatch } from '../../src/redux/store'; // Adjust the import path as needed


describe('ChangeProfile Component Tests', () => {
  let store: ReturnType<typeof configureStore<{ profile: typeof profileReducer }>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        profile: profileReducer,
      },
    });

    render(
      <Provider store={store}>
        <ChangeProfile />
      </Provider>
    );
  });

  test('initial render and bio display', async () => {
    // Implement test logic...
    // Example:
    const bioInput = screen.getByTestId('bio-input');
    expect(bioInput).toHaveValue('');
  });

  test('initial render and bio display', () => {
    const bioInput = screen.getByTestId('bio-input');
    expect(bioInput).toHaveValue('Existing bio');
  });

  test('input change and submit button', async () => {
    const newBio = 'New bio text';
    const bioInput = screen.getByTestId('bio-input');
    fireEvent.change(bioInput, { target: { value: newBio } });

    const submitButton = screen.getByRole('button', { name: /Change Profile/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Check for state updates or dispatched actions as needed
      const updatedState = store.getState();
      expect(updatedState.profile.profile.bio).toEqual(newBio);
    });
  });

  test('file input change', async () => {
    const fileInput = screen.getByLabelText(/Avatar/i);
    const file = new File(['(⌐□_□)'], 'profile-pic.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      // Check for UI updates or state changes related to the file input
      expect(screen.getByAltText('')).toHaveAttribute('src');
    });
  });

  // Add more tests as needed
});
