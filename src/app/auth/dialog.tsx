'use client'
import { FC } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'

interface Message {
  message: string
  openPopup: boolean
  onClose: () => void
  title: string
}

export const MessageDialog: FC<Message> = ({
  message,
  openPopup,
  onClose,
  title,
}) => {
  return (
    <Dialog
      open={openPopup}
      onClose={onClose}
      data-testid="login-dialog-error-msg"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <button onClick={onClose}>Close</button>
      </DialogActions>
    </Dialog>
  )
}
