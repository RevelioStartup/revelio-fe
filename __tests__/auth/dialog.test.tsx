import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MessageDialog } from '@/app/auth/dialog';
import '@testing-library/jest-dom'

describe('MessageDialog Component for Membuat Akun (Authentication)', () => {
  const message = 'test message';
  const title = 'Test';
  const openPopup = true;
  const onCloseMock = jest.fn();


  it('Displays the message and title when openPopup is true', () => {

    const { getByText } = render(
      <MessageDialog message={message} title={title} openPopup={openPopup} onClose={onCloseMock} />
    );

    expect(getByText(message)).toBeInTheDocument();
    expect(getByText(title)).toBeInTheDocument();
  });

  it('Calls onClose function when "Close" button is clicked', () => {

    const { getByText } = render(
      <MessageDialog message={message} title={title} openPopup={openPopup} onClose={onCloseMock} />
    );

    fireEvent.click(getByText('Close'));

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('Does not display message and title when openPopup is false', () => {

    const openPopupFalse = false;

    const { queryByText } = render(
      <MessageDialog message={message} title={title} openPopup={openPopupFalse} onClose={onCloseMock} />
    );

    expect(queryByText(message)).not.toBeInTheDocument();
    expect(queryByText(title)).not.toBeInTheDocument();
  });
});