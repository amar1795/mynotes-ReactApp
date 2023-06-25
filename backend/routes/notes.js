const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
var Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//route 1:for fetching all the notes using  GET:"/api/auth/fetchallnotes Login is required"

router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Internal server error");
        
    }
 
});

//route 2:for adding note using POST:"/api/auth/addnote Login is required"
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

module.exports = router;
