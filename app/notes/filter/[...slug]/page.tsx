import { fetchNotes } from '@/lib/api';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : (slug[0] as NoteTag);

  const page = await fetchNotes({ page: 1, perPage: 12, search: '', tag });

  const title = tag
    ? `Notes filtered by ${tag} | NoteHub`
    : 'All notes | NoteHub';

  const description = tag
    ? `Browse ${page.totalPages} pages notes tagged with "${tag}".`
    : `Browse all available notes (${page.totalPages} pages).`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: tag
        ? `https://08-zustand-eight-phi.vercel.app/notes/filter/${tag}`
        : `https://08-zustand-eight-phi.vercel.app/notes/filter/All`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub notes list',
        },
      ],
      type: 'website',
    },
  };
}

const NotesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : (slug[0] as NoteTag);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesPage;
