import React from 'react'
import { render, screen } from '@testing-library/react'
import { FormDialog, FormDialogActions } from '@/components/elements/Dialog'
import {
  MessageDialog,
  MessageDialogActions,
  MessageDialogContent,
} from '@/components/elements/Dialog/messageDialog'
import '@testing-library/jest-dom'

describe('FormDialog', () => {
  test('renders title and children', () => {
    render(
      <FormDialog open={true} onClose={() => {}} title="Test Dialog">
        <div>Dialog content</div>
      </FormDialog>
    )

    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })
})

describe('FormDialogActions', () => {
  test('renders children', () => {
    render(
      <FormDialogActions>
        <button>Button 1</button>
        <button>Button 2</button>
      </FormDialogActions>
    )

    expect(screen.getByText('Button 1')).toBeInTheDocument()
    expect(screen.getByText('Button 2')).toBeInTheDocument()
  })
})

describe('MessageDialog', () => {
  test('renders title and children', () => {
    render(
      <MessageDialog open={true} onClose={() => {}} title="Test Dialog">
        <div>Dialog content</div>
      </MessageDialog>
    )

    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })
})

describe('MessageDialogContent', () => {
  test('renders children', () => {
    render(
      <MessageDialogContent>
        <div>Dialog content</div>
      </MessageDialogContent>
    )

    expect(screen.getByText('Dialog content')).toBeInTheDocument()
  })
})

describe('MessageDialogActions', () => {
  test('renders children', () => {
    render(
      <MessageDialogActions>
        <button>Button 1</button>
        <button>Button 2</button>
      </MessageDialogActions>
    )

    expect(screen.getByText('Button 1')).toBeInTheDocument()
    expect(screen.getByText('Button 2')).toBeInTheDocument()
  })
})
