import { URL } from "../constants/URLs";
import axios from "axios";

export const fetchNotes = () => axios.get(URL);
export const createNote = (newNote) => axios.post(URL, newNote);
export const deleteNote = (id) => axios.delete(`${URL}/${id}`);
