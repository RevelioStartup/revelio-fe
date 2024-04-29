import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import RundownTable from '@/app/rundown/RundownTable';
import '@testing-library/jest-dom'

jest.mock('@/redux/api/rundownApi', () => ({
    useGetEventRundownQuery: jest.fn().mockReturnValue({
      data: [],
    }),
}))

describe('RundownTable', () => {
  test('renders RundownTable component', () => {
    render(
      <Provider store={store}>
        <RundownTable eventId="testEventId" />
      </Provider>
    );

    expect(screen.getByTestId('no-rundown-text')).toBeInTheDocument();
  });
});
