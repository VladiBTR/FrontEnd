import React, { useState }  from 'react';

import styled from 'styled-components';



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
  const [searchQuery, setSearchQuery] = useState('');

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


  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  return (

   <div>
      {/* Search Bar */}
      <input
        className='search-bar'
        type="text"
        placeholder="Search by keyword..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="todo-list">
        {filteredNotes.map((note) => (
          <div key={note._id} className="list">
            {editedNoteId === note._id ? (
              <>
                <div
                  contentEditable="true"
                  className={`editable-field`}
                  onBlur={(e) => setEditedTitle(e.target.innerText)}
                  placeholder='Title'
                  suppressContentEditableWarning={true}
                >
                  {editedTitle || "Title:"}
                </div>
                <div
                  contentEditable="true"
                  className="editable-field"
                  onBlur={(e) => setEditedContent(e.target.innerText)}
                  suppressContentEditableWarning={true}
                >
                  {editedContent || "Content:"}
                </div>
                <div
                  contentEditable="true"
                  className="editable-field"
                  onBlur={(e) => setEditedTags(e.target.innerText)}
                  suppressContentEditableWarning={true}
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
    </div>
  );
};





export default NoteList;