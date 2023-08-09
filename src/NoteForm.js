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
        >
          {newNote.title ? null : 'Title'}
        </div>

        {/* Content */}
        <div
          className={`textarea-input ${newNote.content ? '' : 'placeholder'}`}
          contentEditable="true"
          onInput={(e) => handleInputChange('content', e.target.innerText)}
        >
          {newNote.content ? null : 'Content'}
        </div>

        {/* Tags */}
        <div
          className={`textarea-input ${newNote.tags ? '' : 'placeholder'}`}
          contentEditable="true"
          onInput={(e) => handleInputChange('tags', e.target.innerText)}
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



//     <div className="task-input">
//       <form onSubmit={handleSubmit} >
        
//         <input className='textarea-input'
//           type="text"
//           placeholder="Title"
//           value={newNote.title}
//           onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
//         />
//         <textarea className='textarea-input'
//           placeholder="Content"
//           value={newNote.content}
//           onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
//         />
//         <input className='textarea-input'
//           type="text"
//           placeholder="Tags (comma-separated)"
//           value={newNote.tags}
//           onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
//         />
        
//         <button className='button-add' type="submit">Save</button>
//       </form>
//     </div>
//   );
// };

export default NoteForm;