import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'

interface DeleteAllRundownProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const DeleteAllRundownDialog: React.FC<DeleteAllRundownProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete All Rundown'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete all rundown? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} autoFocus>
          Delete All
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteAllRundownDialog
