import type { Metadata } from "next";
import NotesClient from "../../../../components/NotesClient/NotesClient";
import { fetchNotes } from "../../../../lib/api/notes";
import { openGraphImage, siteUrl } from "../../../../lib/seo";

export const dynamic = "force-dynamic";
interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const filter = (await params).slug.join("/") || "all";
  const title = `${filter} notes | NoteHub`;
  const description = `Browse your ${filter} notes in NoteHub.`;
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

export default async function FilterPage({ params }: FilterPageProps) {
  const tag = (await params).slug.join("/") || "all";
  const data = await fetchNotes("", tag);
  return <NotesClient tag={tag} initialNotes={data.notes} />;
}
