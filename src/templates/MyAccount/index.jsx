import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconApp } from '@components/IconApp';
import { GeneralButton } from "@components/GeneralButton";
import { SyncAlertWithProps } from "@components/SyncAlert";
import AppContext from '../../context/AppContext';
import { useMyAccount } from './hooks/useMyAccount';

import menuSvg from "@icons/menu-icon.svg";
import shoppingCartSvg from "@icons/shopping-cart.svg";

const activeField = { backgroundColor: "rgb(247, 247, 247)", paddingLeft: "0.7em" }

const MyAccount = ({ currentUser, editCurrentUserInfo, validateUser, syncAuth, synchronizeCurrentUser }) => {
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
      <div className="wrapper-login">
          <div className="section-up">
              <header className="box-shadow-header">
                  <nav className="header-home-nav no-fixed">
                      <div className="menu-icon" >
                        <Image
                          src={menuSvg}
                          width={25}
                          height={21}
                          objectFit="fill"
                          alt="menu icon"
                        />
                      </div>
                      <Link className="style-no-link" href="/">
                          <IconApp />
                      </Link>
                      <div className="shopping-cart" >
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
              <form className="main-my-account" action="/">
                  <h2 className="myaccount-tittle">My account</h2>
                  <label className={`login-section__label ${ errorState.username.error ? "red-letters" : "" }`}
                      htmlFor="name-txt">
                      { errorState.username.text !== "" ? errorState.username.text : "Username" }
                  </label>
                  <input className={`general-input login-section__input ${ errorState.username.error ? "red-borders" : "" }`}
                      name="username-txt"
                      style={ isEditable ? activeField : null }
                      onChange={onChangeHandler}
                      readOnly={ isEditable ? false : true }
                      placeholder="UserExample"
                      value={userName}
                      type="text"
                  />
                  <label className={`login-section__label ${ errorState.email.error ? "red-letters" : "" }`}
                      htmlFor="email-txt">
                      { errorState.email.text !== "" ? errorState.email.text : "Email address" }
                  </label>
                  <input className={`general-input login-section__input ${ errorState.email.error ? "red-borders" : "" }`}
                      name="email-txt"
                      style={ isEditable ? activeField : null }
                      onChange={onChangeHandler}
                      readOnly={ isEditable ? false : true }
                      placeholder="explample@gmail.com"
                      value={userEmail}
                      type="text"
                  />
                  <label className={`login-section__label ${ errorState.pass.error ? "red-letters" : "" }`}
                      htmlFor="password-txt">
                      { errorState.pass.text !== "" ? errorState.pass.text : "Password" }
                  </label>
                  <input className={`general-input login-section__input ${ errorState.pass.error ? "red-borders" : "" }`}
                      name="password-txt"
                      style={ isEditable ? activeField : null }
                      onChange={onChangeHandler}
                      readOnly={ isEditable ? false : true }
                      value={userPassWord}
                      type="password"
                  />
                  <label style={ showPassConfirm ? null : { display: "none" } }
                      className={`login-section__label ${ errorState.passConfirm.error ? "red-letters" : "" }`}
                      htmlFor="repeat-password-txt">
                      { errorState.passConfirm.text !== "" ? errorState.passConfirm.text : "Repeat Password" }
                  </label>
                  <input style={ showPassConfirm ? activeField : { display: "none" } }
                      className={`general-input login-section__input ${ errorState.passConfirm.error ? "red-borders" : "" }`}
                      name="repeat-password-txt"
                      value={confirmPassword}
                      onChange={onChangeHandler}
                      type="password"
                  />
                  <div
                      className={`error-message ${ errorState.errorMessage !== "" ? "show-detail-error-message" : "" }`}>
                      { errorState.errorMessage !== "" ? errorState.errorMessage : "" }
                  </div>
              </form>
          </div>
          <div className="section-down">
              <GeneralButton
                  buttonText={ isEditable ? "Save" : "Edit" }
                  color={ isEditable ? "green" : "white" }
                  clickHandler={editAccount}
              />
          </div>
          <SyncAlertWithProps
              synchronize={setSyncOfCurrentUser}
              synchronizeCurrentUser={synchronizeCurrentUser}
          />
      </div>
    );
}


export { MyAccount };
