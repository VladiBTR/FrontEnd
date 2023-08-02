import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

import axios from 'axios';



function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}





function App() {
  
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch initial data from FastAPI server
    axios.get('/api/notes')
      .then((response) => setNotes(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);






  // Function to add a new note
  const addNote = (newNote) => {
    setNotes([...notes, { ...newNote, id: notes.length + 1 }]);
  };

  return (
    <div className="app">
      <Header />

      <div className="main-content">
        <NoteList notes={notes} />

        <div className="side-bar">
          <h2>Sidebar Content</h2>
          {/* Add any additional sidebar content here */}
        </div>
      </div>

      <NoteForm onSubmit={addNote} />
    </div>
  );
  
  
}



export default App;
