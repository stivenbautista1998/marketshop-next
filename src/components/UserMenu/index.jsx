import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import arrowDownSvg from "@icons/arrow-down.svg";
import styles from './UserMenu.module.scss';

const UserMenu = ({ userEmail, showNav, handleMenuNav, setCurrentUser }) => {
  const router = useRouter();
  const singOut = () => {
    setCurrentUser(null);
    router.push("/login");
  };

  return (
    <div className={styles.emailMenu}>
      <div onClick={handleMenuNav} className={styles.emailMenu__front}>
        <span className={styles.emailMenu__text}>{userEmail}</span>
        <Image
          src={arrowDownSvg}
          width={8}
          height={5}
          objectFit="fill"
          alt="arrow down image"
        />
      </div>
      <div className={`${styles.emailMenu__list} ${showNav ? styles.showSection : ""}` }>
        <ul className={styles.emailListUl}>
          <li className={styles.emailListUl__item}>
            <Link href="/my-orders">
              <a className={styles.styleNoLink}>
                My orders
              </a>
            </Link>
          </li>
          <li className={styles.emailListUl__item}>
            <Link href="/my-account">
              <a className={styles.styleNoLink}>
                My account
              </a>
            </Link>
          </li>
          <button onClick={singOut} className={`${styles.emailListUl__item} ${styles.menuTab__logging}`}>
            Sign out
          </button>
        </ul>
      </div>
    </div>
  );
}

export { UserMenu };
