import Link from 'next/link';
import Image from 'next/image';
import { IconApp } from '@components/IconApp';
import { GeneralButton } from '@components/GeneralButton';
import { useCreateAccount } from './hooks/useCreateAccount';

import menuSvg from "@icons/menu-icon.svg";
import shoppingCartSvg from "@icons/shopping-cart.svg";

const CreateAccount = ({ validateUser, addNewUser }) => {
    const {
        formRef,
        showPassConfirm,
        passwordValue,
        checkNewAccount,
        onChangeHandler,
        errorState
    } = useCreateAccount(validateUser, addNewUser);

    return (
      <div className="wrapper-login">
          <div className="section-up">
              <header className="box-shadow-header">
                  <nav className="header-home-nav no-fixed">
                      <div className="menu-icon">
                        <Image
                          src={menuSvg}
                          width={25}
                          height={21}
                          objectFit="fill"
                          alt="menu icon"
                        />
                      </div>
                      <Link className="no-underline" href="/login">
                        <IconApp />
                      </Link>
                      <div className="shopping-cart">
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
              <form id="create-account-form" className="login-section" action="/login" ref={formRef}>
                  <h2 className="myaccount-tittle">Create Account</h2>
                  <label className={`login-section__label ${ errorState.username.error ? "red-letters" : "" }`}
                      htmlFor="name-txt">
                      { errorState.username.text !== "" ? errorState.username.text : "Username" }
                  </label>
                  <input className={`general-input login-section__input ${ errorState.username.error ? "red-borders" : "" }`}
                      onChange={onChangeHandler}
                      name="username-txt"
                      placeholder="UserExample"
                      type="text"
                  />
                  <label className={`login-section__label ${ errorState.email.error ? "red-letters" : "" }`}
                      htmlFor="email-txt">
                      { errorState.email.text !== "" ? errorState.email.text : "Email address" }
                  </label>
                  <input className={`general-input login-section__input ${ errorState.email.error ? "red-borders" : "" }`}
                      onChange={onChangeHandler}
                      name="email-txt"
                      placeholder="example@gmail.com"
                      type="text"
                  />
                  <label className={`login-section__label ${ errorState.pass.error ? "red-letters" : "" }`}
                      htmlFor="password-txt">
                      { errorState.pass.text !== "" ? errorState.pass.text : "Password" }
                  </label>
                  <input className={`general-input login-section__input ${ errorState.pass.error ? "red-borders" : "" }`}
                      onChange={onChangeHandler}
                      value={passwordValue}
                      name="password-txt"
                      type="password"
                  />
                  <label style={ showPassConfirm ? null : { display: "none" } }
                      className={`login-section__label ${ errorState.passConfirm.error ? "red-letters" : "" }`}
                      htmlFor="repeat-password-txt">
                      { errorState.passConfirm.text !== "" ? errorState.passConfirm.text : "Repeat Password" }
                  </label>
                  <input style={ showPassConfirm ? null : { display: "none" } }
                      className={`general-input login-section__input ${ errorState.passConfirm.error ? "red-borders" : "" }`}
                      onChange={onChangeHandler}
                      name="repeat-password-txt"
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
                  buttonText="Create"
                  color="green"
                  clickHandler={checkNewAccount}
              />
          </div>
      </div>
    );
}

export { CreateAccount };
