import Note from "../models/Note.js";
import mongoose from "mongoose";

export const getNotes = async (req, res) => {
  try {
    const note = await Note.find();

    res.status(200).json(note);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  const note = req.body;
  const newNote = new Note(note);
  try {
    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await Note.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};
