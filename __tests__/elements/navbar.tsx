import React, { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navbar } from '@/components/elements/Navbar'
import { MENU } from '@/components/elements/Navbar/constant'

jest.mock('next/link', () => {
  const MockedLink = ({ children, href }: any) => <a href={href}>{children}</a>

  MockedLink.displayName = 'MockedNextLink'

  return MockedLink
})

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

const mockUser = {
  id: 1,
  name: 'John Doe',
  token: null,
}

jest.mock('@/redux/store', () => ({
  ...jest.requireActual('@/redux/store'),
  useAppSelector: () => mockUser,
}))

describe('Navbar Component', () => {
  beforeEach(() => {
    global.window.scrollY = 0
    global.window.addEventListener = jest.fn((event, callback) => {
      if (event === 'scroll') {
        global.window.scrollY = 50
      }
    })
    global.window.removeEventListener = jest.fn()
  })
  it('renders the navbar with logo', async () => {
    render(<Navbar />)

    const logo = screen.getByAltText('logo')
    expect(logo).toBeInTheDocument()
  })

  it('finds <a> tags with specific texts for each menu item', () => {
    render(<Navbar />)

    MENU.forEach(({ label }) => {
      // Find the link element by its text
      const linkElement = screen.getByText(label)

      // Check that the link element is in the document
      expect(linkElement).toBeInTheDocument()

      // Check that the element is an <a> tag
      expect(linkElement.tagName).toBe('SPAN')
    })
  })

  it('does not have backdrop-blur-md class initially', () => {
    render(<Navbar />)

    global.window.scrollY = 50

    const navbar = screen.getByTestId('navbar')
    window.dispatchEvent(new Event('scroll'))
    expect(navbar).not.toHaveClass('backdrop-blur-md')
  })

  it('applies backdrop blur class on scroll', () => {
    render(<Navbar />)

    global.window.scrollY = 50

    window.dispatchEvent(new Event('scroll'))

    const navbar = screen.getByTestId('navbar')

    expect(navbar).not.toHaveClass('backdrop-blur-md')
  })
})
