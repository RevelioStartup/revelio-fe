import React, { ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Navbar } from '@/components/elements/Navbar'
import { MENU_LOGGED_IN } from '@/components/elements/Navbar/constant'

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
}

jest.mock('@/redux/store', () => ({
  ...jest.requireActual('@/redux/store'),
  useAppSelector: () => mockUser,
}))

describe('Navbar Component after User Log In', () => {
  beforeEach(() => {
    global.window.scrollY = 0
    global.window.addEventListener = jest.fn((event, callback) => {
      if (event === 'scroll') {
        global.window.scrollY = 50
      }
    })
    global.window.removeEventListener = jest.fn()
  })

  it('finds <a> tags with specific texts for each menu item for logged in user', () => {
    render(<Navbar />)

    MENU_LOGGED_IN.forEach(({ label }) => {
      const linkElement = screen.getByText(label)

      expect(linkElement).toBeInTheDocument()

      expect(linkElement.tagName).toBe('A')
    })
  })
})
