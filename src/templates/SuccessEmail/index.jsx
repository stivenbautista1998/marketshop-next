import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconApp } from '@components/IconApp';

import smsIconSvg from '@icons/sms-icon.svg';
import styles from './SuccessEmail.module.scss';

const SuccessEmail = () => {
  return (
    <div className={styles.wrapperRecovery}>
      <header className={styles.headerSectionRecovery}>
        <nav>
          <IconApp bigSize={true} />
        </nav>
      </header>
      <main>
        <h2 className={styles.recoveryTitle}>Email has been sent!</h2>
        <p className={styles.recoveryText}>Please check your inbox for instructions on how to reset the password</p>
        <div className={styles.smsIcon}>
          <Image
            src={smsIconSvg}
            width={153}
            height={153}
            objectFit="fill"
            alt="image of a letter"
          />
        </div>
        <Link href="/login">
          <button className={`${styles.generalButton} ${styles.greenBtn}`}>
            Login
          </button>
        </Link>
        <p className={`${styles.generalMessageLink} ${styles.grey__message}`}>Didn’t receive the email? </p>
        <Link href="/password-recovery">
          <a className={`${styles.generalMessageLink} ${styles.green__message}`}>
            Resend
          </a>
        </Link>
      </main>
    </div>
  )
}

export { SuccessEmail };
