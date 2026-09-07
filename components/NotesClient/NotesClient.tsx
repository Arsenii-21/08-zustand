"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNotes } from "../../lib/api/notes";
import { formatDate } from "../../lib/formatDate";
import type { Note } from "../../types/note";
import css from "./NotesClient.module.css";

interface NotesClientProps {
  tag: string;
  initialNotes: Note[];
}

export default function NotesClient({ tag, initialNotes }: NotesClientProps) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", tag),
    initialData: { notes: initialNotes, totalPages: 1 },
  });

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.heading}>
          <div>
            <p className={css.eyebrow}>Your workspace</p>
            <h1 className={css.title}>Notes</h1>
          </div>
          <Link className={css.create} href="/notes/action/create">
            Create note <span aria-hidden="true">+</span>
          </Link>
        </div>
        <p className={css.filter}>Filter: {tag}</p>
        {isLoading && <p className={css.message}>Loading notes...</p>}
        {isError && <p className={css.message}>Unable to load notes.</p>}
        {!isLoading && !isError && data.notes.length === 0 && (
          <p className={css.message}>No notes found.</p>
        )}
        <ul className={css.grid}>
          {data.notes.map((note) => (
            <li className={css.card} key={note.id}>
              <Link href={`/notes/${note.id}`}>
                <span className={css.tag}>{note.tag}</span>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
                <time dateTime={note.createdAt}>
                  {formatDate(note.createdAt)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
