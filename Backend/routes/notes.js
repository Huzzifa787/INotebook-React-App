const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

//Router 1 : Get all the Notes using POST :  /api/auth/fetchallnotes Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

//Router 2 : Add a Note using POST :  /api/auth/addnote Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 Chars Long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      // If there are errors then return Bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status("400").json({
          errors: errors.array(),
        });
      }
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Router 3 : Update the Notes By ID using POST :  /api/notes/updatenote Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Create a new Note Object
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
    // find the note which want to update
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // In case user has accessed other notes
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});
//Router 4: Delete the Notes By ID using Delete :  /api/notes/deletenote Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // find the note which want to update
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // In case user has accessed other notes
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
