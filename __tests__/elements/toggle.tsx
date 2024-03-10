import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Toggle from '@/components/elements/Toggle'
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

describe('Toggle Component', () => {
  it('renders all options', () => {
    const setSelectedOption = jest.fn()
    render(
      <Toggle
        options={options}
        selectedOption={0}
        setSelectedOption={setSelectedOption}
      />
    )
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('highlights the selected option', () => {
    const setSelectedOption = jest.fn()
    render(
      <Toggle
        options={options}
        selectedOption={1}
        setSelectedOption={setSelectedOption}
      />
    )

    const selectedOptionElement = screen.getByText(options[1].label)
    expect(selectedOptionElement).toHaveStyle('color: text-gray-100')
  })

  it('updates the selected option on click', () => {
    let selectedOption = 0
    const setSelectedOption = jest.fn((index) => (selectedOption = index))
    render(
      <Toggle
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    )

    const newSelectedOptionElement = screen.getByText(options[2].label)
    fireEvent.click(newSelectedOptionElement)

    expect(setSelectedOption).toHaveBeenCalledWith(2)
    expect(selectedOption).toBe(2)
  })
})
