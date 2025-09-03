import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function SidebarPage() {
  const tags = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

  return (
    <ul className={css.menuList}>
      {tags.map(tag => {
        const href = `/notes/filter/${tag}`;
        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
