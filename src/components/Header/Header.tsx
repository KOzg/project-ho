'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { headerConstants } from './HeaderConstants';
import styles from './Header.module.scss';

export default function Header() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };
  return (
    <>
      <header className={clsx(styles.header)}>
        <div className="container">
          <nav className={styles.navigation}>
            <ul className={styles.leftTitle}>
              <li className={styles.title}>Kaan Ozgunay</li>
              <li className={styles.subtitle}>Software Engineer</li>
            </ul>
            <ul className={styles.navigationList}>
              {headerConstants.navigation.map((link, index) => {
                return (
                  <li key={`${index}-${link.label}`}>
                    <NextLink
                      className={isActive(link.href) ? styles.active : ''}
                      href={link.href}
                    >
                      {link.label}
                    </NextLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
