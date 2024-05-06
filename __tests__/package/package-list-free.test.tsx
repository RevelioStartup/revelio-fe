import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import PackageList from '@/app/package/page';

jest.mock('@/redux/api/packageApi', () => ({
  useGetPackageDetailQuery: jest.fn((id) => ({
    data: {
      "name": "Default Package",
      "price": 5000,
      "event_planner": true,
      "event_tracker": true,
      "event_timeline": true,
      "event_rundown": true,
      "ai_assistant": false
    }
  })),
}));

jest.mock('@/redux/api/subscriptionApi', () => ({
    useGetLatestSubscriptionQuery: jest.fn((id) => ({
    data: {
      "id": 1,
      "plan": "PREMIUM",
      "start_date": "2024-05-05T13:30:00.000Z",
      "end_date": "2025-05-05T13:30:00.000Z",
      "user": 1,
      "is_active": false
    }
  })),
}));

describe('PackageList component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<PackageList />);
    const packageDetail = getByTestId('package-detail');
    expect(packageDetail).toBeInTheDocument();
  });
});
