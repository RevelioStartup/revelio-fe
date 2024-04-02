import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogProps,
  DialogContent,
  DialogContentProps,
  DialogActions,
  DialogActionsProps,
  DialogTitle,
} from '@mui/material'

export interface MessageDialogProps extends DialogProps {
  children: ReactNode
  title: string
}

export interface MessageDialogActionsProps extends DialogActionsProps {
  children: ReactNode
}

export interface MessageDialogContentProps extends DialogContentProps {
  children: ReactNode
}

export const MessageDialog = ({
  children,
  title,
  ...props
}: MessageDialogProps) => {
  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      style={{
        padding: '100px',
        borderRadius: '20px 20px 0 0',
        ...props.style,
      }}
      {...props}
    >
      <DialogTitle
        style={{ textAlign: 'center', fontSize: '24px', marginTop: '10px' }}
      >
        {title}
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export const MessageDialogContent = ({
  children,
  ...props
}: MessageDialogContentProps) => {
  return (
    <DialogContent
      style={{ padding: '20px', margin: '10px', fontSize: '20px' }}
      {...props}
    >
      {children}
    </DialogContent>
  )
}

export const MessageDialogActions = ({
  children,
  ...props
}: MessageDialogActionsProps) => {
  return (
    <DialogActions
      style={{ justifyContent: 'center', margin: '10px' }}
      {...props}
    >
      {children}
    </DialogActions>
  )
}
