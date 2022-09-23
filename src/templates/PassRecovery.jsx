import React from "react";
import Link from "next/link";
import { IconApp } from '@components/IconApp';

const PassRecovery = () => {
    return (
        <div className="wrapper-recovery">
            <header className="header-section-recovery">
                <nav>
                    <IconApp bigSize={true} />
                </nav>
            </header>
            <form>
                <h2 className="recovery-tittle">Password recovery</h2>
                <p className="recovery-text">Inform the email address used to create your account</p>
                <label className="login-section__label" htmlFor="user-txt">Email address</label>
                <input className="general-input login-section__recovery" id="user-txt" placeholder="stivenb1994@gmail.com" type="text" />
                <Link href="/success-email">
                    <button className="general-button green--btn">
                        Submit
                    </button>
                </Link>
                <Link href="/login" className="general-message-link green__message">Back to log in</Link>
            </form>
        </div>
    );
}

export { PassRecovery };
