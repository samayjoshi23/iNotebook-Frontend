import React, { useState, useContext } from 'react'
import noteContext from '../Context/Notes/NoteContext';

function AddNote() {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: "default"});

    const handleClick = (e)=> {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChanging = (e)=> {
        setNote({...note, [e.target.name]: e.target.value} )
    }
  return (
    <div>
      <h2>Write your note</h2>
        <form action="" className="my-3 ">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" name="title" id="title" onChange={onChanging}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="description" id="description" onChange={onChanging}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" name="tag" id="tag" onChange={onChanging}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
        <h3>Your Notes</h3>
    </div>
  )
}

export default AddNote
