import styles from './navigation.module.scss';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  return (
    <div className="bg-gray-800 text-white w-64 flex flex-col">
    <div className="p-4 border-b border-gray-700">Bienvenido</div>
    <nav className="flex-1">
      <ul className="space-y-2 mt-4">
          <li>
            <Link href="/dashboard" passHref>
              {/* Agregamos el prop passHref */}
              <div className="block py-2 px-4 text-sm hover:bg-gray-700">Dashboard</div>
            </Link>
          </li>
          <li>
            <Link href="/client" passHref>
              {/* Agregamos el prop passHref */}
              <div className="block py-2 px-4 text-sm hover:bg-gray-700">Empleados</div>
            </Link>
          </li>
          <li>
            <Link href="/dashboard" passHref>
              {/* Agregamos el prop passHref */}
              <div className="block py-2 px-4 text-sm hover:bg-gray-700">Nomina</div>
            </Link>
          </li>
      </ul>
    </nav>
  </div>
  );
}

export default Navigation;
