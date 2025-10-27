import React from 'react'
import {Snackbar, Alert} from '@mui/material'

export default function Succes({open, handleClose, text, type}) {
  return (
    <Snackbar
        open = {open}
        autoHideDuration={4000}
        onClose={handleClose}
    >
        <Alert onClose={handleClose} severity={type ? type : "success"} sx={{ width: "100%"}}>{text}</Alert>
    </Snackbar>
  )
}
