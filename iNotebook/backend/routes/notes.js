const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
//---------ROUTE 1 :----------GET ALL THE NOTES USING 'GET METHOD' "/api/notes/fetchallnotes". login requires
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

//---------ROUTE 2 :----------ADD A NEW NOTES USING 'POST METHOD' "/api/notes/addnote". login requires
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please enater a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //-------------IF THERE ARE ERRORS, RETURN BAD REQUEST AND THE ERRORS------------
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Enternal Server Error");
    }
  }
);

//---------ROUTE 3 :----------FOR UPDATING A EXISTING NOTES USING 'PUT METHOD' "/api/notes/updatenote". login requires
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //--------------CREATE A NEW NOTE OBJECT-------------
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //----------FIND THE NOTE TO BE UPDATED AND UPDATE IT..-----------
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});

//---------ROUTE 4 :----------FOR DELETING A EXISTING NOTES USING 'DELETE METHOD' "/api/notes/deletenote". login requires

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //----------FIND THE NOTE TO BE DELETED AND DELETE IT..-----------
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //-----------ALLOW DELETION ONLY IF USER OWN THIS NOTE---------
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Deletion Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Enternal Server Error");
  }
});
module.exports = router;
