import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IconApp } from '@components/IconApp';

import smsIconSvg from '@icons/sms-icon.svg';

const SuccessEmail = () => {
    return (
        <div className="wrapper-recovery">
            <header className="header-section-recovery">
                <nav>
                    <IconApp bigSize={true} />
                </nav>
            </header>
            <main>
                <h2 className="recovery-tittle">Email has been sent!</h2>
                <p className="recovery-text">Please check your inbox for instructions on how to reset the password</p>
                <div className="sms-icon">
                  <Image
                    src={smsIconSvg}
                    width={153}
                    height={153}
                    objectFit="fill"
                    alt="image of a letter"
                  />
                </div>
                <Link href="/login">
                    <button className="general-button green--btn">
                        Login
                    </button>
                </Link>
                <p className="general-message-link grey__message">Didn’t receive the email? </p>
                <Link href="/password-recovery" className="general-message-link green__message">Resend</Link>
            </main>
        </div>
    )
}

export { SuccessEmail };
