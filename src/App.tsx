import { useState, useMemo } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './NewNote';
import { useLocalStorage } from './useLocalStorage';
import { v4 as uuidV4 } from "uuid"


export type Note = {
  id: string
} & NoteData


export type RawNote = {
  id: string
}


export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}
export type NoteData = {
  title: string
  markdown: string
  tag: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Routes>
      <Route path='/' element={<h1>home</h1>}/>
      <Route path='/new' element={<NewNote />} />
      <Route path='/:id'>
        <Route index  element={<h1>show</h1>} />
        <Route path='edit' element={<h1>edit</h1>}/>
      </Route>
      <Route path='*' element={<Navigate to='/' />}/>
    </Routes>
  )
}

export default App
