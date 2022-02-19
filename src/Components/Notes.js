import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/Notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const {showAlert} = props;
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  };
  
  
  const handleClick = (e)=> {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Note updated successfully", 'warning');
  }
  const onChanging = (e)=> {
    setNote({...note, [e.target.name]: e.target.value} )
  }
  return (
    <>
      <AddNote showAlert={showAlert}/>
      
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editModal">
        Launch demo modal
      </button>
      <div className="modal fade"id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-etitle" id="editModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="" className="my-3 ">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" name="etitle" id="etitle" value={note.etitle} onChange={onChanging} required minLength={3}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onChanging} required minLength={5}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChanging} required minLength={2}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<3 || note.edescription.length<5 || note.etag.length<2} type="submit" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <h3>Your Notes</h3>
      <div className="my-4 row container-sm">
        <h5 className="mt-4 text-muted">{notes.length === 0 && 'No Notes to Display'}</h5>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
