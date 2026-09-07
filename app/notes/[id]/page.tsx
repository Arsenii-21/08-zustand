import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import { fetchNoteById } from "../../../lib/api";
import { openGraphImage, siteUrl } from "../../../lib/seo";
import NoteDetails from "./NoteDetails.client";

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
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
