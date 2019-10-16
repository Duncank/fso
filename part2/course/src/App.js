import React, { useState, useEffect } from 'react'
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes'

const App = (props) => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    const hook = () => {
        noteService.getAll().then(initalNotes => {
            setNotes(initalNotes)
        })
    }
    useEffect(hook, [])

    const notesToShow = showAll ?
        notes :
        notes.filter(note => note.important)

    const toggleImportanceOf = id => {
        const note = notes.find(it => it.id === id);
        const changedNote = { ...note, important: !note.important }

        noteService.update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(`Note '${note.content}' was already deleted from server`)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            });
    }

    const rows = () => notesToShow.map(note =><Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            id: notes.length + 1,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        };

        noteService.create(noteObject)
            .then(returnedObject => {
                setNotes(notes.concat(returnedObject));
                setNewNote('');
            })
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const Footer = () => {
        const footerStyle = {
            color: 'green',
            fontStyle: 'italic',
            fontSize: 16
        }

        return (
            <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2019</em>
            </div>
        )
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
            <Footer />
        </div>
    )
}

export default App;