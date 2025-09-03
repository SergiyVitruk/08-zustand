import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page not found | NoteHUB',
  description: 'The page you are looking for does not exist.',
  alternates: {
    canonical: '/not-found',
  },
  openGraph: {
    title: '404 – Page not found | NoteHUB',
    description: 'The page you are looking for does not exist.',
    url: '/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
