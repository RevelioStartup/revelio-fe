import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/login/page';
import { useLoginMutation, useSendRecoverPasswordEmailMutation } from '@/redux/api/authApi';
import '@testing-library/jest-dom'

jest.mock('@/redux/api/authApi', () => ({
  useLoginMutation: jest.fn(),
  useSendRecoverPasswordEmailMutation: jest.fn(),
}));

describe('Test for login page', () => {

  beforeEach(()=>{
    const mockLogin = jest.fn().mockResolvedValue({ data: {} });
    (useLoginMutation as jest.Mock).mockReturnValue([mockLogin]);

    const mockSendEmail = jest.fn().mockResolvedValue({ data: {} });
    (useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([mockSendEmail]);
  })

  it('renders login form', () => {

    const { getByTestId } = render(<LoginPage />);
    expect(getByTestId('login-form')).toBeInTheDocument();
  });

  it('submits login form successfully', async () => {
    const mockLogin = jest.fn().mockResolvedValue({ data: {} });
    (useLoginMutation as jest.Mock).mockReturnValue([mockLogin]);
    const { getByTestId } = render(<LoginPage />);
    fireEvent.change(getByTestId('username-input'), { target: { value: 'username' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: 'password' } });
    fireEvent.submit(getByTestId('login-form'));
    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
  });

  it('shows error message when login fails due to invalid username and/or password', async () => {
    const errorMessage = 'Wrong username/password!';
    const mockLogin = jest.fn().mockResolvedValue({ error: { data: { msg: errorMessage } } });
    (useLoginMutation as jest.Mock).mockReturnValue([mockLogin]);
    const { getByTestId, getByText } = render(<LoginPage />);
    fireEvent.change(getByTestId('username-input'), { target: { value: 'invalid_username' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: 'invalid_password' } });
    fireEvent.submit(getByTestId('login-form'));
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument());
    fireEvent.click(getByTestId('button-error'));
  });

  it('opens recovery dialog when "Recover Account" is clicked', () => {
    const { getByText, getByTestId } = render(<LoginPage />);
    fireEvent.click(getByText('Recover Account'));
    expect(getByTestId('login-dialog-recover')).toBeInTheDocument();
    fireEvent.click(getByTestId('close-acc-rec-form'));
  });

  it('submits recovery form successfully', async () => {
    const mockSendEmail = jest.fn().mockResolvedValue({ data: {} });
    (useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([mockSendEmail]);
    const { getByTestId } = render(<LoginPage />);
    fireEvent.click(getByTestId('recover-account-link'));
    fireEvent.change(getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.submit(getByTestId('recover-account-form'));
    await waitFor(() => expect(mockSendEmail).toHaveBeenCalledTimes(1));
  });

  it('shows error message when recovery email fails', async () => {
    const errorMessage = 'User with that email doesnt exist!';
    const mockSendEmail = jest.fn().mockResolvedValue({ error: { data: { msg: errorMessage } } });
    (useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([mockSendEmail]);
    const { getByTestId, getByText } = render(<LoginPage />);
    fireEvent.click(getByTestId('recover-account-link'));
    fireEvent.change(getByTestId('email-input'), { target: { value: 'invalid@email.com' } });
    fireEvent.submit(getByTestId('recover-account-form'));
    await waitFor(() => expect(getByText(errorMessage)).toBeInTheDocument());
  });

  it('dont submits recovery form when email format is wrong', async () => {
    const mockSendEmail = jest.fn().mockResolvedValue({ data: {} });
    (useSendRecoverPasswordEmailMutation as jest.Mock).mockReturnValue([mockSendEmail]);
    const { getByTestId } = render(<LoginPage />);
    fireEvent.click(getByTestId('recover-account-link'));
    fireEvent.change(getByTestId('email-input'), { target: { value: 'test_wrong_email_format' } });
    fireEvent.submit(getByTestId('recover-account-form'));
    await waitFor(() => expect(mockSendEmail).toHaveBeenCalledTimes(0));
  });

});
