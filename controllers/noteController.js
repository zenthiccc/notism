const Notes = require("../models/noteModel");

const noteController = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      console.error(err);
    }
  },
  createNote: async (req, res) => {
    try {
      const { title, content } = req.body;
      const newNote = new Notes({
        title,
        content,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newNote.save();
      res.json({ msg: "Created a Note" });
    } catch (err) {
      console.error(err);
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Note" });
    } catch (err) {
      console.error(err);
    }
  },
  updateNote: async (req, res) => {
    try {
      const { title, content } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          content,
        }
      );
      res.json({ msg: "Updated a Note" });
    } catch (err) {
      console.error(err);
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = noteController;
