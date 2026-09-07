"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNotes } from "../../../../lib/api";
import { formatDate } from "../../../../lib/formatDate";
import css from "./Notes.module.css";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", tag),
    refetchOnMount: false,
  });

  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <p className={css.filter}>Filter: {tag}</p>
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </div>
      {isLoading && <p className={css.message}>Loading notes...</p>}
      {isError && <p className={css.message}>Unable to load notes.</p>}
      {!isLoading && !isError && notes.length === 0 && (
        <p className={css.message}>No notes found.</p>
      )}
      <ul className={css.grid}>
        {notes.map((note) => (
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
  );
}
