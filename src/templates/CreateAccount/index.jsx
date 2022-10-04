import Link from 'next/link';
import Image from 'next/image';
import { IconApp } from '@components/IconApp';
import { GeneralButton } from '@components/GeneralButton';
import { useCreateAccount } from './hooks/useCreateAccount';

import menuSvg from "@icons/menu-icon.svg";
import shoppingCartSvg from "@icons/shopping-cart.svg";
import styles from './CreateAccount.module.scss';

const CreateAccount = () => {
  const {
    formRef,
    showPassConfirm,
    passwordValue,
    checkNewAccount,
    onChangeHandler,
    errorState
  } = useCreateAccount();

  console.log("The result: " + errorState.passConfirm.error);

  return (
    <div className={styles.wrapperLogin}>
      <div className="section-up">
        <header className={styles.boxShadowHeader}>
          <nav className={`${styles.headerHomeNav} ${styles.noFixed}`}>
            <div className={styles.menuIcon}>
              <Image
                src={menuSvg}
                width={25}
                height={21}
                objectFit="fill"
                alt="menu icon"
              />
            </div>
            <Link className={styles.noUnderline} href="/login">
              <IconApp size={48} redirect="/login" />
            </Link>
            <div className={styles.shoppingCart}>
              <Image
                src={shoppingCartSvg}
                width={25}
                height={21}
                objectFit="fill"
                alt="icon of a shopping cart"
              />
            </div>
          </nav>
        </header>
        <form id='create-account-form' className={styles.loginSection} action="/login" ref={formRef}>
          <h2 className={styles.myAccountTittle}>Create Account</h2>
          <label className={`${styles.loginSection__label} ${ errorState.username.error ? styles.redLetters : "" }`}
            htmlFor="name-txt">
            { errorState.username.text !== "" ? errorState.username.text : "Username" }
          </label>
          <input className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.username.error ? styles.redBorders : "" }`}
            onChange={onChangeHandler}
            name="username-txt"
            placeholder="UserExample"
            type="text"
          />
          <label className={`${styles.loginSection__label} ${ errorState.email.error ? styles.redLetters : "" }`}
            htmlFor="email-txt">
            { errorState.email.text !== "" ? errorState.email.text : "Email address" }
          </label>
          <input className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.email.error ? styles.redBorders : "" }`}
            onChange={onChangeHandler}
            name="email-txt"
            placeholder="example@gmail.com"
            type="text"
          />
          <label className={`${styles.loginSection__label} ${ errorState.pass.error ? styles.redLetters : "" }`}
            htmlFor="password-txt">
            { errorState.pass.text !== "" ? errorState.pass.text : "Password" }
          </label>
          <input className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.pass.error ? styles.redBorders : "" }`}
            onChange={onChangeHandler}
            value={passwordValue}
            name="password-txt"
            type="password"
          />
          <label style={ showPassConfirm ? null : { display: "none" } }
            className={`${styles.loginSection__label} ${ errorState.passConfirm.error ? styles.redLetters : "" }`}
            htmlFor="repeat-password-txt">
            { errorState.passConfirm.text !== "" ? errorState.passConfirm.text : "Repeat Password" }
          </label>
          <input style={ showPassConfirm ? null : { display: "none" } }
            className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.passConfirm.error ? styles.redBorders : "" }`}
            onChange={onChangeHandler}
            name="repeat-password-txt"
            type="password"
          />
          <div
            className={`${styles.errorMessage} ${ errorState.errorMessage !== "" ? styles.showDetailErrorMessage : "" }`}>
            { errorState.errorMessage !== "" ? errorState.errorMessage : "" }
          </div>
        </form>
      </div>
      <div className={styles.sectionDown}>
        <GeneralButton
          buttonText="Create"
          color="green"
          clickHandler={checkNewAccount}
        />
      </div>
    </div>
  );
};

export { CreateAccount };
