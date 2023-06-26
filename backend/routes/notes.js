const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//route 1:for fetching all the notes using  GET:"/api/notes/fetchallnotes Login is required"

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//route 2:for adding note using POST:"/api/notes/addnote Login is required"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      //using destructuring storing the values
      const { title, description, tag } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).send({ errors: error.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//route 3:for adding note using POST:"/api/notes/addnote Login is required"
//we use put endpoint for updateing anything a post will also work 
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    //using destructuring storing the values
    const { title, description, tag } = req.body;

    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    //find the note to updated and to update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//route 4:for deleting note using POST:"/api/notes/deletenote Login is required"
//we use put endpoint for updateing anything a post will also work 
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    

    //find the note to updated and to update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "success":"the note has been deleted", note:note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
