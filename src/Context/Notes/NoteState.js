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
        console.log(json);
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


        console.log("Adding a new note...")
        let note = {
          "_id": "620be0b1b26sajab5329d3ec50",
          "user": "620b8e30100c10f8585c7fc3",
          "title": title,
          "description": description ,
          "tag": tag,
          "date": "2022-02-15T17:19:45.268Z",
          "__v": 0
        };
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
        console.log(json);
        const newNotes = notes.filter((note) => {return note._id !== id})
        setNotes(newNotes);
      }
      
      
      // Update a note
      const editNote = async (id,title, description, tag)=> {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYjhlMzAxMDBjMTBmODU4NWM3ZmMzIn0sImlhdCI6MTY0NDk0MzMxOH0.qXPTXLgaSStVirSrh10J9WOoS0oRyr-5lM2uhgZapFs'
          },
          body: JSON.stringify({title, description, tag})
        });

        const json =  response.json();
        
        // Logic to edit in client
        for (let i = 0; i < notes.length; i++) {
          const element = notes[i];
          if(element.title === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
        }
      }
    return (
        <NoteContext.Provider value={{notes, addNote, editNote,deleteNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;