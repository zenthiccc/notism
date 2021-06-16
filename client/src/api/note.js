import axios from "axios";

export const Create = (newNote, token) =>
  axios.post("/api/notes", newNote, {
    headers: { Authorization: token },
  });

export const Edit = (id, newNote, token) =>
  axios.put(`/api/notes/${id}`, newNote, {
    headers: { Authorization: token },
  });

export const getWithID = (id, token) =>
  axios.get(`/api/notes/${id}`, {
    headers: { Authorization: token },
  });

export const getWithoutID = (token) =>
  axios.get("api/notes", {
    headers: { Authorization: token },
  });

export const Delete = (id, token) =>
  axios.delete(`api/notes/${id}`, {
    headers: { Authorization: token },
  });
