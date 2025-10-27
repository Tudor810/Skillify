import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

export default function ReadMore({open, handleClose}) {
  return (
    <Dialog
        open = {open}
        onClose={handleClose}
        className='skillify-description'
    >
        <DialogTitle>More About Skillify</DialogTitle>
        <DialogContent>
        Imagine effortlessly acquiring new skills and knowledge, from languages to technical subjects, all while enjoying an engaging and interactive learning process. Whether you're a student looking to excel in your studies or a professional seeking to expand your expertise, Skillify is here to propel you toward success. Embrace the future of learning with Skillify and embark on a journey of rapid growth and discovery.
Additionally, Skillify doesn't stop at lessons; it's also equipped with tools to assist you in your homework and assignments. Say goodbye to the struggles of solitary studying - with Skillify, you'll have the support you need to excel academically.
        </DialogContent>
    </Dialog>
  )
}
