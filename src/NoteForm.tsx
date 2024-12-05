import React, { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { NoteData, Tag } from './App'


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
  } & Partial<NoteData>

const NoteForm = ({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [], }: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])


    function handleSubmit(e: FormEvent) {
        e.preventDefault()
    
        onSubmit({
          title: titleRef.current!.value,
          markdown: markdownRef.current!.value,
          tags: selectedTags,
        })
    
        // navigate("..")
      }



  return (
      <form className='flex flex-col p-10 space-y-6 mt-4 mb-6  container mx-auto' onSubmit={handleSubmit}>
      <div className='flex items-center gap-10 '>
        <div className='w-full'>
       <p className='font-bold text-lg'>Title</p>
      <input 
        type="number"
        placeholder='title'
        required
        className='w-full border px-2 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue mt-1'
        ref={titleRef}
       />
        </div>
        <div className='w-full'>
       <p className='font-bold text-lg'>Tags</p>
       <CreatableReactSelect
            value={selectedTags.map((tag) => {
                return {label: tag.label, value: tag.id}
            })}

            onChange={tags => {
                setSelectedTags(tags.map((tag) => {
                    return {label: tag.label, id: tag.value}

                }))
            }}
        isMulti />
        </div>
      </div>
       <p className='font-bold text-lg'>Job Description</p>
       <textarea 
        name="" 
        id="" 
        cols={10} 
        rows={15}
        className='w-full border border-black rounded-md px-2 py-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue mt-1'
        ref={markdownRef}
        ></textarea>

        <div className='gap-4 flex'>
            <button type='submit' className='border border-black rounded-md px-6 py-2 hover:bg-blue-700 hover:text-white'>Save</button>
            <Link to='..'>
            <button type='button' className='border border-black rounded-md px-6 py-2 hover:bg-gray-500 hover:text-white'>Cancel</button>
            </Link>
        </div>
       </form>
  
  )
}

export default NoteForm