import React, { useState }  from 'react';

import styled from 'styled-components';


import axios from 'axios';


const StyledButton = styled.button`
  background-color: #01030E;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;




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

    <div className="todo-list">
    {notes.map((note) => (
      <div key={note._id} className="list">
        {editedNoteId === note._id ? (
          <>
            <div
              contentEditable="true"
              className="editable-field"
              onBlur={(e) => setEditedTitle(e.target.innerText)}
            >
              {editedTitle}
            </div>
            <div
              contentEditable="true"
              className="editable-field"
              onBlur={(e) => setEditedContent(e.target.innerText)}
            >
              {editedContent}
            </div>
            <div
              contentEditable="true"
              className="editable-field"
              onBlur={(e) => setEditedTags(e.target.innerText)}
            >
              {editedTags}
            </div>
            <StyledButton onClick={() => saveEditing(note._id)}>Save</StyledButton>
            <StyledButton onClick={cancelEditing}>Cancel</StyledButton>
          </>
        ) : (
          <>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <p>Tags: {note.tags.join(', ')}</p>
            <div className="note-actions">
              <button className='button-edit task-button' onClick={() => startEditing(note)}>
                <i className='fa fa-edit' ></i> </button>
              <button className='button-delete task-button' onClick={() => deleteNote(note._id)}>
                <i className='fa fa-trash'></i> </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
);
};





//     <div className="todo-list">
//       {notes.map((note) => (
//         <div key={note._id} className="list">
//           {editedNoteId === note._id ? (
//             <>
//               <input type="text" value={editedTitle} className='list' onChange={(e) => setEditedTitle(e.target.value)} />
//               <input value={editedContent} className='list' onChange={(e) => setEditedContent(e.target.value)} />
//               <input type="text" value={editedTags} className='list' onChange={(e) => setEditedTags(e.target.value)} />
//               <StyledButton onClick={() => saveEditing(note._id)}>Save</StyledButton>
//               <StyledButton onClick={cancelEditing}>Cancel</StyledButton>
//             </>
//           ) : (
//             <>
//               <h3>{note.title}</h3>
//               <p>{note.content}</p>
//               <p>Tags: {note.tags.join(', ')}</p>
//               <div className="note-actions">
//                 <StyledButton onClick={() => startEditing(note)}>Edit</StyledButton>
//                 <StyledButton onClick={() => deleteNote(note._id)}>Delete</StyledButton>
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };







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