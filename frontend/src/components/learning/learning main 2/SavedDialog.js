import React from 'react'
import { Dialog } from '@mui/material'

export default function SavedDialog({open, handleClose}) {
  return (
     <Dialog
       open = {open}
       onClose={handleClose}
     >
        Soemthing about it
     </Dialog>
  )
}
