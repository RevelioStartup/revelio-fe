import Home from '@/app/page'
import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom'

jest.useFakeTimers();

describe('Home Page', () => {
  it('renders the hero section', () => {
    render(<Home />)
    const heroElement = screen.getByTestId('hero-landing')
    expect(heroElement).toBeInTheDocument()
  })

  it('renders the "Why Revelio" section', () => {
    render(<Home />)
    const whyRevelioElement = screen.getByTestId('why-revelio')
    expect(whyRevelioElement).toBeInTheDocument()
  })

  it('renders the "Without Revelio" section', () => {
    render(<Home />)
    const withoutRevelioElement = screen.getByTestId('without-revelio')
    expect(withoutRevelioElement).toBeInTheDocument()
  })

  it('changes message every 2 seconds', async () => {
    const { getByText, findByText } = render(<Home />);

    expect(getByText('👎Stressful')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const messageTwo = await findByText('👎Time consuming');
    expect(messageTwo).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const messageThree = await findByText('👎Inefficient');
    expect(messageThree).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const messageFour = await findByText('👎Lacking of centralization');
    expect(messageFour).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    const messageOneNew = await findByText('👎Stressful');
    expect(messageOneNew).toBeInTheDocument();
  });
})
