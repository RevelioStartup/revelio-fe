import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogProps,
  DialogActions,
  DialogActionsProps,
} from '@mui/material'

export interface FormDialogProps extends DialogProps {
  children: ReactNode
  title: string
}

export interface FormDialogActionsProps extends DialogActionsProps {
  children: ReactNode
}

export const FormDialog = ({ children, title, ...props }: FormDialogProps) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="md"
      style={{ padding: '20px', borderRadius: '20px 20px 0 0', ...props.style }}
      data-testid="dialog"
      {...props}
    >
      <DialogTitle
        style={{ textAlign: 'center', fontSize: '24px', marginTop: '20px' }}
      >
        {title}
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export const FormDialogActions = ({
  children,
  ...props
}: FormDialogActionsProps) => {
  return (
    <DialogActions
      style={{ padding: '20px', margin: '20px' }}
      {...props}
      data-testid="dialog-actions"
    >
      {children}
    </DialogActions>
  )
}
