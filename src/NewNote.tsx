import React from 'react'
import NoteForm from './NoteForm'

const NewNote = () => {
  return (
    <section className=''>
    <h2 className='text-4xl font-bold my-5 container mx-auto'>New Note</h2>
    <NoteForm />
    </section>
  )
}

export default NewNote