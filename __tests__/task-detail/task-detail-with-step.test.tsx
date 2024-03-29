import { render, screen, fireEvent } from '@testing-library/react';
import TaskDetailPage from '@/app/event/[eventId]/(eventId)/[taskId]/page';
import { useGetEventQuery } from '@/redux/api/eventApi';
import { useGetTaskDetailQuery } from '@/redux/api/taskApi';
import '@testing-library/jest-dom'

jest.mock('@/redux/api/eventApi', () => ({
    useGetEventQuery: jest.fn(),
}))

jest.mock('@/redux/api/taskApi', () => ({
    useGetTaskDetailQuery: jest.fn(),
}))


describe('TaskDetailPage with step', () => {
    interface Step {
        id: string
        name: string
        output: string
        description: string
        status: string
        step_order: number
        task: string
    }

    const mockEventData = {
        id: '1',
        name: 'event name',
        budget: 'asd',
        date: '2023-20-05',
        objective: 'adfsf',
        attendees: 'number',
        theme: 'string',
        services: 'string',
    }

    const mockStepData: Step = {
        id: '1',
        name: 'step name',
        output: 'step output',
        description: 'step description',
        status: 'DONE',
        step_order: 1,
        task: '1'
    }

    const mockStepData2: Step = {
        id: '2',
        name: 'step name 2',
        output: 'step output 2',
        description: 'step description 2',
        status: 'NOT_STARTED',
        step_order: 2,
        task: '1'
    }

    const mockTaskData = {
        id: '1',
        task_steps: [mockStepData, mockStepData2],
        title: 'task title',
        description: 'task description',
        status: 'task status',
        event: '1'
    }

    const mockGetEventQuery = useGetEventQuery as jest.Mock

    mockGetEventQuery.mockReturnValue({
        data: mockEventData,
        isLoading: false,
    })

    const mockGetTaskDetailQuery = useGetTaskDetailQuery as jest.Mock

    mockGetTaskDetailQuery.mockReturnValue({
        data: mockTaskData,
        isLoading: false
    })

  test('renders task details when not loading and data is available', () => {

    render(<TaskDetailPage params={{ eventId: '1', taskId: '1' }} />);

    expect(screen.getByText('event name')).toBeInTheDocument();
    expect(screen.getByText('task status')).toBeInTheDocument();
    expect(screen.getByText('task description')).toBeInTheDocument();
    expect(screen.getByText('task title')).toBeInTheDocument();
    expect(screen.getByText('step name')).toBeInTheDocument();
    expect(screen.getByText('step name 2')).toBeInTheDocument();

    const buttonBack = screen.getByTestId('step name 2')
    fireEvent.click(buttonBack)
    const buttonContinue = screen.getByText('Continue')
    fireEvent.click(buttonContinue)
    expect(screen.getByText('step name 2')).toBeInTheDocument();

    const buttonFinish = screen.getByText('Finish')
    fireEvent.click(buttonFinish)
    expect(screen.getByText('All steps completed - you have finished this task')).toBeInTheDocument();
    const buttonReset = screen.getByText('Reset')
    fireEvent.click(buttonReset)
  });
});
