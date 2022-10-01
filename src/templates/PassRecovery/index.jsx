import React from "react";
import Link from "next/link";
import { IconApp } from '@components/IconApp';
import styles from './PassRecovery.module.scss';

const PassRecovery = () => {
  return (
    <div className={styles.wrapperRecovery}>
      <header className={styles.headerSectionRecovery}>
        <nav>
          <IconApp bigSize={true} />
        </nav>
      </header>
      <form>
        <h2 className={styles.recoveryTitle}>Password recovery</h2>
        <p className={styles.recoveryText}>Inform the email address used to create your account</p>
        <label className={styles.loginSection__label} htmlFor="user-txt">Email address</label>
        <input className={`${styles.generalInput} ${styles.loginSection__recovery}`} id="user-txt" placeholder="stivenb1994@gmail.com" type="text" />
        <Link href="/success-email">
          <button className={`${styles.generalButton} ${styles.greenBtn}`}>
            Submit
          </button>
        </Link>
        <Link href="/login">
          <a className={`${styles.generalMessageLink} ${styles.green__message}`}>
            Back to log in
          </a>
        </Link>
      </form>
    </div>
  );
}

export { PassRecovery };
