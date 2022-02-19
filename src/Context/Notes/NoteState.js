import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=> {
  const host = "http://localhost:5000";
    const notesInitial = [];
    
    const [notes, setNotes] = useState(notesInitial);
    
    // Get all notes
    const getNotes = async() => {
      // API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjhlMzAxMDBjMTBmODU4NWM3ZmMzIn0sImlhdCI6MTY0NDk0MzMxOH0.qXPTXLgaSStVirSrh10J9WOoS0oRyr-5lM2uhgZapFs'
          }
        });
        const json = await response.json();
        setNotes(json);
    }


    // Add a note
      const addNote = async (title, description, tag)=> {
        // TODO API calls
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjhlMzAxMDBjMTBmODU4NWM3ZmMzIn0sImlhdCI6MTY0NDk0MzMxOH0.qXPTXLgaSStVirSrh10J9WOoS0oRyr-5lM2uhgZapFs'
          },
          body: JSON.stringify({title, description, tag})
        });

        const note= await response.json();
        setNotes(notes.concat(note))
      }
      
      // Delete a note
      
      const deleteNote = async(id)=> {
      // API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjhlMzAxMDBjMTBmODU4NWM3ZmMzIn0sImlhdCI6MTY0NDk0MzMxOH0.qXPTXLgaSStVirSrh10J9WOoS0oRyr-5lM2uhgZapFs'
          }
        });
    
        const json =  response.json();

        const newNotes = notes.filter((note) => {return note._id !== id})
        setNotes(newNotes);
      }
      
      
      // Update a note
      const editNote = async (id,title, description, tag)=> {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type' : 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjhlMzAxMDBjMTBmODU4NWM3ZmMzIn0sImlhdCI6MTY0NDk0MzMxOH0.qXPTXLgaSStVirSrh10J9WOoS0oRyr-5lM2uhgZapFs'
          },
          body: JSON.stringify({title, description, tag})
        });

        const json= await response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let i = 0; i < newNotes.length; i++) {
          const element = newNotes[i];
          if(element._id === id){
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break;
          }
        }
        setNotes(newNotes);
      }
    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;