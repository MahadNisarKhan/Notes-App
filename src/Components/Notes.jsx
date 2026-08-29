import React, { useState, useEffect, useRef } from 'react';
import './Notes.css';

function Notes() {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('my-notes');  // my-notes is the key in localStorage where notes are saved
        if (saved) {
            return JSON.parse(saved); // If there are saved notes in localStorage, use them
        }
        else {
            return [
                { id: 1, title: 'My First Note', content: 'Hello world!' },
                { id: 2, title: 'Shopping List', content: 'Milk, Eggs, Bread' },
            ];
        }
    });

    const [search, setSearch] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [sortOption, setSortOption] = useState('newest');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const titleInputRef = useRef(null);


    useEffect(() => {  // save to localStorage when notes change (add, update, delete)
        localStorage.setItem('my-notes', JSON.stringify(notes));
    }, [notes]);


    useEffect(() => {  // focus title input when a note is selected
        titleInputRef.current.focus();
    }, [selectedId]); // selectedId is null at starting, so when a note is selected, then seletedId will change and this useEffect will run and focus the title input


    // Click + -> clear form
    const clickNewNote = () => {
        setSelectedId(null);
        setTitle('');
        setContent('');
    }


    // Click a note -> load into form
    const clickNote = (note) => {
        setSelectedId(note.id);
        setTitle(note.title);
        setContent(note.content);
    }


    // Click Save -> add new OR update existing
    const clickSaveUpdate = () => {
        if (title === '') {
            alert('Please write a title!');
            titleInputRef.current.focus();
            return;
        }

        if (selectedId === null) { // If no note is selected, create a new one
            const newNote = { id: Date.now(), title: title, content: content };
            setNotes([newNote, ...notes]); // Add new note to the beginning of the notes array

            /*
            [newNote, ...notes]  // new note at TOP
            [...notes, newNote]  // new note at BOTTOM
            */
        }
        else {
            const updatedNotes = notes.map((note) => { // if a note is selected, update that note
                if (note.id === selectedId) {
                    return { ...note, title: title, content: content }; // Update the selected note
                }
                return note;
            });
            setNotes(updatedNotes);
        }

        setTitle('');
        setContent('');
        setSelectedId(null);
    }


    // Click Delete -> remove note
    const clickDelete = () => {
        const remainingNotes = notes.filter((note) => {
            return note.id !== selectedId; // return all notes except the one with the selectedId
        });
        setNotes(remainingNotes);
        setTitle('');
        setContent('');
        setSelectedId(null);
    }


    const visibleNotes = notes
        .filter((note) => {
            const searchLower = search.toLowerCase(); // when user writes something in search box, that text will become the value of "search"
            return (
                note.title.toLowerCase().includes(searchLower) ||
                note.content.toLowerCase().includes(searchLower)  // checking that if the value stored in searchLower is included in the title or content of the note, if included (true), then that note will be stored in the visibleNotes array, otherwise (false) not stored in the array. It means that visibleNotes array will have an array of zero or more length.
            );
        })
        .sort((a, b) => {
            if (sortOption === 'newest') return b.id - a.id;  // bigger id = newer
            if (sortOption === 'oldest') return a.id - b.id;  // smaller id = older
            if (sortOption === 'A-Z') return a.title.localeCompare(b.title); // alphabetical
            return 0;
        });



    return (
        <>
            <div className="container">
                <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                    <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
                    <h2 id="notes">📝 My Notes</h2>
                    <input
                        id="search"
                        type="text"
                        placeholder="Search notes..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); }} />
                    <button id="new" onClick={clickNewNote}>+ New Note</button>

                    <select id="sort"
                        value={sortOption}
                        onChange={(e) => { setSortOption(e.target.value); }}
                    >
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value="A-Z">A - Z</option>
                    </select>

                    {/* If no notes match the search, show "No notes found." */}
                    {visibleNotes.length === 0 && <p>No notes found.</p>}

                    {visibleNotes.map((note) => {
                        return (
                            <div
                                key={note.id}
                                className={note.id === selectedId ? 'note-item active' : 'note-item'}
                                onClick={() => { clickNote(note); }} >

                                <strong>{note.title}</strong>
                                <p>{note.content.slice(0, 40)}...</p>  {/* will add ... at 40th character of the note content */}
                            </div>
                        );
                    })}

                </div>
                <div className="editor">
                    {!sidebarOpen && (
                        <button className="sidebar-toggle" onClick={() => setSidebarOpen(true)}>☰</button>
                    )}
                    <h2>{selectedId ? '✏️ Edit Note' : '➕ New Note'}</h2>

                    <input
                        ref={titleInputRef}
                        type="text"
                        id="title"
                        placeholder="Note title..."
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); }} />

                    <textarea
                        placeholder="Write your note..."
                        value={content}
                        id="content"
                        onChange={(e) => { setContent(e.target.value); }}
                        rows={10} />

                    <button id="saveUpdateBtn" onClick={clickSaveUpdate}>
                        {selectedId ? '💾 Update Note' : '💾 Save Note'}
                    </button>

                    {selectedId && (
                        <button id="deleteBtn" onClick={clickDelete}>🗑️ Delete Note</button>
                    )}
                </div>
            </div>
        </>
    );
}

export default Notes;