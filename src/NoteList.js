import React, { useState }  from 'react';

import axios from 'axios';

const NoteList = ({ notes, updateNote, deleteNote, fetchNotes }) => {
  const [editedNoteId, setEditedNoteId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedTags, setEditedTags] = useState('');

  const startEditing = (note) => {
    setEditedNoteId(note._id);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setEditedTags(note.tags.join(', '));
  };

  const cancelEditing = () => {
    setEditedNoteId(null);
    setEditedTitle('');
    setEditedContent('');
    setEditedTags('');
  };

  const saveEditing = async (noteId) => {
    await updateNote(noteId, {
      title: editedTitle || notes.find((note) => note._id === noteId).title,
      content: editedContent || notes.find((note) => note._id === noteId).content,
      tags: editedTags ? editedTags.split(',').map((tag) => tag.trim()) : notes.find((note) => note._id === noteId).tags,
    });
    setEditedNoteId(null);
  };

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note._id} className="note">
          {editedNoteId === note._id ? (
            <>
              <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
              <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
              <input type="text" value={editedTags} onChange={(e) => setEditedTags(e.target.value)} />
              <button onClick={() => saveEditing(note._id)}>Save</button>
              <button onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p>Tags: {note.tags.join(', ')}</p>
              <div className="note-actions">
                <button onClick={() => startEditing(note)}>Edit</button>
                <button onClick={() => deleteNote(note._id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};







// const NoteList = ({ notes }) => {
//   return (
//     <div className="note-list">
//       {notes.map((note) => (
//         <NoteCard key={note.id} note={note} />
//       ))}
//     </div>
//   );
// };


//   const updateNote = async (noteId, updatedData) => {
//     try {
//       console.log(noteId)
      
//       await axios.put(`/notes/${noteId}`, updatedData);
//       // After updating a note, fetch the updated notes list
//       fetchNotes();
//     } catch (error) {
//       console.error('Error updating note:', error);
//     }
//   };

//   const deleteNote = async (noteId) => {
//     try {
//       await axios.delete(`/notes/${noteId}`);
//       // After deleting a note, fetch the updated notes list
//       fetchNotes();
//     } catch (error) {
//       console.error('Error deleting note:', error);
//     }
//   };


    //console.log(notes.note)

export default NoteList;