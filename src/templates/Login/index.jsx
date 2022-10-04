import { LoginForm } from "@containers/LoginForm";
import { GeneralButton } from "@components/GeneralButton";
import { IconApp } from '@components/IconApp';
import { useLogin } from './hooks/useLogin';

import styles from './Login.module.scss';

const Login = () => {
  const {
    formRef,
    handlerSubmit,
    showMyAccount,
    loginOnChange,
    passOnChange,
    errorState
  } = useLogin();

  return (
    <div className={styles.wrapperLogin}>
        <div className="section-up">
            <header className={styles.headerSectionLogin}>
                <nav>
                    <IconApp bigSize={true} />
                </nav>
            </header>
            <LoginForm
                formRef={formRef}
                handlerSubmit={handlerSubmit}
                loginOnChange={loginOnChange}
                passOnChange={passOnChange}
                errorState={errorState}
            />
        </div>
        <div className={styles.sectionDown}>
            <GeneralButton
                buttonText="Sign up"
                color="white"
                clickHandler={showMyAccount}
            />
        </div>
    </div>
  );
};

export { Login };
