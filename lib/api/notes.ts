import type { NewNote, Note, NotesResponse, NoteTag } from "../../types/note";
import { api } from "./client";

export async function fetchNotes(
  search = "",
  tag?: string,
  page = 1,
): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: { search, tag: tag === "all" ? undefined : tag, page, perPage: 12 },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(note: NewNote): Promise<Note> {
  const { data } = await api.post<Note>("/notes", note);
  return data;
}

export const noteTags: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];
