import React from 'react';
import axios from 'axios';

 const NoteList = ({ notes, updateNote, deleteNote, fetchNotes }) => {
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
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note._id} className="note">
          <h3>{note.title}</h3>
          <div>{note._id}</div>
          <p>{note.content}</p>
          <p>Tags: {note.tags.join(', ')}</p>
          <div className="note-actions">
            <button onClick={() => updateNote(note._id, { title: 'Updated Title' })}>
              Update
            </button>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
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

export default NoteList;