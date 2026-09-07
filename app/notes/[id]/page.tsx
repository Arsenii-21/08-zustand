import type { Metadata } from "next";
import Link from "next/link";
import { fetchNoteById } from "../../../lib/api/notes";
import { formatDate } from "../../../lib/formatDate";
import { openGraphImage, siteUrl } from "../../../lib/seo";
import css from "./page.module.css";

export const dynamic = "force-dynamic";
interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const note = await fetchNoteById((await params).id);
  const title = `${note.title} | NoteHub`;
  const description = note.content.slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      images: [openGraphImage],
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const note = await fetchNoteById((await params).id);
  return (
    <main className={css.main}>
      <article className={css.article}>
        <Link href="/notes/filter/all">← All notes</Link>
        <span>{note.tag}</span>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
        <time dateTime={note.createdAt}>{formatDate(note.createdAt)}</time>
      </article>
    </main>
  );
}
