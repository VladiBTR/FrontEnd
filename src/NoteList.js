import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NoteList;