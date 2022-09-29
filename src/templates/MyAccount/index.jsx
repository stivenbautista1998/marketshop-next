import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconApp } from '@components/IconApp';
import { GeneralButton } from "@components/GeneralButton";
import { SyncAlertWithProps } from "@components/SyncAlert";
import AppContext from '@context/AppContext';
import { AuthContext } from "@context/AuthContext";
import { useMyAccount } from './hooks/useMyAccount';

import menuSvg from "@icons/menu-icon.svg";
import shoppingCartSvg from "@icons/shopping-cart.svg";
import styles from './MyAccount.module.scss';

const activeField = { backgroundColor: "rgb(247, 247, 247)", paddingLeft: "0.7em" }

const MyAccount = () => {
  const { currentUser, editCurrentUserInfo, validateUser, syncAuth } = useContext(AuthContext);
  const {
    isEditable,
    userName,
    userEmail,
    userPassWord,
    confirmPassword,
    showPassConfirm,
    onChangeHandler,
    editAccount,
    syncUserData,
    errorState
  } = useMyAccount(currentUser, editCurrentUserInfo, validateUser);

  const { setSyncOfCurrentUser } = useContext(AppContext);

  // show user info updated every time the user information is updated for another tab.
  useEffect(() => {
    syncUserData();
  }, [syncAuth]);

  return (
    <div className={styles.wrapperLogin}>
      <div className="section-up">
        <header className={styles.boxShadowHeader}>
          <nav className={`${styles.headerHomeNav} ${styles.noFixed}`}>
            <div className={styles.menuIcon} >
              <Image
                src={menuSvg}
                width={25}
                height={21}
                objectFit="fill"
                alt="menu icon"
              />
            </div>
            <Link className={styles.styleNoLink} href="/">
              <IconApp />
            </Link>
            <div className={styles.shoppingCart} >
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
        <form className={styles.mainMyAccount} action="/">
          <h2 className={styles.myAccountTittle}>My account</h2>
          <label className={`${styles.loginSection__label} ${ errorState.username.error ? styles.redLetters : "" }`}
            htmlFor="name-txt">
            { errorState.username.text !== "" ? errorState.username.text : "Username" }
          </label>
          <input className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.username.error ? styles.redBorders : "" }`}
            name="username-txt"
            style={ isEditable ? activeField : null }
            onChange={onChangeHandler}
            readOnly={ isEditable ? false : true }
            placeholder="UserExample"
            value={userName}
            type="text"
          />
          <label className={`${styles.loginSection__label} ${ errorState.email.error ? styles.redLetters : "" }`}
            htmlFor="email-txt">
            { errorState.email.text !== "" ? errorState.email.text : "Email address" }
          </label>
          <input className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.email.error ? styles.redBorders : "" }`}
            name="email-txt"
            style={ isEditable ? activeField : null }
            onChange={onChangeHandler}
            readOnly={ isEditable ? false : true }
            placeholder="explample@gmail.com"
            value={userEmail}
            type="text"
          />
          <label className={`${styles.loginSection__label} ${ errorState.pass.error ? styles.redLetters : "" }`}
            htmlFor="password-txt">
            { errorState.pass.text !== "" ? errorState.pass.text : "Password" }
          </label>
          <input className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.pass.error ? styles.redBorders : "" }`}
            name="password-txt"
            style={ isEditable ? activeField : null }
            onChange={onChangeHandler}
            readOnly={ isEditable ? false : true }
            value={userPassWord}
            type="password"
          />
          <label style={ showPassConfirm ? null : { display: "none" } }
            className={`${styles.loginSection__label} ${ errorState.passConfirm.error ? styles.redLetters : "" }`}
            htmlFor="repeat-password-txt">
            { errorState.passConfirm.text !== "" ? errorState.passConfirm.text : "Repeat Password" }
          </label>
          <input style={ showPassConfirm ? activeField : { display: "none" } }
            className={`${styles.generalInput} ${styles.loginSection__input} ${ errorState.passConfirm.error ? styles.redBorders : "" }`}
            name="repeat-password-txt"
            value={confirmPassword}
            onChange={onChangeHandler}
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
          buttonText={ isEditable ? "Save" : "Edit" }
          color={ isEditable ? "green" : "white" }
          clickHandler={editAccount}
        />
      </div>
      <SyncAlertWithProps
        synchronize={setSyncOfCurrentUser}
      />
    </div>
  );
}

export { MyAccount };
