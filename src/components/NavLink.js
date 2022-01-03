import { NavLink as Link } from 'react-router-dom';
export default function NavLink({ link, children }) {
  return (
    <Link
      to={link}
      className={({ isActive }) => (isActive ? 'isActive' : 'link')}
    >
      {children}
    </Link>
  );
}
