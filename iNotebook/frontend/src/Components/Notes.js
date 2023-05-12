import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  let history = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;

  const [note, setNote] = useState({
    id: "",
    utitle: "",
    udescription: "",
    utag: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNote();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      utitle: currentNote.title,
      udescription: currentNote.description,
      utag: currentNote.tag,
    });
  };

  const [isShow, invokeModal] = React.useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  const toggleShow = () => invokeModal(!isShow);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const hendleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.utitle, note.udescription, note.utag);
    refClose.current.click();
    props.showAlert("Updated Successfull", "success");
  };
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <Button
        className="d-none"
        ref={ref}
        variant="primary"
        onClick={initModal}
      >
        Open Modal
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={toggleShow}>
          <Modal.Title>Edit-Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="utitle"
                name="utitle"
                value={note.utitle}
                aria-describedby="emailHelp"
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="udescription"
                name="udescription"
                value={note.udescription}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Tag
              </label>
              <input
                type="text"
                className="form-control"
                id="utag"
                name="utag"
                value={note.utag}
                onChange={onChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refClose} variant="danger" onClick={toggleShow}>
            Close
          </Button>
          <Button
            disabled={note.utitle.length < 5 || note.udescription.length < 5}
            variant="dark"
            onClick={hendleClick}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <h2>Your Notes</h2>
        <br />
        <div className="container">
          {notes.length === 0 &&
            "Nothing to Preview - Please add your notes to see here"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
