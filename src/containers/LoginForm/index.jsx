import React from 'react';
import Link from 'next/link';
import { GeneralButton } from "@components/GeneralButton";

import styles from './LoginForm.module.scss';

const LoginForm = ({ formRef, handlerSubmit, loginOnChange, passOnChange, errorState }) => {
  return (
    <main>
      <form className={styles.loginSection} action="/" ref={formRef}>
        <label
          className={`${styles.loginSection__label} ${errorState.email.error ? styles.redLetters : "" }` }
          htmlFor="user-txt">
          { errorState.email.text !== "" ? errorState.email.text : "Email address" }
        </label>
        <input
          className={`${styles.loginSection__input} ${styles.generalInput} ${styles.loginSection__input} ${errorState.email.error ? styles.redBorders : "" }`}
          onChange={loginOnChange}
          name="user-txt"
          type="text"
        />
        <label
          className={`${styles.loginSection__label} ${errorState.pass.error ? styles.redLetters : "" }`}
          htmlFor="password-txt">
          { errorState.pass.text !== "" ? errorState.pass.text : "Password" }
        </label>
        <input
          className={`${styles.generalInput} ${styles.loginSection__input} ${errorState.pass.error ? styles.redBorders : "" }`}
          onChange={passOnChange}
          name="password-txt"
          type="password"
        />
        <div
          className={`${styles.errorMessage} ${ errorState.errorMessage !== "" ? styles.showDetailErrorMessage : "" }`}>
          { errorState.errorMessage !== "" ? errorState.errorMessage : "" }
        </div>

        <GeneralButton
          buttonText="Log in"
          color="green"
          clickHandler={handlerSubmit}
        />
          <Link href="/password-recovery">
            <div className={`${styles.generalMessageLink} ${styles.green__message}`}>
              Forgot my password
            </div>
          </Link>
      </form>
    </main>
  );
};

export { LoginForm };
