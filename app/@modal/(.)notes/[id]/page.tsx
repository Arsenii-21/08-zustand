import NotePreview from "../../../../components/NotePreview/NotePreview";

interface InterceptedNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNotePage({
  params,
}: InterceptedNotePageProps) {
  const { id } = await params;
  return <NotePreview id={id} />;
}
