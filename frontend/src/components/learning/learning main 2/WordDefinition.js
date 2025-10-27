import { Dialog } from '@mui/material'
import React from 'react'

export default function WordDefinition({open, handleClose, word, defintion, width}) {

    

  return (
    <Dialog
        open = {open}
        onClose={handleClose}
        PaperProps={{
            sx: {
                width: width > 576 ? '70%' : '95%'
            }
        }}
    >
        <div className="word-definition">
            <h1><span style={{color: 'var(--primary-color)'}}>Word Definition</span></h1>
            <p><span>{word} = </span>{defintion}</p>
        </div>
       
    </Dialog>
  )
}
