import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = {
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map((tag) => tag.trim()),
    };
    addNote(updatedNote);
    // Clear the input fields by updating the newNote state
    setNewNote({ title: '', content: '', tags: '' });
  };

  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newNote.tags}
          onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default NoteForm;