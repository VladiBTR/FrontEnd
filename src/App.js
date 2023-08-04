import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import NoteList from './NoteList';
import NoteForm from './NoteForm';

import axios from 'axios';

import API_BASE_URL from './config';




function App() {
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [], _id: '' });

  useEffect(() => {
    // Fetch initial data from FastAPI server
    fetchNotes();
  }, []);

  

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}all_notes/`);
      console.log(response.data);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addNote = async (newNoteData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}notes/`, newNoteData);
      const createdNote = response.data;
      // After adding a new note, fetch the updated notes list
      await fetchNotes();
      // Clear the input fields

      //setNewNote({ ...newNote, id: createdNote._id });


      setNewNote({ title: '', content: '', tags: [], id: '' });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  
  const updateNote = async (noteId, updatedData) => {
    try {
      console.log(notes)
      await axios.put(`${API_BASE_URL}notes/${noteId}`, updatedData);
      // After updating a note, fetch the updated notes list
      await fetchNotes();

    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`${API_BASE_URL}notes/${noteId}`);
      // After deleting a note, fetch the updated notes list
      await fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };


 

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        {/* NoteForm component here */}
        <NoteForm newNote={newNote} setNewNote={setNewNote} addNote={addNote} />
        {/* NoteList component here */}
        <NoteList notes={notes} updateNote={updateNote} deleteNote={deleteNote} fetchNotes={fetchNotes} />
      </div>
    </div>
  );
}













export default App;
