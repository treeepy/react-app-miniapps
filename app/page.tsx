'use client'

import Head from 'next/head'
import { useState } from 'react'
import Calendar, { CalendarProps } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

interface Note {
  date: Date
  content: string
}

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [notes, setNotes] = useState<Note[]>([])
  const [noteContent, setNoteContent] = useState<string>('')

  const addNote = () => {
    setNotes([...notes, { date: selectedDate, content: noteContent }])
    setNoteContent('')
  }

  const notesForSelectedDate = notes.filter(note =>
      note.date.toDateString() === selectedDate.toDateString()
  )

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value)
    }
  }

  return (
      <div className="min-h-screen p-4">
        <Head>
          <title>Simple Note App</title>
          <meta name="description" content="A simple note app with calendar integration" />
        </Head>
        <main className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Simple Note App</h1>
          <Calendar onChange={handleDateChange} value={selectedDate} className="mb-4" />
          <div className="mb-4">
            <h2 className="text-2xl">Notes for {selectedDate.toDateString()}</h2>
            <ul>
              {notesForSelectedDate.map((note, index) => (
                  <li key={index} className="border p-2 my-2">{note.content}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
          <textarea
              className="border w-full p-2"
              rows={3}
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write your note here..."
          />
            <button
                className="bg-blue-500 text-white py-2 px-4 mt-2"
                onClick={addNote}
            >
              Add Note
            </button>
          </div>
        </main>
      </div>
  )
}