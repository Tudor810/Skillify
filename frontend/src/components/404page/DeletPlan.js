import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'

export default function DeletPlan({open, handleClose, handleDelete, error}) {


  return (
    <Dialog
        open = {open}
        onClose={handleClose}
    >
    <DialogTitle sx={{
        fontSize: '1.2rem',
        fontWeight: '700'
    }}>Are you sure?</DialogTitle>
    <DialogContent>
        <p>Once you delete it, you can`t recover the data</p>
        {error && <span className='error'>{error}</span>}
    </DialogContent>
    <DialogActions>
        <Button onClick = {() => {
            handleDelete()
            handleClose()
        }} className='delete-button'>Delete</Button>
        <Button onClick = {handleClose} >Cancel</Button>
    </DialogActions>
    </Dialog>
  )
}
