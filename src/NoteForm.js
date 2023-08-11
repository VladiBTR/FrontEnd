import React, { useState } from 'react';

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: '' });



  const handleInputChange = (key, value) => {
    setNewNote((prevNote) => ({ ...prevNote, [key]: value }));
  };



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
     <div className="task-input">
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div
          className={`textarea-input ${newNote.title ? '' : 'placeholder'}`}
          contentEditable="true"
          onInput={(e) => handleInputChange('title', e.target.innerText)}
          suppressContentEditableWarning={true}
        >
          {newNote.title ? null : 'Title'}
        </div>

        {/* Content */}
        <div
          className={`textarea-input ${newNote.content ? '' : 'placeholder'}`}
          contentEditable="true"
          onInput={(e) => handleInputChange('content', e.target.innerText)}
          suppressContentEditableWarning={true}
        >
          {newNote.content ? null : 'Content'}
        </div>

        {/* Tags */}
        <div
          className={`textarea-input ${newNote.tags ? '' : 'placeholder'}`}
          contentEditable="true"
          onInput={(e) => handleInputChange('tags', e.target.innerText)}
          suppressContentEditableWarning={true}
        >
          {newNote.tags ? null : 'Tags (comma-separated)'}
        </div>

        {/* Save button */}
        <button className="button-add" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};




export default NoteForm;